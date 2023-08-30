import { useSelector } from "react-redux"

export default function withUserHoc(Component)
{
    return (props) => 
    {
        const {user} = useSelector( state => state.auth )
        return <Component {...props} user={user} />
    }
}