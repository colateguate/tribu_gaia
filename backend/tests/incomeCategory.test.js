const request = require('supertest');
const app = require('./testSetup');
const mongoose = require('mongoose');
const IncomeCategory = require('../src/models/IncomeCategory');

describe('IncomeCategory API endpoints', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });

    afterEach(async () => {
        await IncomeCategory.deleteMany();
    });

    afterAll(done => {
        server.close(() => {
            done();
        });
    });

    test('GET /income-categories/all', async () => {
        const response = await request(app).get('/api/income-categories/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
    });

    test('GET /income-categories/:id', async () => {
        const savedIncomeCategory = await IncomeCategory.findOne({ name: 'Ingresos generales' });

        const response = await request(app).get(`/api/income-categories/${savedIncomeCategory.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedIncomeCategory.name);
        expect(response.body.description).toBe(savedIncomeCategory.description);
    });

    test('GET /income-categories/for-select', async () => {
        const response = await request(app).get('/api/income-categories/for-select');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('name');
    });
});
