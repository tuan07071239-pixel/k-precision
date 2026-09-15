# Hướng Dẫn Sử Dụng Trang Quản Trị K-Precision CMS

Hệ thống quản trị nội dung **K-Precision CMS** được xây dựng trên nền tảng **Sveltia CMS** (tương thích hoàn toàn với Decap CMS / Netlify CMS), giúp bạn đăng tải hình ảnh sản phẩm thật, cập nhật mô tả và thông số kỹ thuật trực tiếp trên trình duyệt mà không cần chỉnh sửa code.

---

## 🚀 1. Đăng Nhập Vào Trang Quản Trị Lần Đầu

Trang quản trị hoạt động trực tiếp tại địa chỉ:
* **Khi đã gắn tên miền:** `https://k-precision.com/admin/`
* **Khi xem trên GitHub Pages:** `https://<username>.github.io/<repo>/admin/`

### Cách 1: Đăng nhập bằng GitHub Personal Access Token (Nhanh nhất & Đơn giản nhất)
Bạn không cần phải thiết lập server OAuth phức tạp. Chỉ cần 1 mã Token cá nhân từ GitHub:

1. Đăng nhập vào GitHub của bạn &rarr; Vào **Settings**: [https://github.com/settings/tokens](https://github.com/settings/tokens?type=beta) (Fine-grained Personal Access Tokens) hoặc [Tokens Classic](https://github.com/settings/tokens).
2. Nhấn nút **Generate new token**:
   * **Token name:** `k-precision-cms`
   * **Expiration:** Chọn 90 ngày hoặc No expiration.
   * **Repository access:** Chọn repository `k-precision` của bạn.
   * **Permissions:** Tích chọn quyền **Contents: Read and write** (hoặc tích chọn `repo` nếu dùng Classic Token).
3. Bấm **Generate token** và sao chép mã token (dạng `github_pat_...` hoặc `ghp_...`).
4. Mở trang `https://k-precision.com/admin/` trên trình duyệt:
   * Bấm nút **Sign In with Token** (hoặc dán token vào khung popup hiển thị).
   * Trình duyệt sẽ tự động ghi nhớ phiên đăng nhập an toàn trong `localStorage`.

---

## 📸 2. Quy Trình Tải Ảnh Thật & Chỉnh Sửa Sản Phẩm

### Bước 1: Chọn sản phẩm cần chỉnh sửa
* Khi vào trang quản trị, danh sách 30 sản phẩm cơ khí chính xác đã được nạp sẵn.
* Bạn có thể dùng ô tìm kiếm theo mã SKU hoặc lọc theo danh mục: **Đá mài**, **Dụng cụ cắt**, **Đầu kẹp dao**, **Dây EDM**, **Vật tư phụ trợ**.

### Bước 2: Tải ảnh thật của sản phẩm
* Trong form chi tiết sản phẩm, tìm đến ô **"Ảnh sản phẩm thực tế (Product Image)"**.
* Bấm **Choose an image** &rarr; Chọn ảnh chụp từ máy tính của bạn:
  * Khuyên dùng định dạng: `.webp`, `.png` hoặc `.jpg`.
  * Ảnh sẽ tự động được tải lên và lưu trữ tại thư mục: `assets/images/products/`.

### Bước 3: Cập nhật mô tả & Thông số kỹ thuật
* **Tên & Mô tả ngắn:** Sửa trực tiếp trong các ô văn bản.
* **Bảng thông số kỹ thuật (Specifications):** Bấm `+ Add` để thêm dòng mới, nhập Tên thông số (Key) và Giá trị (Value). Có thể kéo thả để đổi thứ tự dòng.
* **Điều kiện vận hành CNC (Operating Conditions):** Thêm hoặc sửa tốc độ cắt (Vc), bước tiến (Vf), dung dịch làm mát...

### Bước 4: Lưu & Xuất bản (Publish)
* Nhấn nút **Save / Publish** ở góc trên bên phải.
* Sveltia CMS sẽ tự động tạo một commit mới lên GitHub repository của bạn.
* **GitHub Actions** ngầm biên dịch dữ liệu và sau khoảng **30 – 60 giây**, website chính thức sẽ hiển thị hình ảnh và nội dung mới!

---

## ⚙️ 3. Cấu Trúc File Kỹ Thuật (Dành cho Kỹ thuật viên)

* `admin/config.yml`: File cấu hình các trường dữ liệu, danh mục và thư mục lưu ảnh.
* `admin/index.html`: Giao diện CMS nạp Sveltia CMS.
* `data/products/*.json`: Thư mục lưu 30 file JSON độc lập cho từng mã sản phẩm.
* `assets/images/products/`: Thư mục lưu toàn bộ ảnh chụp sản phẩm thực tế.
* `scripts/build-products.js`: Script Node.js tự động gộp 30 file JSON thành `assets/js/products-data.js` và `data/products.json`.
* `.github/workflows/build-products.yml`: Tự động chạy `build-products.js` trên GitHub mỗi khi có cập nhật từ CMS.
