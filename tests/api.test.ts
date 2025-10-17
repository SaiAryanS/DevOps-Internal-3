import supertest from 'supertest';

// These tests run against the live development server as instructed in the README.
// The base URL should match the port configured in the `dev` script in package.json.
const appUrl = 'http://localhost:9002';

describe('API Endpoints', () => {
  describe('GET /api', () => {
    it('should respond with a 200 status code and a welcome message', async () => {
      try {
        const response = await supertest(appUrl).get('/api');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true, msg: 'Hello from Node' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Connection error: Please ensure the dev server is running on ' + appUrl);
        throw error;
      }
    });
  });

  describe('GET /api/health', () => {
    it('should respond with a 200 status code and a healthy status', async () => {
      try {
        const response = await supertest(appUrl).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'healthy' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Connection error: Please ensure the dev server is running on ' + appUrl);
        throw error;
      }
    });
  });

  describe('CRUD API for /api/items', () => {
    let createdItemId: number;

    it('POST /api/items - should create a new item', async () => {
      const newItem = { name: 'New Test Item' };
      const response = await supertest(appUrl)
        .post('/api/items')
        .send(newItem);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newItem.name);
      createdItemId = response.body.id;
    });

    it('GET /api/items - should return a list of items including the new one', async () => {
      const response = await supertest(appUrl).get('/api/items');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some(item => item.id === createdItemId)).toBe(true);
    });

    it('GET /api/items/:id - should return the specific item', async () => {
      const response = await supertest(appUrl).get(`/api/items/${createdItemId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdItemId);
      expect(response.body.name).toBe('New Test Item');
    });

    it('PUT /api/items/:id - should update the item', async () => {
      const updatedItem = { name: 'Updated Test Item' };
      const response = await supertest(appUrl)
        .put(`/api/items/${createdItemId}`)
        .send(updatedItem);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedItem.name);
    });

    it('DELETE /api/items/:id - should delete the item', async () => {
      const response = await supertest(appUrl).delete(`/api/items/${createdItemId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdItemId);

      // Verify the item is gone
      const getResponse = await supertest(appUrl).get(`/api/items/${createdItemId}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
