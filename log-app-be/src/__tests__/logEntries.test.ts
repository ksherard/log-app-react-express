import { describe, it, expect, beforeAll, afterAll } from 'vitest'; 
import request from 'supertest';
import app from '../server';

// --- Test Data ---
const VALID_ID = '1';
const INVALID_ID = 'non-existent-id';
const BASE_URL = '/api/v1/log-entries';

describe(`GET ${BASE_URL}/:logId`, () => {
  it('should return 200 OK and the log entry if ID is valid', async () => {
    const response = await request(app).get(`${BASE_URL}/${VALID_ID}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.logId).toBe(VALID_ID);
    expect(response.body).toHaveProperty('description');
  });

//   TODO: expect 404 for invalid IDs
});

// --- TODO: Add more describe/it blocks for other endpoints ---
// describe(`POST ${BASE_URL}`, () => { ... });
// describe(`PATCH ${BASE_URL}/:logId`, () => { ... });
// describe(`DELETE ${BASE_URL}/:logId`, () => { ... });
// describe(`GET ${BASE_URL}`, () => { ... });