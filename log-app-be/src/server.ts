import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import logEntryRouter from './routes/logEntry.routes';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1/log-entries', logEntryRouter);


// Not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'API endpoint not found' });
});

// Global Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR; 
  res.status(statusCode).json({
    message: 'An unexpected error occurred',
  });

  // TODO: Handle specific error types (e.g. not found errors, validation errors)
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;