import { Fragment, useEffect } from 'react'
import {useRequestHook} from '../hooks/hooks'

const withRequestHoc = (Component,defaultPending = true)  => 
{
    return (props) => 
    {
        const {pending,response,error,request} = useRequestHook(defaultPending)
        
        return (
            <Fragment>
                {
                    pending ? <div>...pending</div> : <Fragment/>
                }
                <Component
                    {...props}
                    response={response}
                    request={request}
                />
            </Fragment>
        )

    }
}

export default withRequestHoc