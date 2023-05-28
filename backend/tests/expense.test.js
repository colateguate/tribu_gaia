const request = require('supertest');
const app = require('./testSetup');
const Expense = require('../src/models/Expense');
const mongoose = require('mongoose');

describe('Expense API endpoints', () => {
    let server;
    let savedExpense;

    beforeAll(async () => {
        server = app.listen(3000);
        const testExpense = new Expense({
            name: 'Rent',
            expense_category_id: new mongoose.Types.ObjectId(),
            amount: 500
        });
        savedExpense = await testExpense.save();
    });

    test('GET /expenses/all', async () => {
        const response = await request(server).get('/api/expenses/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
    });

    test('GET /expenses/:id', async () => {
        const savedExpense = await Expense.findOne({ name: 'Rent' });

        const response = await request(server).get(`/api/expenses/${savedExpense.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedExpense.name);
        expect(response.body.amount).toBe(savedExpense.amount);
    });

    test('GET /expenses/for-select', async () => {
        const response = await request(server).get('/api/expenses/for-select');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
    });

    test('POST /expenses/create', async () => {
        const newExpense = {
            name: 'Food',
            expense_category_id: new mongoose.Types.ObjectId(),
            amount: 200
        };
        const response = await request(server).post('/api/expenses/create').send(newExpense);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newExpense.name);
        expect(response.body.amount).toBe(newExpense.amount);
    });

    test('PUT /expenses/:id', async () => {
        const updatedExpense = {
            name: 'Updated Rent',
            expense_category_id: new mongoose.Types.ObjectId(),
            amount: 600
        };
        const response = await request(server).put(`/api/expenses/${savedExpense.id}`).send(updatedExpense);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedExpense.name);
        expect(response.body.amount).toBe(updatedExpense.amount);
    });

    test('DELETE /expenses/:id', async () => {
        const response = await request(server).delete(`/api/expenses/${savedExpense.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Expense removed successfully');

        const deletedExpense = await Expense.findById(savedExpense.id);
        expect(deletedExpense).toBeNull();
    });


    afterAll(done => {
        server.close(() => {
            done();
        });
    });
});
