import express from 'express';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js';
import { validateTeacher, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/teachers - Get all teachers
router.get('/', getAllTeachers);

// GET /api/teachers/:id - Get teacher by ID
router.get('/:id', getTeacherById);

// POST /api/teachers - Create new teacher
router.post('/', validateTeacher, handleValidationErrors, createTeacher);

// PUT /api/teachers/:id - Update teacher
router.put('/:id', validateTeacher, handleValidationErrors, updateTeacher);

// DELETE /api/teachers/:id - Delete teacher
router.delete('/:id', deleteTeacher);

export default router;