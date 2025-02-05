import axios from 'axios';
import { NumCache } from './numCache';

export class NumApi {
  private static readonly BASE_URL = 'http://numbersapi.com';
  private static readonly BATCH_SIZE = 100;
  private static isWarmingUp = false;

  static async getFunFact(num: number): Promise<string> {
    const cacheKey = `funfact_${num}`;
    const cachedResult = NumCache.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    try {
      const response = await axios.get(`${this.BASE_URL}/${num}/math`, {
        timeout: 2000,
      });
      const fact = response.data;
      NumCache.set(cacheKey, fact);
      return fact;
    } catch (error) {
      const fallbackFact = this.generateFallbackFact(num);
      NumCache.set(cacheKey, fallbackFact);
      return fallbackFact;
    }
  }

  private static generateFallbackFact(num: number): string {
    const facts = [
      `${num} is ${num % 2 === 0 ? 'even' : 'odd'}`,
      `${num} squared is ${num * num}`,
      `${num} multiplied by 2 is ${num * 2}`,
      `${num} is a ${num > 0 ? 'positive' : 'negative'} number`,
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }
}
