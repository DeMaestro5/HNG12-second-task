import NodeCache from 'node-cache';

export class NumCache {
  private static cache = new NodeCache({ stdTTL: 86400 }); // 24 hour cache

  static get(key: string): string | undefined {
    return this.cache.get(key);
  }

  static set(key: string, value: string): void {
    this.cache.set(key, value);
  }
}
