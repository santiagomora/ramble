import { useSelector } from 'react-redux'
import {Conditional} from './composition'

export default function Restricted({fallback,children})
{
    const {auth} = useSelector( state => state.auth )

    return (
        <Conditional
            alternative={fallback}
            condition={auth}
        >
            {children}
        </Conditional>
    )
}