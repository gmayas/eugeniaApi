import express, { Application } from 'express';
import morgan from 'morgan';
// Cors
import cors from 'cors';
// Routes
import UserController from './routes/user';
import rootController from './routes/index';
import invController from './routes/invitations';
// settings
const app: Application = express();
app.set('port', process.env.PORT || 4000 );
// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// Cors
app.use(cors())
// Routes
app.use('/', rootController);
app.use('/api/user', UserController);
app.use('/api/invitations', invController);
export default app;