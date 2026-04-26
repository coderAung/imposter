import { Title } from "@/components/customs/fonts";
import { GameArea, GameCard, GameChat, GameChatMobile, GamePlayers, GameTimer } from "../_parts/games";

export default function Game() {
    return (
        <>
            <Title title="Find the imposter." className="mb-10 mt-5 text-center" />
            <div className="md:flex md:justify-center md:items-center gap-10">
                <div className="flex flex-col items-center md:w-[40%]">
                    <GameTimer className="mb-10" />
                    <GameArea className="w-3/4 md:w-3/5">
                        <GameCard className="h-[400]" />
                    </GameArea>
                </div>
                <GameChat className="hidden md:block w-[40%]" />
                <GamePlayers className="md:hidden mt-5 pb-32" />
                <GameChatMobile className="md:hidden fixed bottom-0" />
            </div>
        </>
    )
}