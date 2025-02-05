"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const numControllers_1 = require("../controller/numControllers");
const router = (0, express_1.Router)();
router.get('/classify-number', (req, res) => numControllers_1.NumController.classifyNumber(req, res));
exports.default = router;
