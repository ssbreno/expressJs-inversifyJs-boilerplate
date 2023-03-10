import swaggerJsdoc from 'swagger-jsdoc';

const url = 'http://localhost:3000';

const swaggerDefinition = {
  info: {
    contact: {
      email: 'ssobralbreno@gmail.com',
      name: 'Breno Sobral',
    },
    description: 'Custom structure to build an REST API using Express.js',
    license: {
      name: 'All Rights Reserved',
    },
    title: 'Gen CRUD API Documentation',
    version: '1.0',
  },
  openapi: '3.0.0',
  produces: ['application/json'],
  servers: [{ url }],
};

const options = {
  apis: ['./src/routes/*.ts'],
  basePath: '/',
  swaggerDefinition,
};

export const swaggerSpec = swaggerJsdoc(options);
