import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { validateStudent, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/students - Get all students
router.get('/', getAllStudents);

// GET /api/students/:id - Get student by ID
router.get('/:id', getStudentById);

// POST /api/students - Create new student
router.post('/', validateStudent, handleValidationErrors, createStudent);

// PUT /api/students/:id - Update student
router.put('/:id', validateStudent, handleValidationErrors, updateStudent);

// DELETE /api/students/:id - Delete student
router.delete('/:id', deleteStudent);

export default router;
