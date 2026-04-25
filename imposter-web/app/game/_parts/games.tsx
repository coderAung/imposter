"use client"
import { AppCard } from "@/components/customs/cards"
import { Title } from "@/components/customs/fonts"
import { Mic, Send } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export const GameTimer = ({className}:{className?:string}) => {

    const [seconds, setSeconds] = useState(10)

    useEffect(() => {
        const interval = setInterval(() => setSeconds(prev => {
            if(prev <= 0) {
                clearInterval(interval)
                return 0
            }
            return prev - 1
        }), 1000)

        return () => clearInterval(interval)
    }, [])

    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    
    return (
        <div className={` ${className}`}>
            <h3 className="text-5xl font-bold tracking-wider">{String(min).padStart(2, "0")} : {String(sec).padStart(2, "0")}</h3>
        </div>
    )
}

export const GameCard = () => {
    return (
        <AppCard variant="blue" className="h-[80%] w-full rounded-2xl">
            secret
        </AppCard>
    )
}

export const GameArea = ({children}: {children:React.ReactNode}) => {
    const players = [1, 2, 3, 4, 5, 6]
    const total = players.length
    const radius = 180
    return (
        <div className={`flex justify-center items-center w-80 h-80 relative rounded-full`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-[90%] flex items-center justify-center">
                {children}
            </div>
            {players.map((v, i) => <GamePlayer key={i} angle={(360/total) * i + 270} radius={radius} />)}
        </div>
    )
}

const GamePlayer = ({angle, radius}: {angle:number, radius:number}) => {
    const green = "border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6),inset_0_0_15px_rgba(34,211,238,0.4)]"
    return (
        <div className="absolute w-[55] h-[55]" style={{
        transform: `
            rotate(${angle}deg)
            translate(${radius + 3}px)
            rotate(-${angle}deg)
        `}}>
            <Image src={"/default.avif"} alt="profile photo" width={100} height={100} className={`rounded-full border-2 border-green-400 p-1 bg-slate-950 ${green}`} />
            <div className="text-center mt-2">{angle}</div>
        </div>
    )
}

export const GameChat = ({className}:{className?:string}) => {
    return (
        <div className={`${className}`}>
            <div className="p-3 relative rounded-2xl border border-gray-500/40 bg-gray-500/20">
                <div className="min-h-5/6 max-h-5/6">
                    <Title title="Chat" className="sticky top-0"/>
                    <div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 23, 44, 65, 77, 47, 99, 402, 345, 45, 89, 87, 86, 75].map(i => <div key={i}>{i}</div>)}
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 p-3 w-full">
                    <div className="border border-blue-400 p-5 rounded-2xl w-full">
                        <input placeholder="Hint" className="p-2 ring-0 outline-0 w-full"/>
                        <div className="flex gap-x-3 mt-3 justify-end px-5">
                            <button><Mic size={"1.2rem"} /></button>
                            <button><Send size={"1.2rem"} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}