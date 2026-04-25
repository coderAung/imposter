import { GameArea, GameCard, GameChat, GameTimer } from "../_parts/games";

export default function Game() {
    return (
        <div className="flex justify-center p-3">
            <div className="flex grow h-screen flex-col items-center p-2 my-auto">
                <GameTimer className="mb-20" />
                <GameArea>
                    <GameCard />
                </GameArea>
            </div>
            <GameChat className="hidden md:block grow" />
        </div>
    )
}