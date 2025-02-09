import app from './app';
import { dbConnection, PORT } from './config';
import { seedAgents } from './seeders';

(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  await dbConnection.default();
  //await seedAgents();
})();
