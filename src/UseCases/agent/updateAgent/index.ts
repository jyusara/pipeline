import { agentRepository } from '../../../repositories';
import UpdateAgent from './updateAgent';

const updateAgent = new UpdateAgent(agentRepository);

export { updateAgent };
