import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import LoginForm from './LoginForm'
import {uiActions,authActions} from '../../store/actions/actions'

const validation = {
    email:{required:true,email:true},
    password:{required:true}
}

const defaultValues = {
    email:'',
    password:''
}

export default function Login()
{
    const dispatch = useDispatch()

    const history = useHistory()

    const handleSuccess = ({success}) => 
    {
        //history.push({pathname:"/"})
        dispatch(authActions.storeToken(success))
        dispatch(uiActions.changeNotification({type:'success',message:"Logged in successfully"}))
    }  

    const submitHandler = (submitted,request) => 
    {
        request({url:"/auth/login",method:'post',data:submitted})
    }

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-6 offset-3">
                    <h2 className="font-weight-bold">Login</h2>
                    <LoginForm
                        validation={validation}
                        defaultValues={defaultValues}
                        submitHandler={submitHandler}
                        handleSuccess={handleSuccess}
                    />
                </div>
            </div>
        </div>
    )
}