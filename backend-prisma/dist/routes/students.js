"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get('/', studentController_1.getAllStudents);
router.get('/:id', studentController_1.getStudentById);
router.post('/', validation_1.validateStudent, validation_1.handleValidationErrors, studentController_1.createStudent);
router.put('/:id', validation_1.validateStudent, validation_1.handleValidationErrors, studentController_1.updateStudent);
router.delete('/:id', studentController_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=students.js.map