import express from 'express';
import { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher, } from '../controllers/teacherController.js';
import { validateTeacher, handleValidationErrors } from '../middleware/validation.js';
const router = express.Router();
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', validateTeacher, handleValidationErrors, createTeacher);
router.put('/:id', validateTeacher, handleValidationErrors, updateTeacher);
router.delete('/:id', deleteTeacher);
export default router;
//# sourceMappingURL=teachers.js.map