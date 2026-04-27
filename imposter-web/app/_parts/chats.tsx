import { Mic, MicOff, Volume2, VolumeOff } from "lucide-react"
import { useState } from "react"

export const ChatControls = ({className}:{className?:string}) => {
    return (
        <div className={`rounded-full px-5 gap-x-3 py-2 flex justify-center items-center border border-blue-400/50 bg-blue-400/30 backdrop-blur-md ${className}`}>
            <SpeakerButton className="hover:bg-gray-400/30 cursor-pointer p-2 rounded-full" />
            <MicButton className="hover:bg-gray-400/30 cursor-pointer p-2 rounded-full" />
        </div>
    )
}

export const MicButton = ({className}: {className?:string}) => {
    const [mute, setMute] = useState(false)
    const toggleMute = () => setMute(!mute)
    return (
        <>
            {!mute && <button onClick={toggleMute} className={` ${className}`}> <Mic /></button>}
            {mute && <button onClick={toggleMute} className={` ${className}`}> <MicOff /></button>}
        </>
    )
}
export const SpeakerButton = ({className}: {className?:string}) => {
    const [silent, setSilent] = useState(false)
    const toggleSilent = () => setSilent(!silent)
    return (
        <>
        {!silent && <button onClick={toggleSilent} className={` ${className}`}><Volume2 /></button>}
        {silent && <button onClick={toggleSilent} className={` ${className}`}><VolumeOff /></button>}
        </>
    )
}
