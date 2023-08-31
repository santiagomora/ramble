import {useSelector,useDispatch} from 'react-redux'
import {userSlice} from '../store/slice/index'
import {preventDefaultWrapper} from '../helper/index'

const userActions = userSlice.actions

const paramExtra = ()  => {}

export default function Login( props )
{
    const {auth} = useSelector( 
        ({user}) =>  ({
            auth:user.auth
        }) 
    )

    const dispatch = useDispatch();

    const loginHandler = () =>  dispatch(userActions.auth({user:{name:'luis'},auth:true}))

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {!auth && (
                        <button 
                            onClick={preventDefaultWrapper(loginHandler,paramExtra)} 
                            className="d-inline btn"
                        >
                            login
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
