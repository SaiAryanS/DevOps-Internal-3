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
});
