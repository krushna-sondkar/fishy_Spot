import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logger } from '../artifacts/api-server/src/lib/logger';
import router from '../artifacts/api-server/src/routes/index';

const app = express();

// Middleware
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split('?')[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);
app.use(router);

// Health check
app.get('/healthz', (_req: any, res: any) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
