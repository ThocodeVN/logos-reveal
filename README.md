# Hội Quán Logos — Website giới thiệu các đội

## Cài đặt và chạy
Cần Node.js 18 trở lên.

    npm install
    npm run dev        # mở http://localhost:5173
    npm run build      # bản chạy thật nằm trong thư mục dist/

## Đổi tên thí sinh / thầy đồng hành
Chỉ sửa file `src/data/teams.js`: mỗi đội là một khối, mỗi người là `P('Tên thánh', 'Họ và tên')`.
Thêm hoặc bớt dòng `P(...)` để đội có 2 hoặc 3 thí sinh. Màu nhấn từng thể loại nằm ở `categories` trong cùng file.

## Thêm ảnh
Bỏ ảnh vào `public/photos/` theo tên mặc định: `01-1.jpg`, `01-2.jpg`, `01-3.jpg` (thí sinh) và `01-thay.jpg` (thầy),
trong đó `01` là số đội (`02`, ... `11`). Muốn dùng tên file khác, thêm tham số thứ ba: `P('Tên thánh', 'Họ tên', 'ten-file.jpg')`.
Nên dùng ảnh chân dung vuông hoặc hơi ngang, chiều rộng từ 800px. Thiếu ảnh thì thẻ hiện biểu tượng thay thế.

## Phím tắt
- Space / → / Enter: lật thẻ, sang thẻ tiếp theo, xem lại cả đội (dàn hàng ngang), rồi sang đội tiếp theo
- ←: quay lại  |  Esc: về màn hình chọn thể loại
- 1–4: chọn nhanh thể loại (màn hình đầu)  |  F: toàn màn hình  |  S: bật/tắt âm thanh

## Lưu ý khi trình chiếu
Font Cormorant Garamond và Be Vietnam Pro tải từ Google Fonts. Nếu máy chiếu không có mạng, hãy mở trang một lần
khi còn mạng để trình duyệt lưu font, hoặc dùng bản `npm run build` sau khi tự host font.
