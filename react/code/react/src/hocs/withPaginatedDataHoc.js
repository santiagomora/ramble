import {usePaginatedDataHook } from '../hooks/hooks'
import {buildQueryUrlHelper} from '../helper/helper'
import {Pagination} from '../composition/composition'
import {useEffect} from 'react'

const handleResponse = (res) => 
{
    return {data:res.data||[],pagination:res.pagination||{}}
}

function withPaginatedDataHoc(Component)
{
    return (props) =>
    {
        const {url,response,request} = props

        const {pathname,state,limit,skip} = usePaginatedDataHook()

        useEffect(
            () => 
            {
                request({method:'get',url:buildQueryUrlHelper(url,limit,skip)})
            },
            [limit,skip,...(props.dependencies||[])]
        )

        const {data,pagination} = handleResponse(response||{})

        return response&&(
            <Pagination
                limit={limit}
                skip={skip}
                total={pagination.total||0}
                pathInfo={{pathname,state}}
            >
                <Component
                    {...props}
                    data={data}
                />
            </Pagination>
        )
    }
}

export default withPaginatedDataHoc;
