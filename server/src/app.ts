import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { connectDB } from './config/db';
// import { errorHandler } from './middlewares/errorHandler';
import socketSetup from './sockets';
import authRoutes from './routes/authRoutes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use('/api', routes);
app.use('/api/auth', authRoutes);
// Error Handling
// app.use(errorHandler);

// Socket Setup
const server = app.listen(process.env.PORT || 5050, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 5050}`);
});

socketSetup(server);

export default app;
