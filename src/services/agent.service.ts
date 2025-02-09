import { Router } from 'express';
import { AgentController } from '../controllers';

class AgentRoutes {
  router: Router;

  controller: AgentController;

  constructor() {
    this.router = Router();
    this.controller = new AgentController();
    this.routes();
  }

  routes() {
    this.router.route('/agents').get(this.controller.getAgents);
    this.router.route('/agents/:id').get(this.controller.getAgent);
    this.router.route('/agents/create').post(this.controller.createAgent);
    this.router.route('/agents/:id').put(this.controller.updateAgent);
  }
}

export default new AgentRoutes().router;
