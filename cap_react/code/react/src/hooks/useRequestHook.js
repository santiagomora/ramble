import {useCallback, useEffect, useState} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import axiosRequest from '../axios/api'
import authActions from '../store/actions/authActions'
import uiActions from '../store/actions/uiActions'

let headers = {
    'Content-Type': 'application/json',
    'Accept':'application/json'
}

const useDataFetchHook = (defaultPending) => 
{
    const [pending,setPending] = useState(defaultPending)
    const [response,setResponse] = useState(null)
    const [error,setError] = useState(null)
    const {auth,jwtToken} = useSelector( state => state.auth )

    const dispatch = useDispatch()

    const request = useCallback(
        function(requestConfig)
        {
            setPending(true);

            headers = auth 
                ? {...headers,'Authorization':`Bearer ${jwtToken}`}
                : headers

            return axiosRequest({...requestConfig,headers})
            .then(
                ({data}) => 
                {
                    const {unauthorized,error} = data
                    const message = (error||unauthorized)||null;
                    
                    setPending(false)
                    setError(message ? message : null)
                    setResponse(message ? null : data)
                    
                    if(message)
                    {
                        if(unauthorized)
                        {
                            dispatch(authActions.deleteToken())
                        }
                        dispatch(uiActions.changeNotification({type:'error',message}))
                    }
                }
            )
            .catch(
                err => 
                {
                    setPending(false)
                    setError('An error has ocurred...')
                    setResponse(null)
                }
            )
        },
        [auth,jwtToken]
    )

    return {pending,response,error,request}
}

export default useDataFetchHook