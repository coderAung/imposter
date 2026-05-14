import { ProfileStatics } from "../_parts/profiles";
import { CurrentGame } from "../_parts/games";
import { LobbyList } from "../_parts/lobbies";
import * as profileService from "@/services/profile-service";
import * as lobbyService from "@/services/lobby-service";

export default async function Home() {
    const profile = await profileService.profile()
    const lobbies = await lobbyService.getLobbies()
    return (
        <div className="px-2">
            <ProfileStatics profile={profile} className="mb-5" />

            <CurrentGame className="mb-8" />

            <LobbyList lobbies={lobbies} />
        </div>
    )
}