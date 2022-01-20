import {Link,NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Container} from '../../composition/composition'
import InnerRouting from './InnerRouting'
import {orderActions} from '../../store/actions/actions'

const active = {fontWeight:"bold",color:"black"};

const FoodNavigation = () => 
{
    return (
        <ul 
            style={{
                listStyle:"none",
                borderTop:"1px solid rgba(0,0,0,.1)",
                borderBottom:"1px solid rgba(0,0,0,.1)",
            }}
            className="d-flex flex-row p-0 py-2 m-0 mt-3"
        >
            <li>
                <NavLink 
                    to="/menu/food"
                    activeStyle={active}
                >
                    <strong>MENU</strong>
                </NavLink>
            </li>
            <li className="pl-3">
                <NavLink 
                    to="/menu/checkout"
                    activeStyle={active}
                >
                    <strong>CHECKOUT</strong>
                </NavLink>
            </li>
        </ul>
    )
}

let ismounted = false

export default function Food(props)
{
    const {match} = props

    const dispatch = useDispatch()

    const order = useSelector( state => state.order )

    useEffect(
        () => 
        {
            if (!ismounted)
                dispatch(orderActions.fetchOnMountAction())
            ismounted = true
            dispatch(orderActions.storeOrderAction(order))
        },
        [order]
    )

    return (
        <Container>
            <div className="d-flex flex-row justify-content-between">
                <h2 className="font-weight-bold pt-4 m-0">
                    <Link to="/menu/food">Food App</Link>
                </h2>
            </div>
            <div className="container-fluid p-0  pb-3">
                <div className="row">
                    <div className="col-md-12">
                        <FoodNavigation/>
                    </div>
                </div>
                <InnerRouting 
                    match={match}
                />
            </div>
        </Container>
    )
}
