import { LobbyListItem } from "@/models/dtos";
import { secureRequest } from "@/utils/rest-client";

export async function getLobbies() {
    const resp = await secureRequest("lobbies")
    return (await resp.json()) as LobbyListItem[]
}