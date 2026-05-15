"use server"
import { ModificationResult } from "@/models/dtos";
import { LobbyForm } from "@/models/schemas";
import { secureRequest } from "@/utils/rest-client";
import { redirect } from "next/navigation";

export async function create(form:LobbyForm) {
    const resp = await secureRequest("lobbies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const result = (await resp.json()) as ModificationResult
    redirect(`/lobby/${result.result_id}`)
}