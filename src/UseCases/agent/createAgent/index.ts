import CreateAgent from './createAgent';
import { agentRepository } from '../../../repositories';

const createAgent = new CreateAgent(agentRepository);

export { createAgent };
