"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumController = void 0;
const numUtils_1 = require("../utils/numUtils");
const numAPi_1 = require("../services/numAPi");
class NumController {
    static async classifyNumber(req, res) {
        try {
            const numberStr = req.query.number;
            // Input validation
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
            const funFact = await numAPi_1.NumApi.getFunFact(number);
            const response = {
                number,
                is_prime: numUtils_1.NumUtils.isPrime(number),
                is_perfect: numUtils_1.NumUtils.isPerfect(number),
                properties: numUtils_1.NumUtils.getProperties(number),
                digit_sum: numUtils_1.NumUtils.getDigitSum(number),
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
