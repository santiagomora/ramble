import FormHolder from './FormHolder.js';
import {expenseCast} from '../../../cast/cast'
import {ToggleComponent} from '../../../composition/composition'
import { useHistory, useLocation } from 'react-router';
import { uiActions } from '../../../store/actions/actions';
import { useDispatch } from 'react-redux';

const toggleDisplayStyle = {
    onHideTitle:"Add new Expense",
    onDisplayTitle:"Cancel",
    onHideClasses:"btn btn-primary",
    onDisplayClasses:"btn"
}


const validation = {
    title:{required:true},
    description:{required:true},
    amount:{required:true}
}

const CreateExpenseForm = () => 
{

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    const submitHandler = (submitted,request) => 
    {
        request({url:"/expenses/add",method:'post',data:{...submitted,userId:7}})
    }

    const handleSuccess = ({success}) => 
    {
        history.push({pathname:location.pathname})
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }  

    return (
        <ToggleComponent
            showByDefault={false}
            toggleDisplayStyle={toggleDisplayStyle}
        >
            <h4>
                <strong>Creating Expense</strong>
            </h4>
            <FormHolder
                isCreate={true}
                defaultValues={expenseCast()}
                validation={validation}
                submitHandler={submitHandler}
                handleSuccess = {handleSuccess}
            />
        </ToggleComponent>
    )
}

export default CreateExpenseForm;
