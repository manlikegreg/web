import request from 'supertest';
import app from '../server';

describe('Articles API', () => {
  describe('GET /api/articles', () => {
    it('should return articles list', async () => {
      const response = await request(app)
        .get('/api/articles')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/articles?page=1&limit=5')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
    });

    it('should filter by category', async () => {
      const response = await request(app)
        .get('/api/articles?category=Science')
        .expect(200);

      expect(response.body.success).toBe(true);
      if (response.body.data.length > 0) {
        expect(response.body.data[0].category).toBe('Science');
      }
    });
  });

  describe('GET /api/articles/:id', () => {
    it('should return article by id', async () => {
      // First get articles to get a valid ID
      const articlesResponse = await request(app)
        .get('/api/articles')
        .expect(200);

      if (articlesResponse.body.data.length > 0) {
        const articleId = articlesResponse.body.data[0].id;
        
        const response = await request(app)
          .get(`/api/articles/${articleId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(articleId);
      }
    });

    it('should return 404 for non-existent article', async () => {
      const response = await request(app)
        .get('/api/articles/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
