const request = require('supertest');
const app = require('../src/server');
const Task = require('../src/models/Task');
const Status = require('../src/models/Status');
const mongoose = require('mongoose');

describe('Task API endpoints', () => {
    let server;
    let status;
    let savedTask;

    beforeAll(async () => {
        server = app.listen(3000);
        status = new Status({
            name: 'Open'
        });
        await status.save();

        const testTask = new Task({
            name: 'Homework',
            description: 'Math Homework',
            status_id: status._id,
            end_date: new Date()
        });
        savedTask = await testTask.save();
    });

    test('GET /tasks/all', async () => {
        const response = await request(server).get('/api/tasks/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    test('GET /tasks/:id', async () => {
        const response = await request(server).get(`/api/tasks/${savedTask.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedTask.name);
        expect(response.body.description).toBe(savedTask.description);
    });

    test('POST /tasks', async () => {
        const taskData = {
            name: 'Study',
            description: 'Science study',
            status_id: status._id,
            end_date: new Date()
        };
        const response = await request(server).post('/api/tasks').send(taskData);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(taskData.name);
        expect(response.body.description).toBe(taskData.description);
    });

    test('PUT /tasks/:id', async () => {
        const updateData = {
            name: 'Updated Task',
            description: 'Updated Description',
        };
        const response = await request(server).put(`/api/tasks/${savedTask.id}`).send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updateData.name);
        expect(response.body.description).toBe(updateData.description);
    });

    test('DELETE /tasks/:id', async () => {
        const response = await request(server).delete(`/api/tasks/${savedTask.id}`);

        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        await Task.deleteMany();
        await Status.deleteMany();
        await server.close();
    });
});
