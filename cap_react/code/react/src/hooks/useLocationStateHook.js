import {useLocation} from 'react-router'

export default function useLocationStateHook(paramName)
{
    const {state} = useLocation()
    return (state||{})[paramName]
}