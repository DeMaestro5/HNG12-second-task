import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      number: req.query.number || 'unknown',
      error: true,
    });
  }
);

export default app;
