# K-Precision Official Website | Flat Design Edition

Website chính thức của **K-Precision** – Nhà cung cấp linh kiện tiêu hao và giải pháp cơ khí chính xác:
- **Đá mài chính xác (Grinding Wheels)**: Kim cương nhân tạo & CBN Superabrasives, liên kết Vitrified, Resinoid, Metal, dụng cụ sửa đá Rotary Diamond Dressers.
- **Dụng cụ cắt gọt (Cutting Tools)**: Dao phay ngón Solid Carbide hạt siêu mịn 0.4µm, mũi khoan tưới nguội xuyên tâm, mảnh chíp PCD/CBN, lớp phủ nano AlCrN, TiSiN.
- **Hệ thống kẹp dao (Tool Holding)**: Đầu kẹp nhiệt Shrink Fit, đầu kẹp thủy lực Hydraulic Chucks, bầu kẹp collet ER/SK siêu chính xác (Độ đảo runout &le; 0.003mm, cân bằng động G2.5 @ 25,000 RPM).
- **Dây cắt EDM & Tiêu hao (EDM Wires)**: Dây đồng thau độ bền kéo cao (CuZn35), dây mạ kẽm tốc độ cao (Gamma Zinc Coated), lõi lọc sub-micron, hạt nhựa trao đổi ion deionization resin, phụ kiện dẫn hướng.

---

## 🎨 Phong cách thiết kế: Flat Design (Xanh lá trầm & Beige)

Website tuân thủ nghiêm ngặt triết lý **Flat Design (Thiết kế phẳng tối giản)** mang tính kỹ thuật cơ khí chính xác:
- **100% Không dùng dải màu gradient** (Zero linear/radial gradients).
- **Màu chủ đạo (Primary)**: Màu xanh lá trầm công nghiệp (`#1E3A2F` - Deep Forest Green / `#2D5844` - Pine Green).
- **Nền trang (Background)**: Màu Beige ấm sạch, hiện đại (`#F6F4ED` - Warm Beige / `#EFECE1` - Muted Linen).
- **Màu nhấn kỹ thuật (Accent)**: Đồng thau công nghiệp (`#C28B38` - Industrial Brass).
- **Đường viền (Borders)**: Viền phẳng sắc nét mỏng (`#D5CFBE`).
- **Hình vẽ vector (Diagrams)**: Toàn bộ 5 sơ đồ kỹ thuật (đá mài, dao phay, đầu kẹp, dây EDM, phòng lab CMM) đều được vẽ vector phẳng sắc nét.

---

## 🚀 Hướng dẫn đưa website lên GitHub Pages (Gắn tên miền riêng & Giữ nguyên Email)

Website được xây dựng hoàn toàn từ các file tĩnh (HTML5, CSS3, JS, SVG), **hoàn hảo 100% để chạy trên GitHub Pages miễn phí vĩnh viễn** với chứng chỉ bảo mật SSL (HTTPS) tự động.

### Bước 1: Tạo Repository trên GitHub
1. Đăng nhập vào tài khoản GitHub của bạn (`https://github.com`).
2. Nhấn nút **New repository** (đặt tên ví dụ: `k-precision-website` hoặc `k-precision`).
3. Chọn chế độ **Public**, không cần tích chọn README/license (vì source code của chúng ta đã có sẵn).

### Bước 2: Push mã nguồn từ máy tính lên GitHub
Mở Terminal tại thư mục này (`/Users/minhtuan/Documents/antigravity/eager-shannon`) và chạy các lệnh:

```bash
# 1. Kiểm tra trạng thái git
git status

# 2. Thêm toàn bộ file và commit
git add .
git commit -m "feat: K-Precision flat design website in forest green and beige"

# 3. Đổi tên nhánh chính thành main
git branch -M main

# 4. Liên kết với repository GitHub của bạn (thay username và repo của bạn)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# 5. Đẩy code lên GitHub
git push -u origin main
```

### Bước 3: Kích hoạt GitHub Pages
1. Trên repository GitHub, vào tab **Settings** &rarr; chọn mục **Pages** ở menu bên trái.
2. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn nhánh `main`, thư mục `/ (root)`.
   - Nhấn **Save**.
3. Tại mục **Custom domain**:
   - Nhập tên miền của bạn (ví dụ: `k-precision.com`). File `CNAME` trong repository sẽ tự động đồng bộ.
   - Tích chọn **Enforce HTTPS** (sau khi DNS hoàn tất kích hoạt).

---

## 🔒 Cấu hình DNS Tên Miền (Đảm bảo Email KHÔNG bị ảnh hưởng)

Truy cập vào trang quản trị tên miền của bạn (ví dụ: Cloudflare, GoDaddy, Namecheap, Mắt Bão, PA Việt Nam...):

### 1. Bản ghi cho Website (Thêm mới hoặc cập nhật):
Tạo 4 bản ghi loại **A** cho tên miền chính (hoặc `@`):
```
Host: @   Type: A   Points to: 185.199.108.153
Host: @   Type: A   Points to: 185.199.109.153
Host: @   Type: A   Points to: 185.199.110.153
Host: @   Type: A   Points to: 185.199.111.153
```
Tạo thêm 1 bản ghi loại **CNAME** cho tên miền phụ `www`:
```
Host: www   Type: CNAME   Points to: <YOUR_GITHUB_USERNAME>.github.io
```

### 2. Bản ghi Email (GIỮ NGUYÊN 100%):
- **TUYỆT ĐỐI KHÔNG XÓA HOẶC SỬA** các bản ghi loại **`MX`** (Mail Exchange) và các bản ghi **`TXT`** (SPF, DKIM, DMARC).
- Vì website chỉ sử dụng bản ghi **A** và **CNAME**, nên dịch vụ email theo tên miền của bạn sẽ tiếp tục hoạt động độc lập và ổn định 100%.

---

## 📁 Cấu trúc file trong thư mục

```
.
├── CNAME                       # File định tuyến tên miền cho GitHub Pages
├── index.html                  # Trang chủ (Hero, thông số sub-micron, sản phẩm nổi bật, quy chuẩn ISO)
├── products.html               # Danh mục sản phẩm (Tìm kiếm tức thì theo SKU, lọc danh mục)
├── grinding-wheels.html        # Trang chi tiết: Đá mài Kim cương & CBN Superabrasives
├── cutting-tools.html          # Trang chi tiết: Dao phay ngón Solid Carbide, mũi khoan tưới nguội
├── tool-holding.html           # Trang chi tiết: Đầu kẹp nhiệt Shrink Fit, thủy lực & collet UP
├── edm-wires.html              # Trang chi tiết: Dây đồng EDM độ bền kéo cao, dây mạ kẽm, lọc & hạt nhựa
├── about.html                  # Giới thiệu công ty, quy trình kiểm định CMM 3 giai đoạn
├── contact.html                # Form gửi yêu cầu báo giá (RFQ) trực tiếp, email các phòng ban
├── assets/
│   ├── css/
│   │   ├── style.css           # Bảng màu Flat Design (Xanh lá trầm #1E3A2F, Beige #F6F4ED), layout phẳng
│   │   └── components.css      # Giỏ báo giá RFQ trượt, bảng thông số, thanh tìm kiếm
│   ├── js/
│   │   ├── main.js             # Menu di động, active link, thông báo toast
│   │   ├── rfq-basket.js       # Giỏ hàng B2B RFQ (lưu localStorage, tạo form báo giá tự động)
│   │   └── product-filter.js   # Bộ lọc tìm kiếm sản phẩm theo thời gian thực
│   └── images/
│       ├── logo.svg            # Logo phẳng K-Precision (Forest Green & Brass)
│       ├── logo-white.svg      # Logo phiên bản sáng (cho header & footer xanh trầm)
│       ├── favicon.svg         # Favicon phẳng hiện đại
│       └── diagrams/
│           ├── grinding-wheel.svg  # Sơ đồ vector phẳng: Mặt cắt đá mài kim cương
│           ├── cutting-tool.svg    # Sơ đồ vector phẳng: Dao phay ngón xoắn biến thiên
│           ├── tool-holding.svg    # Sơ đồ vector phẳng: Đầu kẹp BT40 Shrink Fit
│           ├── edm-wire.svg        # Sơ đồ vector phẳng: Cuộn dây EDM & tia lửa phóng điện
│           └── precision-lab.svg   # Sơ đồ vector phẳng: Trạm đo tọa độ quang học CMM
└── README.md                   # Hướng dẫn chi tiết
```

---

## 🛠️ Tùy chỉnh thông tin liên hệ

Trong các file `.html`, bạn có thể thay thế nhanh các thông tin liên hệ:
- **Email Bán hàng / Báo giá**: `sales@k-precision.com` &rarr; thay bằng email của bạn (ví dụ: `sales@tên-miền-của-bạn.com`).
- **Email Kỹ thuật ứng dụng**: `engineering@k-precision.com` &rarr; thay bằng email kỹ thuật của bạn.
- **Email Quản lý chất lượng (QA)**: `quality@k-precision.com`.
- **Hotline & Địa chỉ**: Thay đổi số điện thoại `+1 (800) 577-3247` trong topbar và footer.
