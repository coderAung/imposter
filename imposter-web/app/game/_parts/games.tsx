"use client"
import { ChatControls } from "@/app/_parts/chats"
import { AppCard } from "@/components/customs/cards"
import { Title } from "@/components/customs/fonts"
import { Mic, MicOff, Users2, Volume2, VolumeOff } from "lucide-react"
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

export const GameCard = ({className}:{className?:string}) => {
    return (
        <AppCard variant="blue" className={`w-full rounded-2xl ${className}`}>
            secret
        </AppCard>
    )
}

export const GamePlayers = ({className}:{className?:string}) => {
    return (
        <div className={` ${className}`}>
            <Title title="Players chat" className="text-center mb-3" />
            <div className={`p-2 flex flex-wrap justify-center gap-3`}>
                {[1, 2, 3, 4, 5].map(i => <ChatProfile key={i} />)}
            </div>
        </div>
    )
}

export const GameArea = ({children, className}: {children:React.ReactNode, className?:string}) => {
    // const players = [1, 2, 3, 4, 5, 6]
    // const total = players.length
    // const radius = 180
    return (
        <div className={`${className}`}>
            {children}
        </div>
        // <div className={`flex justify-center items-center w-80 h-80 relative rounded-full`}>
        //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-[90%] flex items-center justify-center">
        //         {children}
        //     </div>
            // {players.map((v, i) => <GamePlayer key={i} angle={(360/total) * i + 270} radius={radius} />)}
        // </div>
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
                    <Title title="Chat" className="mb-3"/>
                    <div className="flex flex-wrap justify-center gap-3 mb-3">
                        {[1, 2, 3, 4, 5].map(i => <ChatProfile key={i} className="" />)}
                    </div>
                    <div className="flex justify-center items-center">
                        <ChatControls />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChatPlayersControls = ({className}:{className?:string}) => {
    return (
        <div className={`rounded-full px-2 gap-x-3 py-2 backdrop-blur-md flex justify-center items-center border border-blue-400/50 bg-blue-400/30 ${className}`}>
            <button className="hover:bg-gray-400/30 cursor-pointer p-2 rounded-ful"><Users2 /></button>
        </div>
    )
}


export const GameChatMobile = ({className}: {className?:string}) => {
    return (
        <div className={`gap-x-3 py-10 flex justify-center w-full ${className}`}>
            <ChatControls />
            <ChatPlayersControls />
        </div>
    )
}

export const ChatProfile = ({className}:{className?:string}) => {
    const green = "border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6),inset_0_0_15px_rgba(34,211,238,0.4)]"

    return (
        <div className={`flex justify-center flex-col items-center ${className}`}>
            <Image src={"/default.avif"} alt="Profile photo" width={150} height={150} className={`rounded mb-2 ${green}`} />
            <div className="text-center">Name</div>
        </div>
    )
}