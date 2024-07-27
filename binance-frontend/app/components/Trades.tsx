"use client"
import React, { useEffect, useState } from 'react'
import { Trade } from '../utils/types'
import { getTrades } from '../utils/httpClient';
import { SignalManager } from '../utils/SignalManager';

const Trades = ({market}:{market:string}) => {
    const [trades,setTrades]=useState<Trade[]>([]);

    useEffect(()=>{
        getTrades(market).then((trades)=>{setTrades(trades.slice(0,20))});
        SignalManager.getInstance().registerCallback("trade",(data:any)=>{
            setTrades((originalTrades)=>{
                let temptrades:Trade[]=[data];
                for(let i=1;i<15;i++){
                    temptrades[i]=originalTrades[i-1];
                }
                return temptrades;
            })
        },market);

        SignalManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`trade.${market}`]});
        
        return () => {
            SignalManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`trade.200ms.${market}`]});
            SignalManager.getInstance().deRegisterCallback("trade", `${market}`);
        }
    },[])
  return (
    <div>
        {trades?.map((trade) => <SingleTrade key={trade.timestamp} price={trade.price} quantity={trade.quantity} timestamp={trade.timestamp} isBuyerMaker={trade.isBuyerMaker}/>)}
    </div>
  )
}

function SingleTrade({ price, quantity, timestamp,isBuyerMaker}: { price: string, quantity: string, timestamp:number,isBuyerMaker:boolean}) {
    const time=new Date(timestamp*1000).toTimeString();
    const time1=time.split(" ");
    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                width: "100%",
                height:"[30px]",
                backgroundColor: "transparent",
                overflow: "hidden",
            }}
        >
            <div className={`flex h-8 items-center justify-between text-sm w-full`}>
                <div className={`${isBuyerMaker?"text-red-500":"text-green-500"}`}>
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div>
                    {time1[0]}
                </div>
            </div>
        </div>
    );
}


export default Trades

