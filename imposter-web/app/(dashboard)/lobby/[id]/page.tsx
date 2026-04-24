import { AppButton } from "@/components/customs/buttons";
import { Title } from "@/components/customs/fonts";
import { Copy, Plus, UserPlus } from "lucide-react";
import { GameForm, LeaveButton, ProfileCard } from "../../_parts/lobbies";
import { AppCard } from "@/components/customs/cards";

export default function Lobby() {
    return (
        <>
            <div className="flex justify-between px-2">
                <div>
                    <Title title="Lobby - WeFriends" />
                    <div className="text-sm">
                        <span>ID - </span><span>874501481</span><AppButton variant="ghost"><Copy size={"1rem"} /></AppButton>
                    </div>
                </div>
                <div className="hidden md:block">
                    <LeaveButton className="px-2" />
                </div>
            </div>

            <GameForm className="px-2 mt-5" />

            <div className="grid grid-cols-3 gap-5 mt-5">
                {[1, 2, 3, 4, 5].map(i => <ProfileCard key={i} />)}
                <AppButton variant="ghost" asChild>
                    <AppCard className="flex flex-col items-center rounded-2xl justify-center" variant="purple">
                        <Plus />
                        <span className="mt-3">Invite Player</span>
                    </AppCard>
                </AppButton>
            </div>
            <div className="md:hidden mt-10 flex justify-center gap-x-4">
                <LeaveButton className="p-3" />
                <AppButton variant="secondary" className="p-3 flex items-center gap-x-2"><UserPlus/> Invite Player</AppButton>
            </div>
        </>
    )
}