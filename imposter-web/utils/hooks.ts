import { create } from "zustand"

type CurrentLobby = {
    lobbyId:string | null,
    setCurrentLobby: (lobbyId:string | null) => void
}

export const useCurrentLobby = create<CurrentLobby>((set) => ({
    lobbyId: null,
    setCurrentLobby: (lobbyId = null) => set(() => ({lobbyId}))
}))
