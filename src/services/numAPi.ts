import axios from 'axios';

export class NumApi {
  private static readonly BASE_URL = 'http://numbersapi.com';

  static async getFunFact(num: number): Promise<string> {
    try {
      const response = await axios.get(`${this.BASE_URL}/${num}/math`);
      return response.data;
    } catch (error) {
      return `${num} is a number`;
    }
  }
}
