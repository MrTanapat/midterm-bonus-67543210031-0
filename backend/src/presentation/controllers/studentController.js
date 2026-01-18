// src/presentation/controllers/studentController.js
const studentService = require("../../business/services/studentService");

class StudentController {
  // TODO: Implement getAllStudents
  async getAllStudents(req, res, next) {
    try {
      const { major, status } = req.query;
      // เรียก studentService.getAllStudents()
      // ส่ง response กลับ
      const result = await studentService.getAllStudents(major, status);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement getStudentById
  async getStudentById(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);
      res.json(student);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement createStudent
  async createStudent(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const studentData = req.body;
      const newStudent = await studentService.createStudent(studentData);
      res.status(201).json(newStudent);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement updateStudent
  async updateStudent(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const { id } = req.params;
      const studentData = req.body;
      const updatedStudent = await studentService.updateStudent(
        id,
        studentData
      );
      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement updateGPA
  async updateGPA(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const { id } = req.params;
      const { gpa } = req.body;
      const result = await studentService.updateGPA(id, gpa);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement updateStatus
  async updateStatus(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await studentService.updateStatus(id, status);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // TODO: Implement deleteStudent
  async deleteStudent(req, res, next) {
    // ให้นักศึกษาเขียนเอง
    try {
      const { id } = req.params;
      const result = await studentService.deleteStudent(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
