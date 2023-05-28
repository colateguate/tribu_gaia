const request = require('supertest');
const app = require('../src/server');
const Student = require('../src/models/Student');

describe('Student API endpoints', () => {
    let server;
    let savedStudent;

    beforeAll(async () => {
        server = app.listen(3000);
        const testStudent = new Student({
            name: 'John',
            tutor1: 'Jane',
            tutor2: 'Doe',
            phone: '1234567890',
            email: 'john@example.com',
            address: '123 Main St',
            city: 'Anywhere',
            zip_code: '12345',
        });
        savedStudent = await testStudent.save();
    });

    test('GET /students/all', async () => {
        const response = await request(server).get('/api/students/all');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    test('GET /students/:id', async () => {
        const response = await request(server).get(`/api/students/${savedStudent.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedStudent.name);
    });

    test('POST /students', async () => {
        const newStudent = {
            name: 'Alice',
            tutor1: 'Bob',
            phone: '0987654321',
            email: 'alice@example.com',
            address: '456 Other St',
            city: 'Somewhere',
            zip_code: '54321',
        };
        const response = await request(server).post('/api/students').send(newStudent);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newStudent.name);
    });

    test('PUT /students/:id', async () => {
        const updatedStudent = {
            name: 'Updated John',
            tutor1: 'Updated Jane',
            phone: '9876543210',
            email: 'updated@example.com',
            address: '321 Updated St',
            city: 'Updated',
            zip_code: '32154',
        };
        const response = await request(server).put(`/api/students/${savedStudent.id}`).send(updatedStudent);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedStudent.name);
    });

    test('DELETE /students/:id', async () => {
        const response = await request(server).delete(`/api/students/${savedStudent.id}`);
        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        await Student.deleteMany();
        await server.close();
    });
});
