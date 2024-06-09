import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

// ---- Parser ----

app.use(express.json());

app.use(cors());


// ---- Application Routes ----

app.use('/api/v1/students', StudentRoutes)


const getAController = (req: Request, res: Response) => {

  const a = 10;

  res.send(a);

}

app.get('/', getAController);

export default app;

// console.log(process.cwd());

// ---- .env Current Path ----

// D:\Typescript\Milestone 2\first-project\.env
