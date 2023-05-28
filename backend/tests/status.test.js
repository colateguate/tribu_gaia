const mongoose = require('mongoose');
const Status = require('../src/models/Status');
const supertest = require('supertest');

const app = require('./testSetup');
const request = supertest(app);

describe('Status API endpoints', () => {
    // se conecta a la base de datos antes de realizar cualquier test
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });

    // limpia la base de datos después de cada test
    afterEach(async () => {
        await Status.deleteMany();
    });

    // cierra la conexión a la base de datos después de todos los tests
    afterAll(done => {
        server.close(() => {
            done();
        });
    });


    it('GET /status/all', async () => {
        const status = new Status({ name: 'En progres', description: 'La tasca/projecte està actualment en progres.' });
        await status.save();

        const response = await request.get('/api/status/all');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
    });

    it('GET /status/for-select', async () => {
        const status = new Status({ name: 'En progres', description: 'La tasca/projecte està actualment en progres.' });
        await status.save();

        const response = await request.get('/api/status/for-select');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('name');
    });

    it('GET /status/:id', async () => {
        const status = new Status({ name: 'En progres', description: 'La tasca/projecte està actualment en progres.' });
        const savedStatus = await status.save();

        const response = await request.get(`/api/status/${savedStatus.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(savedStatus.name);
        expect(response.body.description).toBe(savedStatus.description);
    });
});
