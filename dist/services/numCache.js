"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class NumCache {
    static get(key) {
        return this.cache.get(key);
    }
    static set(key, value) {
        this.cache.set(key, value);
    }
}
exports.NumCache = NumCache;
NumCache.cache = new node_cache_1.default({ stdTTL: 86400 }); // 24 hour cache
