import {useSelector,useDispatch} from 'react-redux'
import {Conditional} from '../composition/composition'
import {uiActions} from '../store/actions/actions'

const messageTypes = {
    success:{color:"white",backgroundColor:"var(--success)",fontWeight:"bold"},
    error:{color:"white",backgroundColor:"var(--danger)",fontWeight:"bold"}
}

const buttonStyles = {
    border:"solid 3px white",
    color:"white",
    fontWeight:"bolder",
    borderRadius:"50%",
    backgroundColor:"transparent"
}

export default function Notification()
{
    const notification = useSelector(({ui}) => ui.notification)

    const dispatch = useDispatch()

    const toggleOnClick = e => 
    {
        e.preventDefault()
        dispatch(uiActions.changeNotification(null))
    }

    if(notification)
    {
        setTimeout(
            () => 
            {
                dispatch(uiActions.changeNotification(null))
            },
            4000
        )
    }

    const {type,message} = notification||{}

    return (
        <Conditional
            alternative={<></>}
            condition={notification}
        >
            <div 
                className="container-fluid py-2 px-3 font-weight-bolder"
                style={type&&messageTypes[type]}
            >
                <div className="row">
                    <div className="col">
                        {notification&&message}
                    </div>
                    <div className="col-auto">
                        <button 
                            style={buttonStyles}
                            onClick={toggleOnClick}
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>
        </Conditional>
    )
}