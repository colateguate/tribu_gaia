module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.0.3', // Versión de MongoDB
            skipMD5: true
        },
        autoStart: false
    }
};
