"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumApi = void 0;
const axios_1 = __importDefault(require("axios"));
class NumApi {
    static async getFunFact(num) {
        try {
            const response = await axios_1.default.get(`${this.BASE_URL}/${num}/math`);
            return response.data;
        }
        catch (error) {
            return `${num} is a number`;
        }
    }
}
exports.NumApi = NumApi;
NumApi.BASE_URL = 'http://numbersapi.com';
