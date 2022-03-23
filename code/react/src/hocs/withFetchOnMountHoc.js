import { Fragment, useEffect } from 'react'
import {Conditional} from '../composition/composition'

export default function withFetchOnMountHoc(Component)
{
    return (props) => 
    {
        const {url,request,response} = props

        useEffect(
            () => 
            {
                request({method:'get',url})
            },
            []
        )

        const data = (response||{}).data

        return (
            <Conditional
                alternative={<Fragment/>}
                condition={data}
            >
                <Component 
                    {...props}
                    data={data}
                />
            </Conditional>
        )   
    }
}
