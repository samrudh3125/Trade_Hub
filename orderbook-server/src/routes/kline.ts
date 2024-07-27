import {Client} from 'pg';
import {Router} from 'express';

const pgClient=new Client({
    user:'samrudh',
    host:'localhost',
    database:'postgres',
    password:'password',
    port:5432,
});
pgClient.connect();

export const klineRouter=Router();

klineRouter.get("/",async(req,res)=>{
    const {market,interval,startTime,endTime}=req.query;

    let query;
    switch(interval){
        case '1m':
            query=`SELECT * FROM klines_1m WHERE bucket>=$1 AND bucket<=$2`;
            break;
        case '1h':
            query=`SELECT * FROM klines_1h WHERE bucket>=$1 AND bucket<=$2`;
            break;
        case '1w':
            query=`SELECT * FROM klines_1w WHERE bucket>=$1 AND bucket<=$2`;
            break;
        default:
            res.status(400).send("Invalid interval");
            return;
    }

    try {
        // @ts-ignore
        const result=await pgClient.query(query,[new Date(startTime*1000 as string),new Date(endTime*1000 as string)]);
        res.json(result.rows.map((row:any)=>({
            close:row.close,
            end:row.bucket,
            high:row.high,
            low:row.low,
            open:row.open,
            start:row.start,
            volume:row.volume,
            quoteVolume:row.quoteVolume,
            trades:row.trades
        })));
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});