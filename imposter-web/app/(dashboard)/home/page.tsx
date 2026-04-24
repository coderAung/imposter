import { ProfileStatics } from "../_parts/profiles";
import { CurrentGame } from "../_parts/games";
import { LobbyList } from "../_parts/lobbies";

export default function Home() {
    return (
        <div className="px-2">
            <ProfileStatics className="mb-5" />

            <CurrentGame className="mb-8" />

            <LobbyList />
        </div>
    )
}