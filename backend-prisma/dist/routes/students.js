import express from 'express';
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, } from '../controllers/studentController.js';
import { validateStudent, handleValidationErrors } from '../middleware/validation.js';
const router = express.Router();
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', validateStudent, handleValidationErrors, createStudent);
router.put('/:id', validateStudent, handleValidationErrors, updateStudent);
router.delete('/:id', deleteStudent);
export default router;
//# sourceMappingURL=students.js.map