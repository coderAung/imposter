import { AppBadge } from "@/components/customs/badges"
import { Profile } from "@/models/dtos"
import Image from "next/image"


export const ProfileStatics = ({profile, className}:{profile:Profile, className?:string}) => {
    return (
        <div className={`px-3 ${className}`}>
        
            <div className={`flex gap-x-8 items-center`}>
                <div>
                    <Image src={"/default.avif"} alt="Profile Photo" width={100} height={100} className="rounded-full" />
                </div>

                <div className="flex flex-col gap-y-2">
                    <span className="font-semibold tracking-widest">{profile.name}</span>
                    <span className="font-semibold text-sm tracking-widest text-slate-400">@{profile.username}</span>
                    <span className="font-semibold text-sm tracking-widest text-slate-400">{profile.email}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
                <AppBadge>Lobbies - {profile.lobbies}</AppBadge>
                <AppBadge variant="purple">Followers - {profile.followers}</AppBadge>
                <AppBadge variant="green">Followings - {profile.followings}</AppBadge>
            </div>

        </div>

    )
}