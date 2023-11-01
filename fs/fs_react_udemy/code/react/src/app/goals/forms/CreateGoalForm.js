import {ToggleComponent} from '../../../composition/composition'
import FormHolder from './FormHolder.js';
import {goalCast} from '../../../cast/cast'
import {useLocation,useHistory} from 'react-router-dom'
import { uiActions } from '../../../store/actions/actions';
import { useDispatch } from 'react-redux';

const toggleDisplayStyle = {
    onHideTitle:"Add new Goal",
    onDisplayTitle:"Cancel",
    onHideClasses:"btn btn-primary",
    onDisplayClasses:"btn"
}

const validation = {
    title:{required:true},
    description:{required:true}
}

const CreateGoalForm = () => 
{
    const location = useLocation()

    const history = useHistory()
    const dispatch = useDispatch()

    const submitHandler = (submitted,request) => 
    {
        request({url:"/goals/add",method:'post',data:submitted})
    }

    const handleSuccess = ({success}) => 
    {
        history.push(location.pathname)
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }

    return(
        <ToggleComponent
            showByDefault={false}
            toggleDisplayStyle={toggleDisplayStyle}
        >
            <h4>
                <strong>Creating Goal</strong>
            </h4>
            <FormHolder
                isCreate={true}
                validation={validation}
                defaultValues={goalCast()}
                submitHandler={submitHandler}
                handleSuccess={handleSuccess}
            />
        </ToggleComponent>

    )
}

export default CreateGoalForm
