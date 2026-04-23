import { Header } from "@/components/customs/fonts";
import { Menu, Search } from "lucide-react";
import { ProfileStatics } from "./_parts/profiles";
import { CurrentGame } from "./_parts/games";
import { LobbyList } from "./_parts/lobbies";

export default function Home() {

    return (
        <div className="md:w-1/2">
            <div className="py-3 px-3 rounded items-center flex justify-between mb-4 sticky top-0 backdrop-blur-3xl">
                <Header header="Imposter"/>
                <div className="flex gap-x-4">
                    <Search />
                    <div className="hidden md:flex">
                        <Menu />
                    </div>
                </div>
            </div>

            <div className="px-2">
                <ProfileStatics className="mb-5" />

                <CurrentGame className="mb-8" />

                <LobbyList />
            </div>


        </div>
    )
}