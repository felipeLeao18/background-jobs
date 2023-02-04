/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';
import UserController from './app/controllers/UserController';
import Queue from './lib/Queue';

class Server {
  constructor() {
    this.port = process.env.PORT ?? 3000;
    this.app = express();
    this.app.use(express.json());
  }

  setupBullBoard() {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: Queue.queues.map((queue) => new BullAdapter(queue.bull)),
      serverAdapter,
    });
    this.app.use('/admin/queues', serverAdapter.getRouter());
  }

  setupRoutes() {
    this.app.post('/users', UserController.store);
  }

  start() {
    this.setupBullBoard();
    this.setupRoutes();

    this.app.listen(this.port, () => {
      console.log('Server running on localhost', this.port);
    });
  }
}

const server = new Server();
server.start();
