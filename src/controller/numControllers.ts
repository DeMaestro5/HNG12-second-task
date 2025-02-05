import { Request, Response } from 'express';
import { NumUtils } from '../utils/numUtils';
import { NumApi } from '../services/numAPi';
import { NumberResponse, ErrorResponse } from '../types';

export class NumController {
  static async classifyNumber(req: Request, res: Response): Promise<void> {
    try {
      const numberStr = req.query.number;

      if (!numberStr || Array.isArray(numberStr)) {
        res.status(400).json({
          number: numberStr || 'missing',
          error: true,
        } as ErrorResponse);
        return;
      }

      const number = parseInt(numberStr as string);

      if (isNaN(number) || !Number.isInteger(number)) {
        res.status(400).json({
          number: numberStr,
          error: true,
        } as ErrorResponse);
        return;
      }

      const [funFact, isPrime, isPerfect, properties, digitSum] =
        await Promise.all([
          NumApi.getFunFact(number),
          Promise.resolve(NumUtils.isPrime(number)),
          Promise.resolve(NumUtils.isPerfect(number)),
          Promise.resolve(NumUtils.getProperties(number)),
          Promise.resolve(NumUtils.getDigitSum(number)),
        ]);

      const response: NumberResponse = {
        number,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        number: req.query.number || 'unknown',
        error: true,
      } as ErrorResponse);
    }
  }
}
