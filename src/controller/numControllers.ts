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

      // Convert to number and check if it's a valid integer
      const number = Number(numberStr);

      // Check if the number is a valid integer
      if (
        !Number.isInteger(number) ||
        isNaN(number) ||
        number.toString().includes('.')
      ) {
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
      res.status(400).json({
        number: req.query.number || 'unknown',
        error: true,
      } as ErrorResponse);
    }
  }
}
