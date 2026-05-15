import { LobbyDeail, LobbyListItem } from "@/models/dtos";
import { secureRequest } from "@/utils/rest-client";

export async function getLobbies() {
    const resp = await secureRequest("lobbies")
    return (await resp.json()) as LobbyListItem[]
}

export async function findById(id: string) {
    const resp = await secureRequest(`lobbies/${id}`)
    return (await resp.json()) as LobbyDeail
}
