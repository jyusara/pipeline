import { Router } from 'express';
import { StorageController } from '../controllers/storage.controller';

class StorageRoutes {
  router: Router;

  controller: StorageController;

  constructor() {
    this.router = Router();
    this.controller = new StorageController();
    this.routes();
  }

  routes() {
    this.router.route('/storage/create').post(this.controller.createStorage);
    this.router.route('/storages').get(this.controller.getStorages);
    this.router.route('/storage/:id').delete(this.controller.deleteStorage);
    this.router.route('/storage/:id').get(this.controller.getStorage);
    this.router.route('/storage/:id').put(this.controller.updateStorage);
  }
}

export default new StorageRoutes().router;
