import { Router } from 'express';
import { ProviderController } from '../controllers/provider.controller';

class ProviderRoutes {
  router: Router;

  controller: ProviderController;

  constructor() {
    this.router = Router();
    this.controller = new ProviderController();
    this.routes();
  }

  routes() {
    this.router
      .route('/providers')
      .post(this.controller.createProvider)
      .get(this.controller.getProviders)
      .put(this.controller.updateProvider);
    this.router.route('/providers/:id').get(this.controller.getProvider).delete(this.controller.deleteProvider);
  }
}

export default new ProviderRoutes().router;
