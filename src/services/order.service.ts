import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

class OrderRoutes {
  router: Router;

  controller: OrderController;

  constructor() {
    this.router = Router();
    this.controller = new OrderController();
    this.routes();
  }

  routes() {
    this.router.post('/orders/process-orders', this.controller.processOrderWebhook);
    this.router.get('/orders/:id', this.controller.getOrder);
  }
}

export default new OrderRoutes().router;
