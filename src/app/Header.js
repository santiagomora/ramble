import {useSelector,useDispatch} from 'react-redux'
import {userSlice} from '../store/slice/index'
import {preventDefaultWrapper} from '../helper/index'

const userActions = userSlice.actions

const paramExtra = ()  => {}

export default function Header( props )
{
    const {user,auth} = useSelector( 
        ({user}) =>  ({
            auth:user.auth,
            user:user.user
        }) 
    )

    const dispatch = useDispatch();

    const logoutHandler = () =>  dispatch(userActions.auth({auth:false}))

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h3 className="d-inline">
                        <strong>{
                            user 
                                ? `welcome, ${user.name}!` 
                                : 'no user logged in'
                        }</strong>
                    </h3>
                    {auth && (
                        <button 
                            onClick={preventDefaultWrapper(logoutHandler,paramExtra)} 
                            className="d-inline btn"
                        >
                            logout
                        </button>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                </div>
            </div>
        </div>
    )
}
