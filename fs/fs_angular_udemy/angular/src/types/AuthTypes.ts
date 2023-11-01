export type AuthCredentials = {email:string,password:string}

export type UserRegister = {email:string,password:string,name:string}

export type User = {photo:string,email:string,password:string,name:string,createdAt:Date,updatedAt:Date}

export type AuthToken = {iat: number, exp: number, payload: string}

export type AuthStorage = {token:AuthToken, user: User}