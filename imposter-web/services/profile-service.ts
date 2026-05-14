import { Profile } from "@/models/dtos";
import { secureRequest } from "@/utils/rest-client";

export async function profile() {
    const resp = await secureRequest("accounts/me")
    return (await resp.json()) as Profile
}