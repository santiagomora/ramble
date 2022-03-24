import SingleExpense from '../SingleExpense'
import {ToggleComponent} from '../../../composition/composition'
import FormHolder from './FormHolder'
import {expenseCast} from '../../../cast/cast'
import { useHistory, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/actions/actions'

const toggleDisplayStyle = {
    onHideTitle:"Cancel",
    onDisplayTitle:"Edit Expense",
    onHideClasses:"btn",
    onDisplayClasses:"btn btn-success"
}

const validation = {
    title:{required:true},
    description:{required:true}
}

const EditViewToggle = ({data}) =>
{
    const expense = expenseCast(data)

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const submitHandler = (submitted,request) => 
    {
        request({url:"/expenses/edit",method:'put',data:submitted})
    }
    
    const handleSuccess = ({success}) => 
    {
        history.push({pathname:location.pathname})
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }  

    const extraButtons = [
        <button key={0} className="btn btn-danger ml-2" onClick={() => {}}>Delete</button>
    ]

    return(
        <ToggleComponent
            showByDefault={true}
            toggleDisplayStyle={toggleDisplayStyle}
            extraButtons={extraButtons}
            alternative={
                <>
                    <h4>
                        <strong>{`Editing "${expense.title}" expense.`}</strong>
                    </h4>
                    <FormHolder
                        defaultValues={expense}
                        validation={validation}
                        submitHandler={submitHandler}
                        handleSuccess={handleSuccess}
                    />
                </>
            }
        >
            <SingleExpense
                {...expense}
            />
        </ToggleComponent>
    )
}

export default EditViewToggle
