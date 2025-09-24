import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { ApiResponse, Student } from '../types/index.js';

// GET /api/students - Get all students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const response: ApiResponse<Student[]> = {
      success: true,
      data: students,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students',
    });
  }
};

// GET /api/students/:id - Get student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
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

    const response: ApiResponse<Student> = {
      success: true,
      data: student,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student',
    });
  }
};

// POST /api/students - Create new student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, nickname, role, subject, gender, phone, whatsapp, email, profilePic, bio, body, contactInfo } = req.body;
    let { categories } = req.body as any;
    if (typeof categories === 'string') categories = categories.split(',').map((s: string) => s.trim()).filter(Boolean);

    const student = await prisma.student.create({
      data: {
        name,
        nickname: nickname || null,
        role,
        gender: gender || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        email: email || null,
        profilePic: profilePic || null,
        bio: bio || null,
        body: body || null,
        contactInfo: contactInfo || null,
        categories: Array.isArray(categories) ? categories : [],
      },
    });

    const response: ApiResponse<Student> = {
      success: true,
      data: student,
      message: 'Student created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create student',
    });
  }
};

// PUT /api/students/:id - Update student
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, nickname, role, subject, gender, phone, whatsapp, email, profilePic, bio, body, contactInfo } = req.body;
    let { categories } = req.body as any;
    if (typeof categories === 'string') categories = categories.split(',').map((s: string) => s.trim()).filter(Boolean);

    const student = await prisma.student.update({
      where: { id },
      data: {
        name,
        nickname: nickname ?? undefined,
        role,
        gender: gender ?? undefined,
        phone: phone ?? undefined,
        whatsapp: whatsapp ?? undefined,
        email: email ?? undefined,
        profilePic: profilePic ?? undefined,
        bio: bio ?? undefined,
        body: body ?? undefined,
        contactInfo: contactInfo ?? undefined,
        categories: Array.isArray(categories) ? categories : undefined,
      },
    });

    const response: ApiResponse<Student> = {
      success: true,
      data: student,
      message: 'Student updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update student',
    });
  }
};

// DELETE /api/students/:id - Delete student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id },
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'Student deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete student',
    });
  }
};
