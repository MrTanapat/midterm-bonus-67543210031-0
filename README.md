# Student Management System - Client-Server Architecture

## Project Information
- **Student Name:** ธนภัทร นุกูล
- **Student ID:** 67543210031-0
- **Course:** ENGSE207 - Bonus Exam

## Architecture

### Before: Layered Architecture
- Single application
- Frontend + Backend ผูกติดกัน

### After: Client-Server Architecture
- **Backend:** REST API (Node.js + Express + SQLite)
- **Frontend:** Web Client (HTML + CSS + JavaScript)
- **Communication:** HTTP/JSON

## Project Structure

```
midterm-bonus-67543210031-0/
├── backend/                      # Server (รันบน VM)
│   ├── src/
│   │   ├── presentation/
│   │   │   ├── routes/
│   │   │   │   └── studentRoutes.js
│   │   │   ├── controllers/
│   │   │   │   └── studentController.js
│   │   │   └── middlewares/
│   │   │       ├── cors.js       # 🆕 CORS middleware
│   │   │       └── errorHandler.js
│   │   ├── business/
│   │   │   ├── services/
│   │   │   │   └── studentService.js
│   │   │   └── validators/
│   │   │       └── studentValidator.js
│   │   └── data/
│   │       ├── repositories/
│   │       │   └── studentRepository.js
│   │       └── database/
│   │           └── connection.js
│   ├── server.js                 # 🆕 แก้ไขเพื่อรองรับ CORS
│   ├── package.json
│   ├── students.db
│   └── README.md
│
├── frontend/                     # 🆕 Client (รันบน Local)
│   ├── index.html               # หน้าหลัก
│   ├── css/
│   │   └── style.css           # Styles
│   ├── js/
│   │   ├── api.js              # API Client
│   │   ├── app.js              # Main app logic
│   └── README.md
│
└── README.md                     # Project README

```

## How to Run

### Backend (Server - VM)
```bash
cd backend
npm install
npm start
# Server: http://localhost:3000
```

### Frontend (Client - Local)
```bash
cd frontend
# Open index.html in browser
# Or use: python3 -m http.server 8000
```

## API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `api/students` | ดึงข้อมูลนักศึกษาทั้งหมด |
| **POST** | `/api/students` | เพิ่มข้อมูลนักศึกษาใหม่ |
| **PATCH** | `/api/students/:id/gpa` | อัปเดต GPA ของนักศึกษา |
| **PATCH** | `/api/students/:id/status` | อัปเดตสถานะ (Active, Graduated, etc.) |
| **DELETE** | `/api/students/:id` | ลบข้อมูลนักศึกษา |

## Screenshots
<img width="1100" height="660" alt="image" src="https://github.com/user-attachments/assets/6ad8c13f-d3b0-46c3-8644-0831b6cdf194" />

<div align="center">
  <h3>🎬 Student Management System Video Demo</h3>
  <a href="https://youtu.be/0UT2XxcNEZQ">
    <img src="https://img.youtube.com/vi/0UT2XxcNEZQ/maxresdefault.jpg" alt="Video Demo" style="width:100%; max-width:600px;">
  </a>
</div>
