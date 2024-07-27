"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import Trades from "@/app/components/Trades";
import { PrimaryButton } from "@/app/components/core/Button";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const { market } = useParams();
    const [tab,setTab]=useState("depth");

    return <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1">
            <MarketBar market={market as string} />
            <div className="flex flex-row h-[620px] border-y border-slate-800">
                <div className="flex flex-col flex-1">
                    <TradeView market={market as string} />
                </div>
                <div className="w-[1px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    <div className="flex gap-x-4">
                        <div onClick={()=>setTab("depth")} className={`text-sm font-medium py-1 border-b-2 ${tab === 'depth' ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}>
                            Depth
                        </div>    
                        <div onClick={()=>setTab("trade")} className={`text-sm font-medium py-1 border-b-2 ${tab === 'trade' ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}>
                            Trade
                        </div>    
                    </div>
                    {tab==="depth" && <Depth market={market as string}/>}
                    {tab==="trade" && <Trades market={market as string}/>}
                </div>
            </div>
        </div>
        <div className="w-[1px] flex-col border-slate-800 border-l"></div>
        <div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
        </div>
    </div>
}