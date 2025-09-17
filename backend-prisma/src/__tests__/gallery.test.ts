import request from 'supertest';
import app from '../server';
import { prisma } from '../server';

describe('Gallery API', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.gallery.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/gallery', () => {
    it('should return empty array when no gallery items exist', async () => {
      const response = await request(app)
        .get('/api/gallery')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should return all gallery items with pagination', async () => {
      // Create test gallery items
      await prisma.gallery.create({
        data: {
          imageUrl: 'https://example.com/image1.jpg',
          caption: 'First image',
        },
      });

      await prisma.gallery.create({
        data: {
          imageUrl: 'https://example.com/image2.jpg',
          caption: 'Second image',
        },
      });

      const response = await request(app)
        .get('/api/gallery?page=1&limit=10')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });
  });

  describe('GET /api/gallery/:id', () => {
    it('should return gallery item by id', async () => {
      const galleryItem = await prisma.gallery.create({
        data: {
          imageUrl: 'https://example.com/test-image.jpg',
          caption: 'Test image caption',
        },
      });

      const response = await request(app)
        .get(`/api/gallery/${galleryItem.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(galleryItem.id);
      expect(response.body.data.imageUrl).toBe('https://example.com/test-image.jpg');
      expect(response.body.data.caption).toBe('Test image caption');
    });

    it('should return 404 for non-existent gallery item', async () => {
      const response = await request(app)
        .get('/api/gallery/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Gallery item not found');
    });
  });

  describe('POST /api/gallery', () => {
    it('should create a new gallery item', async () => {
      const galleryData = {
        imageUrl: 'https://example.com/new-image.jpg',
        caption: 'New gallery item',
      };

      const response = await request(app)
        .post('/api/gallery')
        .send(galleryData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.imageUrl).toBe(galleryData.imageUrl);
      expect(response.body.data.caption).toBe(galleryData.caption);
      expect(response.body.message).toBe('Gallery item created successfully');
    });

    it('should create gallery item without caption', async () => {
      const galleryData = {
        imageUrl: 'https://example.com/image-without-caption.jpg',
      };

      const response = await request(app)
        .post('/api/gallery')
        .send(galleryData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.imageUrl).toBe(galleryData.imageUrl);
      expect(response.body.data.caption).toBeNull();
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/gallery')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });

    it('should validate image URL format', async () => {
      const response = await request(app)
        .post('/api/gallery')
        .send({
          imageUrl: 'not-a-valid-url',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/gallery/:id', () => {
    it('should update an existing gallery item', async () => {
      const galleryItem = await prisma.gallery.create({
        data: {
          imageUrl: 'https://example.com/original-image.jpg',
          caption: 'Original caption',
        },
      });

      const updateData = {
        imageUrl: 'https://example.com/updated-image.jpg',
        caption: 'Updated caption',
      };

      const response = await request(app)
        .put(`/api/gallery/${galleryItem.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.imageUrl).toBe(updateData.imageUrl);
      expect(response.body.data.caption).toBe(updateData.caption);
    });
  });

  describe('DELETE /api/gallery/:id', () => {
    it('should delete an existing gallery item', async () => {
      const galleryItem = await prisma.gallery.create({
        data: {
          imageUrl: 'https://example.com/image-to-delete.jpg',
          caption: 'This will be deleted',
        },
      });

      const response = await request(app)
        .delete(`/api/gallery/${galleryItem.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Gallery item deleted successfully');

      // Verify gallery item is deleted
      const deletedItem = await prisma.gallery.findUnique({
        where: { id: galleryItem.id },
      });
      expect(deletedItem).toBeNull();
    });
  });
});
