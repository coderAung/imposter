export type AuthResult = {
    access_token:string,
    token_type:string
}

export type Profile = {
    account_id:string,
    username:string,
    email:string,
    profile_photo:string,
    name:string,
    lobbies:number,
    followers:number,
    followings:number
}

export type LobbyListItem = {
    lobby_id:string,
    name:string,
    players:number,
}

export type LobbyDeail = {
    lobby_id:string,
    name:string,
    created_at:string,
    players: {
        player_id:string,
        name:string,
        username:string,
        profile:string,
    }[]
}

export type ModificationResult = {
    result_id: string,
}

export type ProfileListItem = {
    name:string
    email:string,
    username:string,
    account_id:string,
    profile_photo?:string,
}