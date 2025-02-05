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
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i * i !== num) {
          sum += num / i;
        }
      }
    }
    return sum === num && num !== 1;
  }

  static getDigitSum(num: number): number {
    return Math.abs(num)
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  static getProperties(num: number): string[] {
    const properties = [];
    if (num % 2 === 0) properties.push('even');
    else properties.push('odd');
    if (num > 0) properties.push('positive');
    else if (num < 0) properties.push('negative');
    else properties.push('zero');
    if (Number.isInteger(Math.sqrt(num))) properties.push('perfect square');
    return properties;
  }
}
