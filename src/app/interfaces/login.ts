export interface Login{
    username: string
    password:string
}

export interface ResLogin {
    status: string,
    mensaje: string,
    token?: string
}