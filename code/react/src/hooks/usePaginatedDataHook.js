import {useLocation} from 'react-router-dom'

const usePaginatedDataHook = () => 
{
    const {search,pathname,state} = useLocation()
    const searchParams = new URLSearchParams(search)
    const limit = searchParams.get('limit')||8;
    const skip = searchParams.get('skip')||0;
    return {state:state||{},pathname,limit,skip};
}

export default usePaginatedDataHook;