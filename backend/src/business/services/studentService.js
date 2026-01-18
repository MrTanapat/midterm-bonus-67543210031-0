// src/business/services/studentService.js
const studentRepository = require("../../data/repositories/studentRepository");
const studentValidator = require("../validators/studentValidator");

class StudentService {
  // TODO: Implement getAllStudents
  async getAllStudents(major = null, status = null) {
    // 1. Validate filters (if provided)
    if (major) studentValidator.validateMajor(major);
    if (status) studentValidator.validateStatus(status);
    // 2. เรียก studentRepository.findAll(major, status)
    const students = await studentRepository.findAll(major, status);
    // 3. คำนวณสถิติ (active, graduated, suspended, total, avgGPA)
    const statistics = {
      active: students.filter((s) => s.status === "active").length,
      graduated: students.filter((s) => s.status === "graduated").length,
      suspended: students.filter((s) => s.status === "suspended").length,
      total: students.length,
      averageGPA:
        students.length > 0
          ? parseFloat(
              (
                students.reduce((sum, s) => sum + s.gpa, 0) / students.length
              ).toFixed(2)
            )
          : 0.0,
    };
    // 4. return { students, statistics }
    return { students, statistics };
  }

  // TODO: Implement getStudentById
  async getStudentById(id) {
    // 1. Validate ID
    const validId = studentValidator.validateId(id);
    // 2. เรียก repository
    const student = await studentRepository.findById(validId);
    // 3. ถ้าไม่เจอ throw NotFoundError
    if (!student) {
      throw new Error("Student not found"); // โยนไปให้ Error Handler จัดการ Status 404
    }
    // 4. return student
    return student;
  }

  // TODO: Implement createStudent
  async createStudent(studentData) {
    // 1. Validate student data
    studentValidator.validateStudentData(studentData);
    // 2. Validate student_code format
    studentValidator.validateStudentCode(studentData.student_code);
    // 3. Validate email format
    studentValidator.validateEmail(studentData.email);
    // 4. Validate major
    studentValidator.validateMajor(studentData.major);
    // 5. เรียก repository.create()
    // 6. return created student
    return await studentRepository.create(studentData);
  }

  // TODO: Implement updateStudent
  async updateStudent(id, studentData) {
    // ให้นักศึกษาเขียนเอง
    const validId = studentValidator.validateId(id);

    const existingStudent = await this.getStudentById(validId);

    studentValidator.validateStudentData(studentData);
    studentValidator.validateStudentCode(studentData.student_code);
    studentValidator.validateEmail(studentData.email);
    studentValidator.validateMajor(studentData.major);

    return await studentRepository.update(validId, studentData);
  }

  // TODO: Implement updateGPA
  async updateGPA(id, gpa) {
    // 1. Validate GPA range (0.0 - 4.0)
    const validId = studentValidator.validateId(id);
    studentValidator.validateGPA(gpa);
    // 2. ดึงนักศึกษาจาก repository
    await this.getStudentById(validId);
    // 3. เรียก repository.updateGPA(id, gpa)
    // 4. return updated student
    return await studentRepository.updateGPA(validId, gpa);
  }

  // TODO: Implement updateStatus
  async updateStatus(id, status) {
    // 1. Validate status
    const validId = studentValidator.validateId(id);
    // 2. ดึงนักศึกษาจาก repository
    studentValidator.validateStatus(status);
    const student = await this.getStudentById(validId);
    // 3. ตรวจสอบ business rule: ไม่สามารถเปลี่ยนสถานะ withdrawn ได้
    // 4. เรียก repository.updateStatus(id, status)
    if (student.status === "withdrawn") {
      throw new Error("Cannot change status of withdrawn student");
    }
    // 5. return updated student
    return await studentRepository.updateStatus(validId, status);
  }

  // TODO: Implement deleteStudent
  async deleteStudent(id) {
    // 1. ดึงนักศึกษาจาก repository
    const validId = studentValidator.validateId(id);
    const student = await this.getStudentById(validId);
    // 2. ตรวจสอบ business rule: ไม่สามารถลบ active student
    if (student.status === "active") {
      throw new Error("Cannot delete active student. Change status first.");
    }
    // 3. เรียก repository.delete(id)
    return await studentRepository.delete(validId);
  }
}

module.exports = new StudentService();
