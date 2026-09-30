// Âm thanh tổng hợp bằng Web Audio — không cần file âm thanh.
let ctx = null
let enabled = false

export function setSoundEnabled(v) {
  enabled = v
  if (v && !ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx && ctx.state === 'suspended') ctx.resume()
}

function tone(freq, start, dur, gain) {
  const t = ctx.currentTime + start
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

function whoosh(dur, from, to, gain) {
  const len = Math.floor(ctx.sampleRate * dur)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  const src = ctx.createBufferSource()
  src.buffer = buf
  const f = ctx.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 1.2
  const t = ctx.currentTime
  f.frequency.setValueAtTime(from, t)
  f.frequency.exponentialRampToValueAtTime(to, t + dur)
  const g = ctx.createGain()
  g.gain.setValueAtTime(gain, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(f).connect(g).connect(ctx.destination)
  src.start()
}

export function playSlide() {
  if (!enabled || !ctx) return
  whoosh(0.35, 500, 1200, 0.05)
}

export function playReveal() {
  if (!enabled || !ctx) return
  whoosh(0.5, 300, 2400, 0.09)
  tone(659.25, 0.45, 1.2, 0.07)
  tone(987.77, 0.55, 1.4, 0.05)
}
