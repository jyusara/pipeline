import GetAgent from './getAgent';
import { agentRepository } from '../../../repositories';

const getAgent = new GetAgent(agentRepository);

export { getAgent };
