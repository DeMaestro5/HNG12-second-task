import { Request, Response } from 'express';
import { NumUtils } from '../utils/numUtils';
import { NumApi } from '../services/numAPi';
import { NumberResponse, ErrorResponse } from '../types';

export class NumController {
  static async classifyNumber(req: Request, res: Response): Promise<void> {
    try {
      const numberStr = req.query.number;

      // Input validation
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

      const funFact = await NumApi.getFunFact(number);

      const response: NumberResponse = {
        number,
        is_prime: NumUtils.isPrime(number),
        is_perfect: NumUtils.isPerfect(number),
        properties: NumUtils.getProperties(number),
        digit_sum: NumUtils.getDigitSum(number),
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
