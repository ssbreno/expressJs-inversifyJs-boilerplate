import { Container } from './infrastructure/config/inversify';
import 'reflect-metadata';

const container = new Container();
const app = container.getApp();

app.initialize(process);
app.listen();
