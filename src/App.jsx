import { useCallback, useEffect, useState } from 'react'
import { teams, categories } from './data/teams'
import { playSlide, playReveal, setSoundEnabled } from './sound'
import logoLogos from './data/logo/Logo Logos - vàng.png'
import logoLogosOriginal from './data/logo/Logo Logos.jpg'
import logoRegionOriginal from './data/logo/Logo Vùng.jpg'

const pad = (n) => String(n).padStart(2, '0')
const accentOf = (name) => categories.find((c) => c.name === name)?.accent ?? '#C9A24B'

// Thí sinh trước, thầy đồng hành cuối cùng.
// Ảnh nằm trong public/photos/. Mặc định: 01-1.jpg, 01-2.jpg, 01-3.jpg (thí sinh) và 01-thay.jpg (thầy).
// Muốn dùng tên file khác: P('Tên thánh', 'Họ tên', 'ten-file.jpg') trong teams.js.
const photoSrc = (file) => file.startsWith('data:') || file.includes('/')
  ? file
  : `${import.meta.env.BASE_URL}photos/${file}`

function cardsOf(team) {
  const id = pad(team.id)
  return [
    ...team.participants.map((p, i) => ({ ...p, photo: photoSrc(p.photo ?? `${id}-${i + 1}.jpg`), role: p.affiliation || 'THÍ SINH', mentor: false })),
    { ...team.mentor, photo: photoSrc(team.mentor.photo ?? `${id}-thay.jpg`), role: 'THẦY ĐỒNG HÀNH', mentor: true },
  ]
}

// Vị trí thẻ so với thẻ hiện tại: d < 0 đã qua (thu nhỏ sang trái), d > 0 chưa tới.
function place(d, up) {
  if (d === 0) return { x: 0, s: up ? 1.05 : 1, o: 1 }
  if (d < 0) return { x: -(88 + (-d - 1) * 60), s: 0.56, o: Math.max(0.2, 0.7 + (d + 1) * 0.2) }
  return { x: 130 + (d - 1) * 20, s: 0.8, o: 0 }
}

function Emblem() {
  return <img className="emblem" src={logoLogos} alt="" draggable={false} />
}

function Photo({ src }) {
  const [ok, setOk] = useState(true)
  return (
    <div className="photo">
      {ok ? <img src={src} alt="" draggable={false} onError={() => setOk(false)} /> : <Emblem />}
    </div>
  )
}

function Card({ data, pos, up, current }) {
  const cls = ['card', up && 'up', current && 'current', data.mentor && 'mentor'].filter(Boolean).join(' ')
  return (
    <div className={cls} style={{ '--x': pos.x, '--s': pos.s, '--o': pos.o }}>
      <div className="inner">
        <div className="face down">
          <Emblem />
          <span className="reveal">REVEAL</span>
        </div>
        <div className="face info">
          <Photo src={data.photo} />
          <span className="person-name">{data.saintName ? `${data.saintName} ${data.fullName}` : data.fullName}</span>
          <span className="rule" />
          <span className={`role ${data.mentor ? 'mentor-role' : 'affiliation'}`}>{data.role}</span>
        </div>
      </div>
    </div>
  )
}

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  dur: 18 + ((i * 7) % 14),
  delay: -((i * 5) % 20),
}))

function Motes() {
  return (
    <div className="motes" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span key={i} className="mote" style={{ left: `${m.left}%`, width: m.size, height: m.size, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s` }} />
      ))}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState({ team: -1, p: 0 }) // team = -1: màn hình chọn thể loại
  const [sound, setSound] = useState(false)
  const [full, setFull] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)

  const start = useCallback((name) => {
    const idx = teams.findIndex((t) => t.category === name)
    if (idx >= 0) {
      setView({ team: idx, p: 0 })
      setMapOpen(false)
    }
  }, [])

  const next = useCallback(() => {
    if (view.team < 0) return
    const n = cardsOf(teams[view.team]).length
    if (view.p < 2 * n + 1) {
      view.p % 2 === 1 ? playReveal() : playSlide()
      setView({ team: view.team, p: view.p + 1 })
    } else if (view.team + 1 < teams.length) {
      playSlide()
      setView({ team: view.team + 1, p: 0 })
    } else setView({ team: -1, p: 0 })
  }, [view])

  const prev = useCallback(() => {
    if (view.team < 0) return
    if (view.p > 0) setView({ team: view.team, p: view.p - 1 })
    else if (view.team > 0) setView({ team: view.team - 1, p: 2 * cardsOf(teams[view.team - 1]).length + 1 })
    else setView({ team: -1, p: 0 })
  }, [view])

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  const toggleSound = useCallback(() => {
    setSound((s) => {
      setSoundEnabled(!s)
      return !s
    })
  }, [])

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key
      if (k === 'Escape') {
        if (mapOpen) setMapOpen(false)
        else setView({ team: -1, p: 0 })
        return
      }
      if (mapOpen) return
      if (k === ' ' || k === 'ArrowRight' || k === 'Enter') { e.preventDefault(); next() }
      else if (k === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (k === 'f' || k === 'F') toggleFull()
      else if (k === 's' || k === 'S') toggleSound()
      else if (view.team < 0 && /^[1-4]$/.test(k) && categories[+k - 1]) start(categories[+k - 1].name)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mapOpen, next, prev, start, toggleFull, toggleSound, view.team])

  const controls = (
    <div className="controls" onClick={(e) => e.stopPropagation()}>
      <button className="ctrl" onClick={(e) => { setMapOpen((open) => !open); e.currentTarget.blur() }} aria-expanded={mapOpen} aria-controls="team-map">
        Các đội
      </button>
      <button className="ctrl" onClick={(e) => { toggleSound(); e.currentTarget.blur() }} aria-label="Bật/tắt âm thanh (S)">
        {sound ? 'Âm thanh: bật' : 'Âm thanh: tắt'}
      </button>
      <button className="ctrl" onClick={(e) => { toggleFull(); e.currentTarget.blur() }} aria-label="Toàn màn hình (F)">
        {full ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
      </button>
    </div>
  )

  const teamMap = mapOpen && (
    <>
      <button className="team-map-scrim" aria-label="Đóng danh sách đội" onClick={(e) => { e.stopPropagation(); setMapOpen(false) }} />
      <nav id="team-map" className="team-map" aria-label="Danh sách đội" onClick={(e) => e.stopPropagation()}>
        {categories.map((category) => (
          <section className="team-map-group" key={category.name}>
            <h2 className="team-map-heading" style={{ '--accent': category.accent }}>{category.name}</h2>
            <div className="team-map-grid">
              {teams.map((team, index) => team.category === category.name && (
                <button
                  key={team.id}
                  className={`team-map-item${view.team === index ? ' active' : ''}`}
                  style={{ '--accent': category.accent }}
                  aria-label={`Đội ${pad(team.id)}, ${category.name}`}
                  aria-current={view.team === index ? 'page' : undefined}
                  onClick={(e) => { setView({ team: index, p: 0 }); setMapOpen(false); e.currentTarget.blur() }}
                >
                  {pad(team.id)}
                </button>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </>
  )

  // ---------- Màn hình chọn thể loại ----------
  if (view.team < 0) {
    return (
      <div className="stage home" style={{ '--accent': '#C9A24B' }}>
        <div className="glow" />
        <Motes />
        <div className="home-logos">
          <img className="home-logo" src={logoRegionOriginal} alt="Logo Vùng" draggable={false} />
          <img className="home-logo" src={logoLogosOriginal} alt="Logo Logos" draggable={false} />
        </div>
        <h1>Hội Quán Logos</h1>
        <p className="sub">Giới thiệu các đội</p>
        <div className="cats">
          {categories.map((c) => {
            const ids = teams.filter((t) => t.category === c.name).map((t) => t.id)
            return (
              <button key={c.name} className="cat-btn" style={{ '--accent': c.accent }} onClick={(e) => { start(c.name); e.currentTarget.blur() }}>
                <span className="c-name">{c.name}</span>
                <span className="c-range">Đội {pad(Math.min(...ids))}–{pad(Math.max(...ids))}</span>
              </button>
            )
          })}
        </div>
        {controls}
        {teamMap}
      </div>
    )
  }

  // ---------- Màn hình trình chiếu một đội ----------
  const team = teams[view.team]
  const cards = cardsOf(team)
  const n = cards.length
  const { p } = view
  const review = p === 2 * n + 1 // bước cuối: dàn tất cả thẻ thành hàng ngang
  const cur = p === 0 ? -1 : review ? n : Math.ceil(p / 2) - 1
  const curUp = p > 0 && p % 2 === 0
  const revealed = p === 0 ? 0 : review ? n : cur + (curUp ? 1 : 0)
  const nextTeam = teams[view.team + 1]

  let hint = ''
  if (p === 0) hint = 'Nhấn Space để bắt đầu'
  else if (p === 2 * n) hint = 'Nhấn Space để xem lại cả đội'
  else if (review) hint = nextTeam ? `Nhấn Space: Đội ${pad(nextTeam.id)}` : 'Nhấn Space để kết thúc'

  return (
    <div className="stage" style={{ '--accent': accentOf(team.category) }} onClick={next}>
      <div className="glow" key={team.category} />
      <Motes />

      <div className={`title ${p === 0 ? 'intro' : 'compact'}`} key={team.id}>
        <div className="t-num">ĐỘI <span className="team-number">{pad(team.id)}</span></div>
        <div className="t-cat">{team.category.toUpperCase()}</div>
      </div>

      <div className="cards" key={`c${team.id}`}>
        {cards.map((c, k) => {
          const up = review || k < cur || (k === cur && curUp)
          const rs = n >= 4 ? 0.8 : 0.95
          const pos = review ? { x: (k - (n - 1) / 2) * (rs * 100 + 5), s: rs, o: 1 } : place(k - cur, up)
          return <Card key={k} data={c} pos={pos} up={up} current={k === cur} />
        })}
      </div>

      <div className="hint">{hint}</div>

      <div className="progress">
        <div className="p-meta">ĐỘI {pad(team.id)} · {revealed} / {n}</div>
        <div className="p-steps">
          {cards.map((c, k) => (
            <span key={k} className={`step ${k === cur ? 'on' : k < cur ? 'done' : ''}`}>{c.mentor ? 'THẦY' : pad(k + 1)}</span>
          ))}
        </div>
      </div>
      <div className="step-controls" onClick={(e) => e.stopPropagation()}>
        <button className="step-button" onClick={(e) => { playSlide(); setView(view.team === 0 ? { team: -1, p: 0 } : { team: view.team - 1, p: 0 }); e.currentTarget.blur() }} aria-label="Trước">← Trước</button>
        <button className="step-button" onClick={(e) => { playSlide(); setView(view.team + 1 < teams.length ? { team: view.team + 1, p: 0 } : { team: -1, p: 0 }); e.currentTarget.blur() }} aria-label="Tiếp">Tiếp →</button>
      </div>
      {controls}
      {teamMap}
    </div>
  )
}
