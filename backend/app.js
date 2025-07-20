import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import notesRouter from './routes/notes.routes.js';
import boardRouter from './routes/boards.routes.js';
import meetingsRouter from './routes/meetings.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static(join(process.cwd(), '..', 'frontend', 'dist')));
app.use(cors());

app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Prevent parameter polution
app.use(hpp());

const limiter = rateLimit({
	limit: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in 1 hour!',
});

app.use('/api', limiter);

app.use('/api/user', userRouter);
app.use('/api/boards', boardRouter);
app.use('/api/notes', notesRouter);
app.use('/api/meetings', meetingsRouter);

app.get('*', (req, res) => {
	return res.sendFile(
		join(process.cwd(), '..', 'frontend', 'dist', 'index.html')
	);
});

// Global error handling middleware
app.use((err, req, res, next) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

export default app;
