# Architecture Comparison

## Layered Architecture (Before)

### Pros:
- โครงสร้างเรียบง่าย เหมาะสำหรับแอปพลิเคชันขนาดเล็ก
- จัดการและ Debug ได้ง่ายภายในโปรเจกต์เดียวเนื่องจากไม่มีความซับซ้อนเรื่อง Network

### Cons:
- Frontend และ Backend ผูกติดกันแน่น (Tight Coupling) ทำให้ยากต่อการแก้ไขหรือเปลี่ยนเทคโนโลยีส่วนใดส่วนหนึ่ง
- ไม่สามารถขยายระบบ (Scale) แยกส่วนได้ และไม่รองรับ Client หลากหลายประเภท

## Client-Server Architecture (After)

### Pros:
- แยกความรับผิดชอบชัดเจน (Separation of Concerns) ทำให้ทีมพัฒนา Frontend และ Backend ทำงานขนานกันได้
- รองรับการขยายระบบได้ดี และสามารถนำ Backend ไปใช้กับ Client อื่นๆ (เช่น Mobile App) ได้ในอนาคต

### Cons:
- เพิ่มความซับซ้อนในการจัดการระบบเครือข่ายและการรักษาความปลอดภัย เช่น การตั้งค่า CORS
- มี Network Overhead เพิ่มขึ้นจากการเรียกใช้งาน API ผ่าน HTTP Protocol

## Changes Made

### 1. Separation
- ทำการแยก Frontend และ Backend ออกเป็น 2 โปรเจกต์อิสระ โดย Backend รันบน Ubuntu VM และ Frontend รันบน Local PC

### 2. Communication
- เปลี่ยนการเรียกใช้ข้อมูลจากการผูกติดใน Layer มาเป็นการสื่อสารผ่าน REST API โดยใช้ Fetch API (HTTP/JSON) เป็นมาตรฐาน

### 3. CORS
- มีการติดตั้งและใช้งาน Middleware 'cors' ในไฟล์ server.js เพื่ออนุญาตให้ Client จากภายนอก (Local PC) สามารถเข้าถึงทรัพยากรบน Server (VM) ได้

### 4. API Response Format
- กำหนดมาตรฐานการตอบกลับข้อมูลให้เป็น JSON Format ทั้งหมด เพื่อความเป็นระเบียบและความสะดวกในการนำข้อมูลไปใช้แสดงผลบน UI
