import { Depth, Ticker, Trade } from "./types";

export const BASE_URL="ws://localhost:3001"

export class SignalManager{
    private ws:WebSocket;
    private static instance:SignalManager;
    private bufferedMessages:any[]=[];
    private callbacks:({[type:string]:any[]})={}
    private id:number;
    private initialized:boolean=false;

    private constructor(private signalingServerUrl?:string){
        this.ws=new WebSocket(signalingServerUrl||BASE_URL);
        this.bufferedMessages=[];
        this.id=1;
        this.init();
    }

    public static getInstance(signalingServerUrl?:string){
        if(!this.instance){
            this.instance=new SignalManager(signalingServerUrl);
        }
        return this.instance;
    }

    init(){
        this.ws.onopen=()=>{
            this.initialized=true;
            this.bufferedMessages.forEach(message=>{
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages=[];
        }
        this.ws.onmessage=(event)=>{
            const message=JSON.parse(event.data);
            const type=message.data.e;
            if(this.callbacks[type]){
                this.callbacks[type].forEach(({callback})=>{
                    if(type==="ticker"){
                        const newTicker:Partial<Ticker>={
                            lastPrice: message.data.c,
                            high: message.data.h,
                            low: message.data.l,
                            volume: message.data.v,
                            quoteVolume: message.data.V,
                            symbol: message.data.s,
                        }
                        callback(newTicker);
                    }
                    else if(type==="depth"){
                        const newDepth:Partial<Depth>={
                            bids:message.data.b,
                            asks:message.data.a,
                        }
                        callback(newDepth);
                    }
                    else if(type==="trade"){
                        const newTrades:Partial<Trade>={
                            price:message.data.p,
                            quantity:message.data.q,
                            isBuyerMaker:message.data.m,
                            timestamp:message.data.t,
                        }
                        callback(newTrades);
                    }
                })
            }
        }
    }

    sendMessage=(message:any)=>{
        const messageToSend={
            ...message,
            id:this.id++
        }
        if(!this.initialized){
            this.bufferedMessages.push(messageToSend);
            return;
        }

        this.ws.send(JSON.stringify(messageToSend));
    }

    async registerCallback(type:string,callback:any,id:string){
        this.callbacks[type]=this.callbacks[type]||[];
        this.callbacks[type].push({callback,id});
    }

    async deRegisterCallback(type:string,id:string){
        if(this.callbacks[type]){
            const index=this.callbacks[type].findIndex(callback=>callback.id===id);
            if(index!==-1)this.callbacks[type].splice(index,1);
        }
    }
}