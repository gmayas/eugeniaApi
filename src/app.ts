import express, { Application } from 'express';
import morgan from 'morgan';
// Cors
import cors from 'cors';
// Routes
import rootRoute from './routes/index';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import invRoute from './routes/invitations';
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
app.use('/', rootRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/invitations', invRoute);
//
export default app;