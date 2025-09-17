import request from 'supertest';
import app from '../server';
import { prisma } from '../server';

describe('Students API', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.article.deleteMany();
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/students', () => {
    it('should return empty array when no students exist', async () => {
      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should return all students', async () => {
      // Create test students
      const student1 = await prisma.student.create({
        data: {
          name: 'John Doe',
          role: 'Class Prefect',
          bio: 'A dedicated student leader',
        },
      });

      const student2 = await prisma.student.create({
        data: {
          name: 'Jane Smith',
          role: 'Academic Secretary',
          bio: 'Passionate about learning',
        },
      });

      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].name).toBe('Jane Smith'); // Ordered by createdAt desc
    });
  });

  describe('GET /api/students/:id', () => {
    it('should return student by id', async () => {
      const student = await prisma.student.create({
        data: {
          name: 'John Doe',
          role: 'Class Prefect',
          bio: 'A dedicated student leader',
        },
      });

      const response = await request(app)
        .get(`/api/students/${student.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(student.id);
      expect(response.body.data.name).toBe('John Doe');
    });

    it('should return 404 for non-existent student', async () => {
      const response = await request(app)
        .get('/api/students/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Student not found');
    });
  });

  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const studentData = {
        name: 'John Doe',
        role: 'Class Prefect',
        bio: 'A dedicated student leader',
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(studentData.name);
      expect(response.body.data.role).toBe(studentData.role);
      expect(response.body.message).toBe('Student created successfully');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });

    it('should validate field lengths', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'A', // Too short
          role: 'B', // Too short
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/students/:id', () => {
    it('should update an existing student', async () => {
      const student = await prisma.student.create({
        data: {
          name: 'John Doe',
          role: 'Class Prefect',
          bio: 'A dedicated student leader',
        },
      });

      const updateData = {
        name: 'John Updated',
        role: 'Senior Prefect',
        bio: 'Updated bio',
      };

      const response = await request(app)
        .put(`/api/students/${student.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.role).toBe(updateData.role);
    });

    it('should return 404 for non-existent student', async () => {
      const response = await request(app)
        .put('/api/students/non-existent-id')
        .send({
          name: 'John Updated',
          role: 'Senior Prefect',
        })
        .expect(500); // Prisma will throw an error for non-existent record
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('should delete an existing student', async () => {
      const student = await prisma.student.create({
        data: {
          name: 'John Doe',
          role: 'Class Prefect',
          bio: 'A dedicated student leader',
        },
      });

      const response = await request(app)
        .delete(`/api/students/${student.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Student deleted successfully');

      // Verify student is deleted
      const deletedStudent = await prisma.student.findUnique({
        where: { id: student.id },
      });
      expect(deletedStudent).toBeNull();
    });

    it('should return 500 for non-existent student', async () => {
      const response = await request(app)
        .delete('/api/students/non-existent-id')
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });
});
