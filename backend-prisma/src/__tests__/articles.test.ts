import request from 'supertest';
import app from '../server';
import { prisma } from '../server';

describe('Articles API', () => {
  let testStudent: any;

  beforeEach(async () => {
    // Clean up database before each test
    await prisma.article.deleteMany();
    await prisma.student.deleteMany();

    // Create a test student
    testStudent = await prisma.student.create({
      data: {
        name: 'John Doe',
        role: 'Class Prefect',
        bio: 'A dedicated student leader',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/articles', () => {
    it('should return empty array when no articles exist', async () => {
      const response = await request(app)
        .get('/api/articles')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should return all articles with pagination', async () => {
      // Create test articles
      await prisma.article.create({
        data: {
          title: 'Article 1',
          content: 'Content of article 1',
          authorId: testStudent.id,
        },
      });

      await prisma.article.create({
        data: {
          title: 'Article 2',
          content: 'Content of article 2',
          authorId: testStudent.id,
        },
      });

      const response = await request(app)
        .get('/api/articles?page=1&limit=10')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });
  });

  describe('GET /api/articles/:id', () => {
    it('should return article by id with author', async () => {
      const article = await prisma.article.create({
        data: {
          title: 'Test Article',
          content: 'Test content',
          authorId: testStudent.id,
        },
      });

      const response = await request(app)
        .get(`/api/articles/${article.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(article.id);
      expect(response.body.data.title).toBe('Test Article');
      expect(response.body.data.author).toBeDefined();
      expect(response.body.data.author.id).toBe(testStudent.id);
    });

    it('should return 404 for non-existent article', async () => {
      const response = await request(app)
        .get('/api/articles/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Article not found');
    });
  });

  describe('POST /api/articles', () => {
    it('should create a new article', async () => {
      const articleData = {
        title: 'New Article',
        content: 'This is the content of the new article',
        authorId: testStudent.id,
      };

      const response = await request(app)
        .post('/api/articles')
        .send(articleData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(articleData.title);
      expect(response.body.data.content).toBe(articleData.content);
      expect(response.body.data.authorId).toBe(testStudent.id);
      expect(response.body.data.author).toBeDefined();
    });

    it('should return 400 for non-existent author', async () => {
      const articleData = {
        title: 'New Article',
        content: 'This is the content of the new article',
        authorId: 'non-existent-author-id',
      };

      const response = await request(app)
        .post('/api/articles')
        .send(articleData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Author not found');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/articles')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('should update an existing article', async () => {
      const article = await prisma.article.create({
        data: {
          title: 'Original Title',
          content: 'Original content',
          authorId: testStudent.id,
        },
      });

      const updateData = {
        title: 'Updated Title',
        content: 'Updated content',
        authorId: testStudent.id,
      };

      const response = await request(app)
        .put(`/api/articles/${article.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.content).toBe(updateData.content);
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('should delete an existing article', async () => {
      const article = await prisma.article.create({
        data: {
          title: 'Article to Delete',
          content: 'This article will be deleted',
          authorId: testStudent.id,
        },
      });

      const response = await request(app)
        .delete(`/api/articles/${article.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Article deleted successfully');

      // Verify article is deleted
      const deletedArticle = await prisma.article.findUnique({
        where: { id: article.id },
      });
      expect(deletedArticle).toBeNull();
    });
  });
});
