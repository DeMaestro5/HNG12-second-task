import { Router } from 'express';
import { NumController } from '../controller/numControllers';

const router = Router();

router.get('/classify-number', NumController.classifyNumber);

export default router;
