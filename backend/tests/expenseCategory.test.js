const mongoose = require('mongoose');
const ExpenseCategory = require('../src/models/ExpenseCategory');
const supertest = require('supertest');
const app = require('./testSetup');

const request = supertest(app);

describe('ExpenseCategory API endpoints', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });

    afterEach(async () => {
        await ExpenseCategory.deleteMany();
    });

    afterAll(done => {
        server.close(() => {
            done();
        });
    });


    it('GET /expense-categories/all', async () => {
        const expenseCategory = new ExpenseCategory({ name: 'Gastos generales', description: 'Gastos generales de la empresa.' });
        await expenseCategory.save();

        const response = await request.get('/api/expense-categories/all');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
    });

    it('GET /expense-categories/:id', async () => {
        const expenseCategory = new ExpenseCategory({ name: 'Gastos generales', description: 'Gastos generales de la empresa.' });
        const savedExpenseCategory = await expenseCategory.save();

        const response = await request.get(`/api/expense-categories/${savedExpenseCategory.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedExpenseCategory.name);
        expect(response.body.description).toBe(savedExpenseCategory.description);
    });

    it('GET /expense-categories/for-select', async () => {
        const expenseCategory = new ExpenseCategory({ name: 'Gastos generales', description: 'Gastos generales de la empresa.' });
        await expenseCategory.save();

        const response = await request.get('/api/expense-categories/for-select');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('name');
    });
});
