import annaTranThaoLyPhoto from './Ảnh thí sinh/Anna Trần Thảo Ly.jpg'
import antonThachHoangLongPhoto from './Ảnh thí sinh/Anton Thạch Nguyễn Hoàng Long.JPG'
import giuseQuocKhangPhoto from './Ảnh thí sinh/Giuse Đỗ Quốc Khang.jpg'
import mariaBuiMinhThaoPhoto from './Ảnh thí sinh/Maria Bùi Võ Minh Thảo.jpeg'
import mariaHaKyMyPhoto from './Ảnh thí sinh/Maria Nguyễn Hà Kỳ Mỹ.jpg'
import martinoBaoPhucPhoto from './Ảnh thí sinh/Martino Nguyễn Ngọc Bảo Phúc.jpg'
import pheroAnhTuanPhoto from './Ảnh thí sinh/Phero Trần Anh Tuân.jpg'
import pheroVanThuongPhoto from './Ảnh thí sinh/Phero Nguyễn Văn Thường.jpg'
import teresaBaoThyPhoto from './Ảnh thí sinh/Teresa Lâm Bảo Thy.jpg'
import teresaPhuongThaoPhoto from './Ảnh thí sinh/Teresa Phạm Thị Phương Thảo.jpg'
import mariaMadMinhKhuePhoto from './Ảnh thí sinh/Maria Mad. Nguyễn Từ Minh Khuê.jpg'
import phaoloThanhTrungPhoto from './Ảnh thí sinh/Phaolo Nguyễn Thành Trung.jpg'
import pheroBaoDuyPhoto from './Ảnh thí sinh/Phero Huỳnh Nguyễn Bảo Duy.jpg'
import mariaHoangAnhThuPhoto from './Ảnh thí sinh/Maria Hoàng Anh Thư.jpeg'
import mariaLyDieuThanhTrucPhoto from './Ảnh thí sinh/Maria Lý Điểu Thanh Trúc.jpg'
import catarinaTongNgocMaiDuyPhoto from './Ảnh thí sinh/Catarina Tống Ngọc Mai Duy.JPEG'
import leNguyenThaoDuyenPhoto from './Ảnh thí sinh/Lê Nguyễn Thảo Duyên.jpeg'
import stephanoNguyenGiaThienPhoto from './Ảnh thí sinh/Stephano Nguyễn Gia Thiên.jpg'
import annaTrinhThiKhanhLinhPhoto from './Ảnh thí sinh/Anna Trịnh Thị Khánh Linh.jpg'
import mariaTranDoTueLinhPhoto from './Ảnh thí sinh/Maria Trần Đỗ Tuệ Linh.jpg'
import pheroDangTuanAnhPhoto from './Ảnh thí sinh/Phero Đặng Tuấn Anh.jpeg'
import terexaNguyenThiTamNhuPhoto from './Ảnh thí sinh/Terexa Nguyễn Thị Tâm Như.jpg'
import mariaNguyenThiHongNhungPhoto from './Ảnh thí sinh/Maria Nguyễn Thị Hồng Nhung.jpg'
import alfonsoDuyQuangPhoto from './Ảnh đồng hành/Alfonso Phạm Duy Quang.JPG'
import andrewHongAnPhoto from './Ảnh đồng hành/Andrew Phạm Hồng Ân.jpg'
import gioakimVanTaiPhoto from './Ảnh đồng hành/GioaKim Phạm Văn Tài.JPG'
import gioanPhiLongPhoto from './Ảnh đồng hành/Gioan B. Nguyễn Phi Long.jpg'
import giuseTrungKienPhoto from './Ảnh đồng hành/Giuse Trần Trung Kiên.jpg'
import giuseDinhTuanPhoto from './Ảnh đồng hành/Giuse Tạ Đình Tuấn.jpg'
import ngoVinhDucPhoto from './Ảnh đồng hành/Ngô Vinh Đức.jpg'
import pheroDinhQuynhPhoto from './Ảnh đồng hành/Phero Đặng Đình Quynh.jpg'
import tomaTanNguyenPhoto from './Ảnh đồng hành/Toma Lê Tấn Nguyễn.jpg'
import giuseXuanToaPhoto from './Ảnh đồng hành/Giuse Nguyễn Xuân Tọa.jpg'
// ============================================================
//  NƠI DUY NHẤT CẦN SỬA: tên thánh + họ tên của thí sinh / thầy.
//  P('Tên thánh', 'Họ và tên')
//  Mỗi đội có thể có 2 hoặc 3 thí sinh — thêm/bớt dòng P(...) là được.
//
//  ẢNH: bỏ file vào thư mục public/photos/ theo tên mặc định
//    thí sinh: 01-1.jpg, 01-2.jpg, 01-3.jpg   thầy: 01-thay.jpg   (01 = số đội, 02, ... 11)
//  Muốn đặt tên file khác: P('Tên thánh', 'Họ tên', 'ten-file.jpg')
//  Chưa có ảnh thì thẻ tự hiện biểu tượng thay thế.
// ============================================================

// Thể loại + màu nhấn riêng (thứ tự = thứ tự trên màn hình đầu)
export const categories = [
  { name: 'Văn học', accent: '#C0607A' },
  { name: 'Triết học', accent: '#6F92CC' },
  { name: 'Tâm lý', accent: '#4FA89E' },
  { name: 'Thiêng liêng', accent: '#D6B45C' },
]

const P = (saintName, fullName, photo, affiliation) => ({
  saintName,
  fullName,
  ...(photo ? { photo } : {}),
  ...(affiliation ? { affiliation } : {}),
})

export const teams = [
  // ---- VĂN HỌC (đội 1–4) ----
  { id: 1, category: 'Văn học',
    participants: [P('Maria', 'Hoàng Anh Thư', mariaHoangAnhThuPhoto, 'SVCG Thiên Ân'), P('Maria', 'Lý Điểu Thanh Trúc', mariaLyDieuThanhTrucPhoto, 'SVCG Thiên Ân'), P('Phero', 'Huỳnh Nguyễn Bảo Duy', pheroBaoDuyPhoto, 'SVCG Thiên Ân')],
    mentor: P('', 'Alfonso Phạm Duy Quang', alfonsoDuyQuangPhoto) },
  { id: 2, category: 'Văn học',
    participants: [P('Martino', 'Nguyễn Ngọc Bảo Phúc', martinoBaoPhucPhoto, 'SVCG Hiệp thông'), P('Maria', 'Bùi Võ Minh Thảo', mariaBuiMinhThaoPhoto, 'SVCG Ngân Hàng')],
    mentor: P('', 'Giuse Tạ Đình Tuấn', giuseDinhTuanPhoto) },
  { id: 3, category: 'Văn học',
    participants: [P('M.Mad', 'Nguyễn Từ Minh Khuê', mariaMadMinhKhuePhoto, 'SVCG Nông Lâm'), P('Catarina', 'Tống Ngọc Mai Duy', catarinaTongNgocMaiDuyPhoto, 'SVCG Đồng Nai'), P('Augustine', 'Phạm Hoàng Minh', undefined, 'SVCG Nhân Văn')],
    mentor: P('', 'Giuse Trần Trung Kiên', giuseTrungKienPhoto) },
  { id: 4, category: 'Văn học',
    participants: [P('Maria', 'Nguyễn Thị Vân Khánh', undefined, 'SVCG Ngân Hàng'), P('Lê', 'Nguyễn Thảo Duyên', leNguyenThaoDuyenPhoto, 'SVCG Ngân Hàng'), P('Maria', 'Nguyễn Thị Diễm Hằng', undefined, 'SVCG Ngân Hàng')],
    mentor: P('', 'Thầy Đương') },

  // ---- TRIẾT HỌC (đội 5–7) ----
  { id: 5, category: 'Triết học',
    participants: [P('PhaoLô', 'Nguyễn Thành Trung', phaoloThanhTrungPhoto, 'SVCG Sư Phạm Kĩ Thuật'), P('Giuse', 'Đỗ Quốc Khang', giuseQuocKhangPhoto, 'LX Đa Minh'), P('Maria', 'Nguyễn Hà Kỳ Mỹ', mariaHaKyMyPhoto, 'LX Mai Tâm Phúc')],
    mentor: P('', 'Andrew Phạm Hồng Ân', andrewHongAnPhoto) },
  { id: 6, category: 'Triết học',
    participants: [P('Maria', 'Vũ Ngọc Trâm', undefined, 'SVCG tự do'), P('Stephano', 'Nguyễn Gia Thiên', stephanoNguyenGiaThienPhoto, 'SVCG Nông Lâm'), P('Giuse', 'Võ Quang Hùng', undefined, 'SVCG Ngân Hàng')],
    mentor: P('', 'GioaKim Phạm Văn Tài', gioakimVanTaiPhoto) },
  { id: 7, category: 'Triết học',
    participants: [P('Anna', 'Trần Thảo Ly', annaTranThaoLyPhoto, 'LX Đức Bà Truyền Giáo - ENDM'), P('Teresa', 'Lâm Bảo Thy', teresaBaoThyPhoto, 'LX Đức Bà Truyền Giáo - ENDM'), P('Maria', 'Nguyễn Thị Hồng Mến', undefined, 'SVCG Sư Phạm Kỹ Thuật')],
    mentor: P('', 'Phero Đặng Đình Quynh', pheroDinhQuynhPhoto) },

  // ---- TÂM LÝ (đội 8–9) ----
  { id: 8, category: 'Tâm lý',
    participants: [P('Anna', 'Trịnh Thị Khánh Linh', annaTrinhThiKhanhLinhPhoto, 'SVCG Nhân Văn'), P('Maria', 'Trần Đỗ Tuệ Linh', mariaTranDoTueLinhPhoto, 'SVCG Thiên Ân')],
    mentor: P('', 'Gioan B. Nguyễn Phi Long', gioanPhiLongPhoto) },
  { id: 9, category: 'Tâm lý',
    participants: [P('Phêrô', 'Đặng Tuấn Anh', pheroDangTuanAnhPhoto, 'SVCG Nông Lâm'), P('Phê rô', 'Nguyễn Văn Thường', pheroVanThuongPhoto, 'SVCG Sư Phạm Kĩ Thuật')],
    mentor: P('', 'Toma Lê Tấn Nguyễn', tomaTanNguyenPhoto) },

  // ---- THIÊNG LIÊNG (đội 10–11) ----
  { id: 10, category: 'Thiêng liêng',
    participants: [P('Phêrô', 'Trần Anh Tuân', pheroAnhTuanPhoto, 'SVCG Thiên Ân'), P('Terexa', 'Nguyễn Thị Tâm Như', terexaNguyenThiTamNhuPhoto, 'SVCG Thiên Ân'), P('Giuse', 'Trần Tấn Tài', undefined, 'SVCG tự do')],
    mentor: P('', 'Giuse Nguyễn Xuân Tọa', giuseXuanToaPhoto) },
  { id: 11, category: 'Thiêng liêng',
    participants: [P('Maria', 'Nguyễn Thị Hồng Nhung', mariaNguyenThiHongNhungPhoto, 'SVCG Đồng Nai'), P('Tê-rê-xa', 'Phạm Thị Phương Thảo', teresaPhuongThaoPhoto, 'SVCG tự do'), P('Antôn', 'Thạch Nguyễn Hoàng Long', antonThachHoangLongPhoto, 'SVCG Nhân Văn')],
    mentor: P('', 'Ngô Vinh Đức', ngoVinhDucPhoto) },
]
