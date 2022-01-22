import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uiActions } from '../../../store/actions/actions';
import QuoteForm from './QuoteForm'

const defaultValues = {
    title: '',
    author: '',
    text: ''
}

const validation = {
    title: {required:true},
    author: {required:true},
    text: {required:true}
}
function AddQuote()
{
    const history = useHistory();
    const dispatch = useDispatch()

    const handleSuccess = ({success}) => 
    {
        history.push({pathname:"/quotes"})
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }  

    const submitHandler = (submitted,request) => 
    {
        request({url:"/quote/add",method:'post',data:{...submitted,userId:7}})
    }

    return (
        <div className="p-3">
            <h3 className="font-weight-bold">Add quote</h3>
            <QuoteForm
                validation={validation}
                defaultValues={defaultValues}
                submitHandler={submitHandler}
                handleSuccess={handleSuccess}
            />
        </div>
    )
}

export default AddQuote