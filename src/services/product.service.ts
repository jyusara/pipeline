import { Router } from 'express';
import { ProductController } from '../controllers';

class ProductRoutes {
  router: Router;

  controller: ProductController;

  constructor() {
    this.router = Router();
    this.controller = new ProductController();
    this.routes();
  }

  routes() {
    this.router
      .route('/products')
      .post(this.controller.createProduct)
      .get(this.controller.getProducts)
      .put(this.controller.updateProduct);
    this.router.get('/products/:id', this.controller.getProduct);
  }
}

export default new ProductRoutes().router;
