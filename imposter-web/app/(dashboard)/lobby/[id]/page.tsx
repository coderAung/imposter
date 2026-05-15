import { AppButton } from "@/components/customs/buttons";
import { Title } from "@/components/customs/fonts";
import { Copy, Plus, UserPlus } from "lucide-react";
import { GameForm, LeaveButton, ProfileCard } from "../../_parts/lobbies";
import { AppCard } from "@/components/customs/cards";
import *  as lobbyService from "@/services/lobby-service"
import { ChatControls, MicButton, SpeakerButton } from "@/app/_parts/chats";

export default async function Lobby({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const lobby = await lobbyService.findById(id)
    return (
        <>
            <div className="relative flex justify-between px-2">
                <div className="md:hidden absolute top-0 right-0 px-3">
                    <div className="flex justify-center gap-x-2">
                        <SpeakerButton className="rounded-full border border-gray-500/50 bg-gray-500/20 hover:bg-gray-500/50 p-3 backdrop-blur-xs" />
                        <MicButton className="rounded-full border border-gray-500/50 bg-gray-500/20 hover:bg-gray-500/50 p-3 backdrop-blur-xs"/>
                    </div>
                </div>

                <div>
                    <Title title={`Lobby - ${lobby.name}`} />
                    <div className="text-sm">
                        <span>ID - </span><span>{lobby.lobby_id}</span><AppButton className="inline" variant="ghost"><Copy size={"1rem"} /></AppButton>
                    </div>
                </div>
                <div className="hidden md:block">
                    <LeaveButton className="px-2" />
                </div>
            </div>

            <GameForm className="hidden md:block px-2 mt-5" />

            <div className="grid grid-cols-3 gap-5 mt-5 md:pb-24">
                {lobby.players.map(i => <ProfileCard id={i.player_id} name={i.name} key={i.player_id} />)}
                <AppButton variant="ghost" className="hidden md:flex" asChild>
                    <AppCard className="flex flex-col items-center rounded-2xl justify-center" variant="purple">
                        <Plus />
                        <span className="mt-3">Invite Player</span>
                    </AppCard>
                </AppButton>
            </div>
            <div className="md:hidden mt-10 flex justify-center gap-x-4">
                <LeaveButton className="p-3" />
                <AppButton variant="secondary" className="p-3 flex items-center gap-x-2"><UserPlus /> Invite Player</AppButton>
            </div>
            <div className="hidden md:block md:fixed md:bottom-0 p-5">
                <ChatControls />
            </div>
        </>
    )
}