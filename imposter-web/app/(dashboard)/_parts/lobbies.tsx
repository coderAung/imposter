"use client"
import { AppBadge } from "@/components/customs/badges"
import { AppButton } from "@/components/customs/buttons"
import { AppCard } from "@/components/customs/cards"
import { Title } from "@/components/customs/fonts"
import { ArrowRight, Edit, Minus, Plus, SquareArrowRightExit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const LobbyList = () => {
    return (
        <div>
            <div className="mb-3 flex justify-between items-center">
                <Title title="Lobbies"/>
                <AppButton variant="ghost" className="flex items-center bg-blue-500/20 text-blue-500"><Plus/> New Lobby</AppButton>
            </div>
            <div className="flex flex-col gap-y-3 py-2">
                {[1, 2, 3, 4, 5].map(i => <LobbyCard key={i} id={i} />)}
            </div>
        </div>
    )
}

export const LobbyCard = ({id}: {id:number}) => {
    return (
        <AppCard variant="blue" className="rounded-2xl flex justify-between">
            <div>
                <span>WeAreAPI</span>
                <div className="mt-3">
                    <AppBadge variant="green">Player - 7</AppBadge>
                </div>
            </div>
            <div>
                <AppButton variant="ghost" className="rounded-full text-red-500"><Trash2 size={"1.2rem"}/></AppButton>
                <AppButton variant="ghost" className="rounded-full"><Edit size={"1.2rem"}/></AppButton>
                <AppButton variant="ghost" className="rounded-full">
                    <Link href={`/lobby/${id}`}><ArrowRight size={"1.2rem"}/></Link>
                </AppButton>
            </div>
        </AppCard>
    )
}

export const ProfileCard = () => {
    return (
        <AppCard className="rounded-2xl flex flex-col items-center justify-center">
            <Image src="/default.avif" alt="Profile Photo" width={100} height={100} className="rounded-full" />
            <span className="text-sm mt-3">Ye Wont Aung</span>
        </AppCard>
    )
}

export const LeaveButton = ({className}: {className?:string}) => {
    return <AppButton variant="ghost" className={`text-red-500 flex items-center tracking-wider bg-red-500/30 gap-x-2 ${className}`}><SquareArrowRightExit /> Leave Lobby</AppButton>
}


export const GameForm = ({className}: {className?:string}) => {
    return (
        <div className={`hidden md:block border border-green-500 rounded-xl p-2 bg-green-500/20 ${className}`}>
            <Title title="Start The Game"/>
            <hr className="text-green-500" />
            <div className="p-3 grid grid-cols-3 gap-3">
                <CategoryInput />
                <ImposterInput />
                <button className="self-end cursor-pointer p-2 rounded border-2 bg-green-500/40 border-green-700">Start</button>
            </div>
        </div>
    )
}

const CategoryInput = ({className}:{className?:string}) => {
    return (
        <div className={` ${className}`}>
            <label htmlFor="">Select Category</label>
            <div className="border-2 border-green-500 mt-2 rounded p-2">
                <select className="w-full outline-0 ring-0">
                    {["All", "Movies", "Food", "Places", "Accessories", "Person", "History", "Sport"].map((v, i) => <option className="text-green-200 bg-green-800" key={i}>{v}</option>)}
                </select>
            </div>
        </div>
    )
}

const ImposterInput = ({className}: {className?:string}) => {
    const [count, setCount] = useState<number>(1);
    const add = () => setCount(count >= 1 ? count + 1 : 1)
    const minus = () => setCount(count > 1 ? count - 1 : 1)

    return (
        <div className={className}>
            <label htmlFor="">Imposters</label>
            <div className="border-2 border-green-500 justify-around rounded mt-2 p-2 flex">
                <button onClick={minus} className="cursor-pointer"><Minus/></button>
                <span>{count}</span>
                <button onClick={add} className="cursor-pointer"><Plus/></button>
            </div>
        </div>
    )
}