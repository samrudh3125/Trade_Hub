"use client";
import { useEffect, useState } from "react";
import type { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { SignalManager } from "../utils/SignalManager";

export const MarketBar = ({market}: {market: string}) => {
    const [ticker, setTicker] = useState<Ticker | null>(null);

    useEffect(() => {
        getTicker(market).then(setTicker);
        SignalManager.getInstance().registerCallback("ticker",(data:Partial<Ticker>)=>setTicker(prevTicker=>({
            firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
            high: data?.high ?? prevTicker?.high ?? '',
            lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
            low: data?.low ?? prevTicker?.low ?? '',
            volume: data?.volume ?? prevTicker?.volume ?? '',
            quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
            priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
            priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
            symbol: data?.symbol ?? prevTicker?.symbol ?? '',
            trades:data?.trades ?? prevTicker?.trades ??''
        })),market);
        SignalManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]});

        return ()=>{
            SignalManager.getInstance().deRegisterCallback("ticker",market);
            SignalManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`ticker.${market}`]})
        }
    }, [market]);

    return <div>
        <div className="flex items-center flex-row relative w-full overflow-hidden border-b border-slate-800">
            <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4">
                    <Ticker market={market} />
                    <div className="flex items-center flex-row space-x-8 pl-4">
                        <div className="flex flex-col h-full justify-center">
                            <p className={`font-medium tabular-nums text-greenText text-md text-green-500`}>${ticker?.lastPrice}</p>
                            <p className="font-medium text-smtabular-nums">${ticker?.lastPrice}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className={`font-medium text-xs text-slate-400`}>24H Change</p>
                            <p className={`font-medium tabular-nums leading-5 text-sm text-greenText ${Number(ticker?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}>{Number(ticker?.priceChange) > 0 ? "+" : ""} {ticker?.priceChange} {Number(ticker?.priceChangePercent)?.toFixed(2)}%</p></div><div className="flex flex-col">
                                <p className="font-medium text-slate-400 text-sm">24H High</p>
                                <p className="font-medium tabular-nums leading-5 text-sm ">{ticker?.high}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium text-slate-400 text-sm">24H Low</p>
                                    <p className="font-medium tabular-nums leading-5 text-sm ">{ticker?.low}</p>
                                </div>
                            <button type="button" className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left" data-rac="">
                                <div className="flex flex-col">
                                    <p className="font-medium text-xs text-slate-400 text-sm">24H Volume</p>
                                    <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-sm ">{ticker?.volume}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

}

function Ticker({market}: {market: string}) {
    const symbols=market.split("_");
    return <div className="flex h-[60px] shrink-0 space-x-4">
        <div className="flex flex-row relative ml-2 -mr-4">
            <img alt={`${symbols[0]} Logo`} loading="lazy" decoding="async" data-nimg="1" className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"  src={`https://backpack.exchange/_next/image?url=%2Fcoins%2F${symbols[0].toLowerCase()}.png&w=48&q=75
`} />
            <img alt={`${symbols[1]} Logo`} loading="lazy"decoding="async" data-nimg="1" className="h-6 w-6 -ml-2 mt-4 rounded-full" src={`https://backpack.exchange/_next/image?url=%2Fcoins%2F${symbols[1].toLowerCase()}.png&w=48&q=75
`} />
        </div>
    <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
            <div className="flex items-center flex-row gap-2 undefined">
                <div className="flex flex-row relative">
                    <p className="font-medium text-sm undefined">{market.replace("_", " / ")}</p>
                </div>
            </div>
        </div>
    </button>
    </div>
}