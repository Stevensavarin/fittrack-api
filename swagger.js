const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'FitTrack API',
        description: 'FitTrack API'
    },
    host: 'localhost:3000',
    schemes: ['http'],
     tags: [
    { name: 'Users', description: 'User-related operations' },
    { name: 'Classes', description: 'Class management' },
    { name: 'Bookings', description: 'User bookings' },
    { name: 'Memberships', description: 'Membership plans' }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generar swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);