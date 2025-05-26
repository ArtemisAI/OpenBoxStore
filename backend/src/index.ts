import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Backend service is healthy' });
});

// Placeholder for other routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the OpenBox Backend API' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
