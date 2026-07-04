# Goma Carpet - Website Kho Thảm Sàn Cao Cấp

Website React + Vite cho Goma Carpet: danh mục sản phẩm, giỏ hàng, công cụ tính toán vật tư/vận chuyển, khuyến mãi.

## Chạy thử ở máy tính (local)

**Yêu cầu:** Node.js (bản 18 trở lên).

1. Cài thư viện:
   ```
   npm install
   ```
2. (Tuỳ chọn) Nếu muốn bật thông báo đơn hàng qua Telegram, copy `.env.example` thành `.env.local` rồi điền `VITE_TELEGRAM_BOT_TOKEN` và `VITE_TELEGRAM_CHAT_ID` của bạn.
3. Chạy web:
   ```
   npm run dev
   ```
   Mở trình duyệt vào `http://localhost:3000`.

## Build bản chạy thật (production)

```
npm run build
```

Kết quả nằm trong thư mục `dist/` — đây là các file tĩnh (HTML/CSS/JS) có thể upload lên bất kỳ hosting tĩnh nào.

## Deploy lên Cloudflare Pages (miễn phí)

Vì domain đang quản lý ở Cloudflare, cách nhanh nhất:

1. Đẩy toàn bộ thư mục này lên một repo GitHub (private hoặc public đều được — chỉ cần đừng commit file `.env` hay `.env.local`, chúng đã được `.gitignore` loại trừ sẵn).
2. Vào [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → tab **Pages** → **Connect to Git**.
3. Chọn repo vừa đẩy lên. Ở phần cấu hình build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Nếu dùng tính năng Telegram, vào **Settings → Environment variables** của Pages project, thêm `VITE_TELEGRAM_BOT_TOKEN` và `VITE_TELEGRAM_CHAT_ID`.
5. Bấm **Save and Deploy**. Sau khi build xong, Cloudflare cho một domain dạng `ten-du-an.pages.dev`.
6. Gắn domain riêng: vào project Pages vừa tạo → **Custom domains** → **Set up a custom domain** → nhập domain của bạn (vì domain đã ở Cloudflare, DNS sẽ tự trỏ, thường có hiệu lực sau vài phút).

File `public/_redirects` đã có sẵn để các route như `/san-pham`, `/gio-hang`... hoạt động đúng khi tải lại trang (SPA routing).

### Cách thay thế: kéo-thả không cần Git

Nếu không muốn dùng GitHub: chạy `npm run build` ở máy bạn, sau đó vào Cloudflare Pages → **Upload assets** → kéo thả thư mục `dist/` vào. Cách này nhanh nhưng phải build và upload lại thủ công mỗi khi sửa code.

## Lưu ý quan trọng

- **Đã gỡ tính năng chat AI (Thùy Linh)** dùng Gemini API — theo yêu cầu, vì tính năng này cần API key và nếu để lộ ở phía client (trình duyệt) trên hosting tĩnh miễn phí thì bất kỳ ai cũng có thể lấy trộm key từ mã nguồn web.
- **2 ảnh kho** (`goma_warehouse_1.jpg`, `goma_warehouse_2.jpg` ở trang Khuyến Mãi) trong file gốc bạn tải về đã bị **hỏng dữ liệu nặng** (không phải lỗi từ tôi — file gốc đã lỗi khi bạn tải xuống). Tôi đã thay tạm bằng ảnh placeholder màu xám để web không bị vỡ giao diện. Bạn nên thay 2 file này bằng ảnh thật tại `src/assets/images/`.
- **Token Telegram cũ đã bị lộ** trong file `.env.example` gốc — hãy vào Telegram, chat với `@BotFather`, tạo token mới cho bot để vô hiệu hoá token cũ.
