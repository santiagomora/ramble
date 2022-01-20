import Comments from './Comments'
import {ToggleComponent} from "../../../composition/composition"
import AddQuoteComment from "../form/AddQuoteComment"
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/actions/actions'

const validation = {
    author:{required:true},
    text:{required:true}
}

const defaultValues = {
    author:'',
    text:''
}

const toggleDisplayStyle = {
    onHideTitle:"Add new comment",
    onDisplayTitle:"Cancel",
    onHideClasses:"btn btn-success",
    onDisplayClasses:"btn"
}

export default function QuoteComments({_id}) 
{
    const history = useHistory();
    const dispatch = useDispatch()
    const submitHandler = (submitted,request) => 
    {
        request({url:"/quote/comment/add",method:'post',data:{...submitted,quoteId:_id}})
    }

    const handleSuccess = ({success}) => 
    {
        history.push(`/quotes/${_id}`)
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }

    return (
        <>
            <Comments url={`/quote/comment/${_id}`}/>
            <div className="pt-2">
                <ToggleComponent
                    showByDefault={false}
                    toggleDisplayStyle={toggleDisplayStyle}
                    alternative={<></>}
                >
                    <h5>
                        <strong>Add Comment </strong>
                    </h5>
                    <AddQuoteComment
                        isCreate={true}
                        validation={validation}
                        submitHandler={submitHandler}
                        defaultValues={defaultValues}
                        handleSuccess={handleSuccess}
                    />
                </ToggleComponent>
            </div>
        </>
    )
}

