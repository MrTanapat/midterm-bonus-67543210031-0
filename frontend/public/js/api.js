// js/api.js - API Client Layer

class StudentAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // ดึงข้อมูลนักศึกษาทั้งหมด พร้อมรองรับ Filter
    async getAllStudents(major = null, status = null) {
        let url = `${this.baseURL}/students`;
        const params = [];
        if (major) params.push(`major=${major}`);
        if (status) params.push(`status=${status}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch students');
        return await response.json();
    }

    // เพิ่มนักศึกษาใหม่
    async createStudent(studentData) {
        const response = await fetch(`${this.baseURL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create student');
        }
        return await response.json();
    }

    // อัปเดต GPA (PATCH)
    async updateGPA(id, gpa) {
        const response = await fetch(`${this.baseURL}/students/${id}/gpa`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gpa: parseFloat(gpa) })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        return await response.json();
    }

    // อัปเดตสถานะ (PATCH)
    async updateStatus(id, status) {
        const response = await fetch(`${this.baseURL}/students/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        return await response.json();
    }

    // ลบข้อมูลนักศึกษา
    async deleteStudent(id) {
        const response = await fetch(`${this.baseURL}/students/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        return await response.json();
    }
}

// ✅ ประกาศ Instance ไว้ที่นี่เพื่อให้เป็น Global Variable
const API_BASE_URL = 'http://localhost:3000/api';
const api = new StudentAPI(API_BASE_URL);