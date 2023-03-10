import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from './common/utils/appError';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/infrastructure/config/swagger';
import bodyParser from 'body-parser';
import dataSource from './infrastructure/config/datasource';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
const port = process.env.PORT || 8000;

dataSource.initialize();

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

/* Swagger */
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => res.redirect('docs'));

/* Routes */
const routes = require('../src/routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server started with pid: ${process.pid} on port: ${port}`);
});
