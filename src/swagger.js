const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Previsão do Tempo API',
      version: '1.0.0',
      description: 'API para obter informações meteorológicas',
    },
  },
  apis: ['app.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;