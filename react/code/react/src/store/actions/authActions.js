import {authSlice} from '../slice/slice'

const authActions = authSlice.actions

const defaultAuth = {auth:false,jwtToken:null,user:null}

const fetchToken = () => 
{
    return function(dispatch)
    {
        const token = localStorage.getItem('auth')
        const auth = token 
            ? {...(JSON.parse(token)),auth:true}
            : defaultAuth
        dispatch(authActions.setAuth({auth}))
    }
}

const storeToken = ({jwtToken,user}) => 
{
    return function(dispatch)
    {
        const auth = {jwtToken,user,auth:true}
        localStorage.setItem('auth',JSON.stringify({jwtToken,user}))
        dispatch(authActions.setAuth({auth}))
    }
}


const deleteToken = () => 
{
    return function(dispatch)
    {
        if(localStorage.getItem('auth'))
        {
            localStorage.removeItem('auth')
            dispatch(authActions.setAuth({auth:defaultAuth}))
        }
    }
}

export default {...authActions,storeToken,fetchToken,deleteToken}