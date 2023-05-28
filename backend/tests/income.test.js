const request = require('supertest');
const app = require('../src/server');
const Income = require('../src/models/Income');
const mongoose = require('mongoose');

describe('Income API endpoints', () => {
    let server;
    let savedIncome;

    beforeAll(async () => {
        server = app.listen(3000);
        const testIncome = new Income({
            name: 'Tuition',
            income_category_id: new mongoose.Types.ObjectId(),
            student_id: new mongoose.Types.ObjectId(),
            amount: 1000
        });
        savedIncome = await testIncome.save();
    });

    test('GET /incomes/all', async () => {
        const response = await request(server).get('/api/incomes/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
    });

    test('GET /incomes/:id', async () => {
        const response = await request(server).get(`/api/incomes/${savedIncome.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedIncome.name);
        expect(response.body.amount).toBe(savedIncome.amount);
    });

    test('POST /incomes', async () => {
        const income = {
            name: 'Test income',
            income_category_id: new mongoose.Types.ObjectId(),
            student_id: new mongoose.Types.ObjectId(),
            amount: 500
        };
        const response = await request(server).post('/api/incomes').send(income);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(income.name);
        expect(response.body.amount).toBe(income.amount);
    });

    test('PUT /incomes/:id', async () => {
        const updatedIncome = {
            name: 'Updated income',
            income_category_id: savedIncome.income_category_id,
            student_id: savedIncome.student_id,
            amount: 1200
        };
        const response = await request(server).put(`/api/incomes/${savedIncome.id}`).send(updatedIncome);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedIncome.name);
        expect(response.body.amount).toBe(updatedIncome.amount);
    });

    test('DELETE /incomes/:id', async () => {
        const response = await request(server).delete(`/api/incomes/${savedIncome.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Income removed successfully');
    });

    afterAll(async () => {
        await Income.deleteMany();
        await server.close();
    });
});
