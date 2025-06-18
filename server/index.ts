import express from 'express';
import cors from 'cors';
import { callsRouter } from './routes/calls';
import { tagsRouter } from './routes/tags';
import { connectDB } from './config/database';

const app = express();
const port = process.env.SERVER_PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calls', callsRouter);
app.use('/api/tags', tagsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 