"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumApi = void 0;
const axios_1 = __importDefault(require("axios"));
const numCache_1 = require("./numCache");
class NumApi {
    static async getFunFact(num) {
        const cacheKey = `funfact_${num}`;
        const cachedResult = numCache_1.NumCache.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }
        try {
            const response = await axios_1.default.get(`${this.BASE_URL}/${num}/math`, {
                timeout: 2000, // 2 second timeout
            });
            const fact = response.data;
            numCache_1.NumCache.set(cacheKey, fact);
            return fact;
        }
        catch (error) {
            const fallbackFact = this.generateFallbackFact(num);
            numCache_1.NumCache.set(cacheKey, fallbackFact);
            return fallbackFact;
        }
    }
    static generateFallbackFact(num) {
        const facts = [
            `${num} is ${num % 2 === 0 ? 'even' : 'odd'}`,
            `${num} squared is ${num * num}`,
            `${num} multiplied by 2 is ${num * 2}`,
            `${num} is a ${num > 0 ? 'positive' : 'negative'} number`,
        ];
        return facts[Math.floor(Math.random() * facts.length)];
    }
    // Background cache warming
    static async warmupCache(startNum = 1) {
        if (this.isWarmingUp)
            return;
        this.isWarmingUp = true;
        try {
            const numbers = Array.from({ length: this.BATCH_SIZE }, (_, i) => startNum + i);
            const promises = numbers.map((num) => this.getFunFact(num));
            await Promise.allSettled(promises);
        }
        finally {
            this.isWarmingUp = false;
        }
    }
}
exports.NumApi = NumApi;
NumApi.BASE_URL = 'http://numbersapi.com';
NumApi.BATCH_SIZE = 100;
NumApi.isWarmingUp = false;
