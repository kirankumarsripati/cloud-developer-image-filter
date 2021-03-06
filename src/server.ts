import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/v0/index.router';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use('/api/v0/', IndexRouter);

  // Root Endpoint
  app.get('/', async (req: Request, res: Response) => {
    res.send('/api/v0/')
    // Displays a simple message to the user
    // res.send('try GET /filteredimage?image_url={{}}');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
