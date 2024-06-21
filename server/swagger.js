const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Adaan Digital user-profile Backend Application',
        description: 'Description of my API',
    },
    host: 'adaan-digital.onrender.com',
    schemes: ['https'],
    // host: 'localhost:8080',
    // schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); 
});
