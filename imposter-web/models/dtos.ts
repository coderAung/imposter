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