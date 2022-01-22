import React from 'react'
import SingleGoal from '../SingleGoal'
import {ToggleComponent} from '../../../composition/composition'
import FormHolder from './FormHolder'
import {goalCast} from '../../../cast/cast'
import { useHistory, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/actions/actions'

const toggleDisplayStyle = {
    onHideTitle:"Cancel",
    onDisplayTitle:"Edit Goal",
    onHideClasses:"btn",
    onDisplayClasses:"btn btn-success"
}

const validation = {
    title:{required:true},
    description:{required:true}
}

const EditViewToggle = ({data}) =>
{
    const goal = goalCast(data)
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    const submitHandler = (submitted,request) => 
    {
        request({url:"/goals/edit",method:'put',data:submitted})
    }

    const handleSuccess = ({success}) => 
    {
        history.push(location.pathname)
        dispatch(uiActions.changeNotification({type:'success',message:success}))
    }

    const extraButtons = [
        <button key={0} className="btn btn-danger ml-2" onClick={() => {}}>Delete</button>
    ]

    return(
        <li className="py-4 list-group-item">
            <ToggleComponent
                showByDefault={true}
                toggleDisplayStyle={toggleDisplayStyle}
                extraButtons={extraButtons}
                alternative={
                    <>
                        <h4>
                            <strong>{`Editing "${goal.title}" goal.`}</strong>
                        </h4>
                        <FormHolder
                            defaultValues={goal}
                            submitHandler={submitHandler}
                            validation={validation}
                            handleSuccess={handleSuccess}
                        />
                    </>
                }
            >
                <SingleGoal
                    {...goal}
                />
            </ToggleComponent>
        </li>
    )
}

export default EditViewToggle
