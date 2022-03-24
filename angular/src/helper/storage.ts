import { AuthStorage } from "src/types"

export const storeToken = ( {token, user} : AuthStorage ) => 
{
    localStorage.setItem('auth',JSON.stringify({token,user}))
}

export const deleteToken = () => 
{
    if( getToken() )
    {
        localStorage.removeItem('auth')
    }
}

export const getToken = (): AuthStorage => 
{
    let stored;
    if( stored = localStorage.getItem('auth') )
    {
        return JSON.parse(stored)
    }
    return {user:null,token:null}
}