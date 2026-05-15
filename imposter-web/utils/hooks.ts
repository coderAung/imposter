import { LobbyListItem } from "@/models/dtos"
import { create } from "zustand"

type CurrentLobby = {
    lobbyId:string | null,
    setCurrentLobby: (lobbyId:string | null) => void
}

export const useCurrentLobby = create<CurrentLobby>((set) => ({
    lobbyId: null,
    setCurrentLobby: (lobbyId = null) => set(() => ({lobbyId}))
}))

type Lobbies = {
    lobbies:LobbyListItem[],
    setLobbies: (lobbies:LobbyListItem[]) => void
}

export const useLobbies = create<Lobbies>((set) => ({
    lobbies: [],
    setLobbies: (lobbies) => set(() => ({lobbies}))
}))