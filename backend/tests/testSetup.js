const { app, server } = require('../src/server');

// Antes de todas las pruebas
beforeAll((done) => {
    server.on('listening', () => {
        done();
    });
});

// Después de todas las pruebas
afterAll((done) => {
    if (server) {
        server.close(() => {
            done();
        });
    } else {
        done();
    }
});

module.exports = { app, server };
