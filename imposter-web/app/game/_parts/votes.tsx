"use client"
import { MicButton, SpeakerButton } from "@/app/_parts/chats"
import { AppCard } from "@/components/customs/cards"
import { ThumbsUp } from "lucide-react"
import Image from "next/image"

export const VoteArea = ({className}:{className?:string}) => {
    return (
        <div className={`${className}`}>
            <div className="flex justify-center flex-wrap gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => <VoteProfile className="w-1/4" key={i} />)}
            </div>
            <div className="flex justify-center mt-10 gap-x-3">
                <SpeakerButton className="rounded-full border border-gray-500/50 bg-gray-500/20 hover:bg-gray-500/50 p-3 backdrop-blur-xs" />
                <MicButton className="rounded-full border border-gray-500/50 bg-gray-500/20 hover:bg-gray-500/50 p-3 backdrop-blur-xs"/>
                <button className="bg-purple-700/20 gap-x-4 flex items-center justify-center text-white border border-purple-500/50 cursor-pointer rounded-full py-3 px-5 w-1/2 md:w-1/3">
                    <ThumbsUp size={"1.2rem"} /> <span>Vote</span>
                </button>
            </div>
        </div>
    )
}

const VoteProfile = ({className}:{className?:string}) => {
    return (
        <AppCard variant="gray" className={`rounded-2xl hover:bg-purple-500/20 cursor-pointer hover:border-purple-500 ${className}`}>
            <div className="flex justify-center items-center">
                <Image src={"/default.avif"} alt="Profile photo" className="rounded-full" width={100} height={100} />
            </div>
            <div className="text-center mt-3">Name</div>
        </AppCard>
    )
}