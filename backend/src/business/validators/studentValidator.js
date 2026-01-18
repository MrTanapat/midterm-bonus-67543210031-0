// src/business/validators/studentValidator.js
class StudentValidator {
    
    // ตรวจสอบความครบถ้วนของฟิลด์พื้นฐาน
    validateStudentData(data) {
        const { student_code, first_name, last_name, email, major } = data;
        
        if (!student_code || !first_name || !last_name || !email || !major) {
            throw new Error('All fields are required'); // จะถูกจัดการเป็น Status 400 ใน Error Handler
        }
        
        return true;
    }
    
    // ตรวจสอบรหัสนักศึกษา (10 หลัก)
    validateStudentCode(code) {
        const codePattern = /^\d{10}$/;
        
        if (!codePattern.test(code)) {
            throw new Error('Invalid student code format (must be 10 digits)');
        }
        
        return true;
    }
    
    // ตรวจสอบรูปแบบอีเมล
    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            throw new Error('Invalid email format');
        }
        
        return true;
    }
    
    // ตรวจสอบสาขาวิชา (CS, SE, IT, CE, DS)
    validateMajor(major) {
        const validMajors = ['CS', 'SE', 'IT', 'CE', 'DS'];
        
        if (!validMajors.includes(major)) {
            throw new Error('Invalid major. Must be one of: CS, SE, IT, CE, DS');
        }
        
        return true;
    }
    
    // ตรวจสอบช่วงเกรดเฉลี่ย (0.0 - 4.0)
    validateGPA(gpa) {
        if (gpa === undefined || gpa < 0 || gpa > 4.0) {
            throw new Error('GPA must be between 0.0 and 4.0');
        }
        
        return true;
    }
    
    // ตรวจสอบสถานะนักศึกษา
    validateStatus(status) {
        const validStatuses = ['active', 'graduated', 'suspended', 'withdrawn'];
        
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status. Must be one of: active, graduated, suspended, withdrawn');
        }
        
        return true;
    }
    
    // ตรวจสอบความถูกต้องของ ID
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid student ID');
        }
        return numId;
    }
}

module.exports = new StudentValidator();