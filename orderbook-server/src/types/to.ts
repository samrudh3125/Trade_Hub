export type MessageToEngine={
    type:"CREATE_ORDER",
    data:{
        market:string,
        price:number,
        quantity:string,
        side:"buy"|"sell",
        userId:string
    }
} | {
    type:"CANCEL_ORDER",
    data:{
        orderId:string,
        market:string
    }
} | {
    type:"ON_RAMP",
    data:{
        amount:string,
        userId:string,
        txnId:string
    }
} | {
    type:"GET_DEPTH",
    data:{market:string}
} | {
    type:"GET_OPEN_ORDERS",
    data:{
        market:string,
        userId:string
    }
} | {
    type:"GET_TICKER",
    data:{market:string}
} | {
    type:"GET_TRADES",
    data:{market:string}
} | {
    type:"GET_BALANCE",
    data:{userId:string,asset:string}
}