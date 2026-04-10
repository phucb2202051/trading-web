# 🎮 Game Item Trading Platform (Bot-Mediated Exchange System)

## 📖 Description

Hệ thống web hỗ trợ người dùng trao đổi vật phẩm trong game thông qua bot trung gian, giúp giảm rủi ro lừa đảo và đảm bảo giao dịch an toàn.

Người dùng có thể tạo phiên giao dịch, gửi vật phẩm cho bot, và hoàn tất quá trình trao đổi với người nhận thông qua hệ thống.

---

## 🚀 Features

### 👤 User Management

* Đăng ký / đăng nhập
* Cập nhật thông tin cá nhân
* Phân quyền (admin / user)

### 💰 Wallet System

* Nạp tiền vào ví
* Thanh toán giao dịch
* Xem lịch sử giao dịch

### 🤖 Bot Trading System

* Xem danh sách bot
* Theo dõi trạng thái bot
* Quản lý số slot giao dịch

### 🔄 Trading Workflow

* Tạo phiên giao dịch
* Chọn bot trung gian
* Nhập ID người nhận
* Gửi vật phẩm cho bot
* Người nhận xác nhận
* Hoàn tất giao dịch

### 📦 Item Management

* Quản lý vật phẩm
* Chuyển vật phẩm giữa người dùng

---

## 🧠 Business Model

* 💸 Thu phí giao dịch (Transaction Fee)
* 👥 Hỗ trợ nhóm giao dịch (Group Discount - optional)

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Knex.js
* Zod (validation)

### Frontend

* Vue 3
* Vite
* Pinia
* Vue Router
* Axios
* Bootstrap

### CMS

* Directus (Database-first CMS)

---

## 🏗 Architecture

* **Frontend (Vue SPA)** → giao diện người dùng
* **Backend (Node.js API)** → xử lý business logic
* **Database (PostgreSQL)** → lưu trữ dữ liệu
* **Directus CMS** → quản lý dữ liệu (admin)

---

## 🔄 Trading Workflow

1. Seller tạo phiên giao dịch
2. Chọn bot trung gian
3. Nhập ID người nhận
4. Seller gửi vật phẩm cho bot
5. Buyer xác nhận nhận vật phẩm
6. Bot chuyển vật phẩm
7. Hệ thống xử lý thanh toán
8. Hoàn tất giao dịch

---

## ⚙️ Installation

### Backend

```bash id="b1k93f"
npm install
npm run dev
```

### Frontend

```bash id="c8x21p"
npm install
npm run dev
```

---

## 🗄 Database

* PostgreSQL
* Sử dụng Knex để query và migration
* Directus dùng để quản lý dữ liệu

---

## 📌 Highlights

* Thiết kế theo kiến trúc nhiều layer (controller - service - database)
* Xử lý workflow giao dịch phức tạp
* Tích hợp hệ thống bot trung gian
* Quản lý ví và thanh toán nội bộ
* Xây dựng SPA với Vue 3

---

## ⚠️ Limitations

* Đây là hệ thống mô phỏng (simulation), chưa tích hợp thanh toán thực tế
* Bot giao dịch chỉ mang tính logic (chưa kết nối game thật)

---

## 🎯 Purpose

Dự án được xây dựng nhằm:

* Thực hành xây dựng hệ thống thương mại điện tử
* Hiểu cách xử lý workflow giao dịch
* Phát triển fullstack application (Node.js + Vue)

---

## ⚙️ Installation & Run Guide

### 📦 Requirements

* Node.js (>= 16)
* PostgreSQL
* npm hoặc yarn

---

## 🧭 System Components

Hệ thống gồm các thành phần:

* PostgreSQL (database)
* Directus CMS (quản lý dữ liệu)
* Game Middleware (xử lý logic trung gian với bot)
* Tool Game (giả lập / xử lý bot game)
* Frontend (Vue SPA)

---

## ▶️ Run System (Theo thứ tự)

### 1️⃣ Start PostgreSQL

* Khởi động PostgreSQL server
* Đảm bảo database đã được tạo

---

### 2️⃣ Start Directus CMS

```bash id="drc9x1"
cd directus
npx directus bootstrap
npx directus start
```

👉 Dùng để quản lý:

* user
* item
* bot
* transaction

---

### 3️⃣ Start Game Middleware

```bash id="wz3kq7"
cd game-middleware
npm install
npm run dev
```

👉 Xử lý:

* workflow giao dịch
* API như: `/transfer-item`, `/rent-slot`

---

### 4️⃣ Start Tool Game (Bot Simulation)

```bash id="p9a1sm"
cd tool-game
execute DragonBoy247.exe
login bot account (the bag must be empty)
chat start_session on game
```

👉 Giả lập:

* bot nhận vật phẩm
* bot chuyển vật phẩm

---

### 5️⃣ Start Frontend

```bash id="u2c7jd"
cd frontend
npm install
npm run dev
```

---

## 🌐 Access

* Frontend: http://localhost:5173
* Directus: http://localhost:8055
* Backend API: http://localhost:5040

---

## ⚠️ Notes

* Cần chạy đúng thứ tự để đảm bảo các service kết nối với nhau
* Nếu Directus chưa chạy → backend có thể lỗi


## 👨‍💻 Author

Nguyễn Hoàng Phúc
