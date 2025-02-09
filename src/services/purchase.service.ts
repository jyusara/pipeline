import { Router } from 'express';
import { PurchaseController } from '../controllers';

class PurchaseRoutes {
  router: Router;

  constroller: PurchaseController;

  constructor() {
    this.router = Router();
    this.constroller = new PurchaseController();
    this.routes();
  }

  routes() {
    this.router
      .route('/purchases')
      .post(this.constroller.createPurchase)
      .get(this.constroller.getPurchases)
      .put(this.constroller.updatePurchase);
    this.router.route('/purchases/:id').get(this.constroller.getPurchase).delete(this.constroller.deletePurchase);
  }
}

export default new PurchaseRoutes().router;
