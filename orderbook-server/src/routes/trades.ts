import { Router } from "express";
import { RedisManager } from "../redisClient";

export const tradeRouter=Router();

tradeRouter.get("/",async(req,res)=>{
    const {symbol}=req.query;
    const response=await RedisManager.getInstance().sendAndAwait({
        type:"GET_TRADES",
        data:{market:symbol as string}
    });
    res.json(response.payload);
});