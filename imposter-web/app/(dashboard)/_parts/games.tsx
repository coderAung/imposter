"use client"
import { AppBadge } from "@/components/customs/badges"
import { AppButton } from "@/components/customs/buttons"
import { AppCard } from "@/components/customs/cards"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export const CurrentGame = ({className}: {className?:string}) => {
    const [game] = useState<boolean>(true)

    return (
        <>
        {game ?
        <AppCard className={`rounded-2xl ${className}`} variant="purple">
            <div className="flex gap-x-2 justify-between">
                <div>
                    <span className="text-lg font-semibold tracking-wider">Game ID - 0786808</span>
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
                        <AppBadge>Lobby - WeFriends</AppBadge>
                        <AppBadge variant="green">Players - 5</AppBadge>
                    </div>
                </div>
                <div className="self-center">
                    <AppButton variant="secondary" className="rounded-full"><Link href={"/game/2587"}><Plus/></Link></AppButton>
                </div>
            </div>
        </AppCard> : <div></div>
        }
        </>
    )
}