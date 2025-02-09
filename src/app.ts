import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { response } from './utils';
import { connection } from 'mongoose';
import productRoutes from './services/product.service';
import orderRoutes from './services/order.service';
import agentService from './services/agent.service';
import providerRoutes from './services/provider.service';
import storageService from './services/storage.service';
import purchaseRoutes from './services/purchase.service';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './utils/docs/v1/swagger-doc';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);

app.get('/', (req: Request, res: Response) => {
  const db = connection.readyState === 1 ? 'connected' : 'disconnected';
  return response(
    res,
    {
      message: 'Welcome to the API',
      status: 'success',
      database: db
    },
    200
  );
});
app.use('/favicon.ico', (req: Request, res: Response) => res.status(204).end() as any);
app.use('/api/v1', productRoutes, agentService, providerRoutes, storageService, purchaseRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
