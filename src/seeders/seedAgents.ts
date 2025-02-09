import { agentModel } from '../db/mongo.schema';
import agentsData from './data/agents.json';

export async function seedAgents() {
  try {
    const agentsToSave = agentsData.forEach(async (agent) => {
      const agentById = await agentModel.findById(agent._id);
      if (agentById) {
        return;
      }
      await agentModel.create(agent);
    });
    await Promise.all([agentsToSave]);
    return;
  } catch (error) {
    console.log('Error seeding agents', error);
    return;
  }
}
