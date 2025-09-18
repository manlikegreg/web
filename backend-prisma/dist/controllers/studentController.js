"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const server_1 = require("../server");
const getAllStudents = async (req, res) => {
    try {
        const students = await server_1.prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const response = {
            success: true,
            data: students,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch students',
        });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await server_1.prisma.student.findUnique({
            where: { id },
            include: {
                articles: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!student) {
            res.status(404).json({
                success: false,
                error: 'Student not found',
            });
            return;
        }
        const response = {
            success: true,
            data: student,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch student',
        });
    }
};
exports.getStudentById = getStudentById;
const createStudent = async (req, res) => {
    try {
        const { name, role, profilePic, bio } = req.body;
        const student = await server_1.prisma.student.create({
            data: {
                name,
                role,
                profilePic,
                bio,
            },
        });
        const response = {
            success: true,
            data: student,
            message: 'Student created successfully',
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create student',
        });
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, profilePic, bio } = req.body;
        const student = await server_1.prisma.student.update({
            where: { id },
            data: {
                name,
                role,
                profilePic,
                bio,
            },
        });
        const response = {
            success: true,
            data: student,
            message: 'Student updated successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update student',
        });
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await server_1.prisma.student.delete({
            where: { id },
        });
        const response = {
            success: true,
            message: 'Student deleted successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete student',
        });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=studentController.js.map