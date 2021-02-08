const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [__dirname + '/../routes/**/*{.ts,.js}'],

  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      description: 'Documentation for Galvanize task API',
      swagger: '2.0',
      title: 'Galvanize API',
      version: '1.0.0',
    },
    basePath: '/',
  },
};
const specs = swaggerJsdoc(options);
export default specs;
