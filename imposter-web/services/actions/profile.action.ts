"use server"

import { ProfileListItem } from "@/models/dtos";
import { ProfileSearchForm } from "@/models/searches";
import { secureRequest } from "@/utils/rest-client";

export async function findByKeyword(form:ProfileSearchForm) {
    const resp = await secureRequest("profiles", {}, form)
    return (await resp.json()) as ProfileListItem[]
}