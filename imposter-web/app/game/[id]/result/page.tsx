import { Header } from "@/components/customs/fonts";
import { PlayerResults } from "../../_parts/result";
import { Home, Users } from "lucide-react";

export default function Result() {
    const css = "bg-gray-500/30 border-gray-500/60 border p-3 rounded-full cursor-pointer hover:bg-gray-500/50"
    return (
        <div className="md:mx-auto md:w-1/3 p-3 mt-5">
            <Header header="He" className="text-center"/>
            <div className="text-center my-3">is</div>
            <Header header="IMPOSTER" className="text-center" />
            <PlayerResults className="mt-5" />
            <div className="flex justify-center gap-x-3 mt-10">
                <button className={` ${css}`}><Home /></button>
                <button className={`flex items-center gap-4 ${css}`}><Users /> Lobby</button>
            </div>
        </div>
    )
}