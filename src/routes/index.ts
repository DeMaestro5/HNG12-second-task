import { Router, Request, Response } from 'express';
import { NumController } from '../controller/numControllers';

const router = Router();

router.get('/classify-number', (req: Request, res: Response) =>
  NumController.classifyNumber(req, res)
);

export default router;
