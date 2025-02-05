"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumController = void 0;
const numUtils_1 = require("../utils/numUtils");
const numAPi_1 = require("../services/numAPi");
class NumController {
    static async classifyNumber(req, res) {
        try {
            const numberStr = req.query.number;
            if (!numberStr || Array.isArray(numberStr)) {
                res.status(400).json({
                    number: numberStr || 'missing',
                    error: true,
                });
                return;
            }
            const number = parseInt(numberStr);
            if (isNaN(number) || !Number.isInteger(number)) {
                res.status(400).json({
                    number: numberStr,
                    error: true,
                });
                return;
            }
            const [funFact, isPrime, isPerfect, properties, digitSum] = await Promise.all([
                numAPi_1.NumApi.getFunFact(number),
                Promise.resolve(numUtils_1.NumUtils.isPrime(number)),
                Promise.resolve(numUtils_1.NumUtils.isPerfect(number)),
                Promise.resolve(numUtils_1.NumUtils.getProperties(number)),
                Promise.resolve(numUtils_1.NumUtils.getDigitSum(number)),
            ]);
            const response = {
                number,
                is_prime: isPrime,
                is_perfect: isPerfect,
                properties,
                digit_sum: digitSum,
                fun_fact: funFact,
            };
            res.json(response);
        }
        catch (error) {
            res.status(500).json({
                number: req.query.number || 'unknown',
                error: true,
            });
        }
    }
}
exports.NumController = NumController;
