import { injectable } from 'inversify';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Application, Router } from 'express';

@injectable()
export class SwaggerConfig {
  public initialize(app: Application) {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'CRUD API Documentation for Gen',
          version: '1.0.0',
          description:
            'ExpressJs InversifyJs TypeOrm Postgres Application Documentation',
        },
        schemes: ['http'],
        host: `http://localhost:8000`,
        basePath: `/api`,
        contact: {
          email: 'ssobralbreno@gmail.com',
          name: 'Breno Sobral',
        },
      },
      apis: [
        `./src/application/controllers/**/*.controller.ts`,
        `./src/domain/dto/**/*.dto.ts`,
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);

    const swaggerRouter = Router();
    swaggerRouter.get('/v1/swagger.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/docs', swaggerRouter);
  }
}
