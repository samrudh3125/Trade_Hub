import { Router } from "express";
import { RedisManager } from "../redisClient";

export const balanceRouter=Router();

balanceRouter.get("/",async(req,res)=>{
    const {userId,asset}=req.query;
    const response=await RedisManager.getInstance().sendAndAwait({
        type:"GET_BALANCE",
        data:{userId:userId as string,asset:asset as string}
    });
    res.json(response.payload);
});