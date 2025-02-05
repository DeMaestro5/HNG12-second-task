export class NumUtils {
  static isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  static isPerfect(num: number): boolean {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i * i !== num) {
          sum += num / i;
        }
      }
    }
    return sum === num;
  }

  static isArmstrong(num: number): boolean {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
  }

  static getDigitSum(num: number): number {
    return num
      .toString()
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }

  static getProperties(num: number): string[] {
    const properties: string[] = [];

    if (this.isArmstrong(num)) {
      properties.push('armstrong');
    }

    properties.push(num % 2 === 0 ? 'even' : 'odd');

    return properties;
  }
}
