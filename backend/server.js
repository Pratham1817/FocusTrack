import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error(err.message));

const server = app.listen(process.env.PORT, () =>
	console.log(`App running on port ${process.env.PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.error(`Unhandled Rejection at:, ${promise}, reason: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
