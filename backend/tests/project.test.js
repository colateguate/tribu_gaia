const request = require('supertest');
const app = require('../src/server');
const Project = require('../src/models/Project');
const Status = require('../src/models/Status');
const mongoose = require('mongoose');

describe('Project API endpoints', () => {
    let server;
    let status;
    let savedProject;

    beforeAll(async () => {
        server = app.listen(3000);
        status = new Status({
            name: 'Open'
        });
        await status.save();

        const testProject = new Project({
            name: 'New Project',
            description: 'A test project',
            status_id: status._id,
            end_date: new Date()
        });
        savedProject = await testProject.save();
    });

    test('GET /projects/all', async () => {
        const response = await request(server).get('/api/projects/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    test('GET /projects/:id', async () => {
        const response = await request(server).get(`/api/projects/${savedProject.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedProject.name);
        expect(response.body.description).toBe(savedProject.description);
    });

    test('POST /projects', async () => {
        const newProject = {
            name: 'Another Project',
            description: 'Another test project',
            status_id: status._id,
            end_date: new Date()
        };
        const response = await request(server).post('/api/projects').send(newProject);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newProject.name);
        expect(response.body.description).toBe(newProject.description);
    });

    test('PUT /projects/:id', async () => {
        const updatedProject = {
            name: 'Updated Project',
            description: 'Updated test project',
            status_id: status._id,
            end_date: new Date()
        };
        const response = await request(server).put(`/api/projects/${savedProject.id}`).send(updatedProject);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedProject.name);
        expect(response.body.description).toBe(updatedProject.description);
    });

    test('DELETE /projects/:id', async () => {
        const response = await request(server).delete(`/api/projects/${savedProject.id}`);

        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        await Project.deleteMany();
        await Status.deleteMany();
        await server.close();
    });
});
