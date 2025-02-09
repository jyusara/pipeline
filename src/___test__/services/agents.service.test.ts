import axios from 'axios';

describe('Test del servicio AgentService', () => {
  it('Debe existir una ruta GET /agents y esta debe retornar un listado de asesores', async () => {
    const response = await axios.get('http://localhost:3002/api/v1/agents');
    const result = response.data.result;
    expect(result).toBeInstanceOf(Array);
  });
});
