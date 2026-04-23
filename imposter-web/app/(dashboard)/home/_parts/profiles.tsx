import { AppBadge } from "@/components/customs/badges"
import Image from "next/image"


export const ProfileStatics = ({className}:{className?:string}) => {
    return (
        <div className={` ${className}`}>
        
            <div className={`flex gap-x-8 items-center`}>
                <div>
                    <Image src={"/default.avif"} alt="Profile Photo" width={100} height={100} className="rounded-full" />
                </div>

                <div className="flex flex-col gap-y-2">
                    <span className="font-semibold tracking-widest">Ye Wont Aung</span>
                    <span className="font-semibold text-sm tracking-widest text-slate-400">@yewontaung</span>
                    <span className="font-semibold text-sm tracking-widest text-slate-400">name@email.com</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
                <AppBadge>Lobbies - 10</AppBadge>
                <AppBadge variant="green">Games - 13</AppBadge>
                <AppBadge variant="purple">Followers - 10</AppBadge>
                <AppBadge variant="yellow">Followings - 10</AppBadge>
            </div>

        </div>

    )
}