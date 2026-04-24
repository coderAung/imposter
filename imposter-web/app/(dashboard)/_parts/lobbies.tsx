"use client"
import { AppBadge } from "@/components/customs/badges"
import { AppButton } from "@/components/customs/buttons"
import { AppCard } from "@/components/customs/cards"
import { Title } from "@/components/customs/fonts"
import { useCurrentLobby } from "@/utils/hooks"
import { ArrowRight, Edit, Minus, Plus, SquareArrowRightExit, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const LobbyList = () => {
    const setCurrentLobby = useCurrentLobby(state => state.setCurrentLobby)
    useEffect(() => {
        setCurrentLobby(null)
    }, [setCurrentLobby])
    return (
        <div>
            <div className="mb-3 flex justify-between items-center">
                <Title title="Lobbies"/>
                <AppButton variant="ghost" className="flex items-center bg-blue-500/20 text-blue-500"><Plus size={"1.2rem"}/> New Lobby</AppButton>
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
    return <AppButton onTouchStart={() => alert("Hi")} variant="ghost" className={`text-red-500 flex items-center tracking-wider bg-red-500/30 gap-x-2 ${className}`}><SquareArrowRightExit /> Leave Lobby</AppButton>
}


export const GameForm = ({className}: {className?:string}) => {
    return (
        <div className={`border border-green-500 rounded-xl p-2 bg-green-500/20 ${className}`}>
            <Title title="Start The Game"/>
            <hr className="text-green-500" />
            <div className="p-3 grid grid-cols-3 gap-3">
                <CategorySelect />
                <ImposterInput />
                <StartButton />
            </div>
        </div>
    )
}

const StartButton = ({className}: {className?:string}) => {
    return <button className={`self-end cursor-pointer p-2 rounded border-2 bg-green-500/40 border-green-700 ${className}`}>Start</button>
}

export const GameFormModal = ({open = false, close}: {open:boolean, close?:() => void}) => {

    const lobbyId = useCurrentLobby(state => state.lobbyId)

    return (
        <div onClick={close} className={`w-full h-full fixed top-0 p-5 justify-center backdrop-blur-lg ${open ? "flex" : "hidden"}`}>
            <div className="py-20 w-[95%] md:w-1/3">
                <div onClick={e => e.stopPropagation()} className="rounded-2xl p-3 pb-5 backdrop-blur-xl border-2 border-green-500 bg-green-500/10">
                    <div className="mb-3 flex justify-between items-center">
                        <Title title="Start The Game"/>
                        <AppButton variant="ghost" onClick={close}><X /></AppButton>
                    </div>
                    <hr className="text-green-400" />
                    <div className="mt-5 px-5">
                        {lobbyId ? <LobbyInput lobbyId={lobbyId} lobbyName="HelloWe" className="mb-3" /> : <LobbySelect className="mb-3" />}
                        <CategorySelect className="mb-3"/>
                        <ImposterInput className="mb-3" />
                        <StartButton className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const LobbyInput = ({className, lobbyId,lobbyName}:{className?:string, lobbyId:string, lobbyName:string}) => {
    return (
        <div className={className}>
            <label htmlFor="">Lobby</label>
            <div className="border-2 border-green-500 mt-2 rounded p-2">
                <span>{lobbyName}</span>
                <input type="text" value={lobbyId} readOnly className="ring-0 outline-0 hidden" />                
            </div>
        </div>
    )
}

const LobbySelect = ({className}:{className?:string}) => {
    return (
        <div className={` ${className}`}>
            <label htmlFor="">Select Lobby</label>
            <div className="border-2 border-green-500 mt-2 rounded p-2">
                <select className="w-full outline-0 ring-0">
                    {["WeAreWe", "Friends", "CSBranch", "Bellas"].map((v, i) => <option className="text-green-200 bg-green-800" key={i}>{v}</option>)}
                </select>
            </div>
        </div>
    )
}

const CategorySelect = ({className}:{className?:string}) => {
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