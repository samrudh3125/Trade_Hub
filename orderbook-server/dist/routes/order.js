"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const redisClient_1 = require("../redisClient");
exports.orderRouter = (0, express_1.Router)();
const instance = redisClient_1.RedisManager.getInstance();
exports.orderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { market, price, quantity, side, userId } = req.body;
    console.log({ market, price, quantity, side, userId });
    const response = yield instance.sendAndAwait({
        type: "CREATE_ORDER",
        data: { market, price, quantity, side, userId }
    });
    res.json(response.payload);
}));
exports.orderRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, market } = req.body;
    const response = yield instance.sendAndAwait({
        type: "CANCEL_ORDER",
        data: { orderId, market }
    });
    res.json(response.payload);
}));
exports.orderRouter.get("/open", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.sendAndAwait({
        type: "GET_OPEN_ORDERS",
        data: { market: req.query.market, userId: req.query.userId }
    });
    res.json(response.payload);
}));
