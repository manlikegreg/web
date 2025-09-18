import { prisma } from '../server.js';
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await prisma.teacher.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({
            success: true,
            data: teachers,
        });
    }
    catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch teachers',
        });
    }
};
export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await prisma.teacher.findUnique({
            where: { id },
        });
        if (!teacher) {
            res.status(404).json({
                success: false,
                error: 'Teacher not found',
            });
            return;
        }
        res.json({
            success: true,
            data: teacher,
        });
    }
    catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch teacher',
        });
    }
};
export const createTeacher = async (req, res) => {
    try {
        const teacher = await prisma.teacher.create({
            data: req.body,
        });
        res.status(201).json({
            success: true,
            data: teacher,
        });
    }
    catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create teacher',
        });
    }
};
export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });
        if (!existingTeacher) {
            res.status(404).json({
                success: false,
                error: 'Teacher not found',
            });
            return;
        }
        const teacher = await prisma.teacher.update({
            where: { id },
            data: req.body,
        });
        res.json({
            success: true,
            data: teacher,
        });
    }
    catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update teacher',
        });
    }
};
export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });
        if (!existingTeacher) {
            res.status(404).json({
                success: false,
                error: 'Teacher not found',
            });
            return;
        }
        await prisma.teacher.delete({
            where: { id },
        });
        res.json({
            success: true,
            data: null,
        });
    }
    catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete teacher',
        });
    }
};
//# sourceMappingURL=teacherController.js.map