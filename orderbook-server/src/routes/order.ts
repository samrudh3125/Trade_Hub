import { Router } from "express";
import { RedisManager } from "../redisClient";
import { string } from "zod";

export const orderRouter=Router();
const instance=RedisManager.getInstance();

orderRouter.post('/',async(req,res)=>{
    const {market,price,quantity,side,userId}=req.body;
    console.log({market,price,quantity,side,userId});
    const response=await instance.sendAndAwait({
        type:"CREATE_ORDER",
        data:{market,price,quantity,side,userId}
    });
    res.json(response.payload);
});

orderRouter.delete("/",async(req,res)=>{
    const {orderId,market}=req.body;
    const response=await instance.sendAndAwait({
        type:"CANCEL_ORDER",
        data:{orderId,market}
    });
    res.json(response.payload);
})

orderRouter.get("/open",async(req,res)=>{
    const response=await instance.sendAndAwait({
        type:"GET_OPEN_ORDERS",
        data:{market:req.query.market as string,userId:req.query.userId as string}
    });
    res.json(response.payload);
});