import {NavLink, useHistory} from 'react-router-dom'
import {Restricted} from '../composition/composition'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import {authActions} from '../store/actions/actions'

const fallback=<Fragment/>

export default function Navbar()
{
    const active = {fontWeight:"bold",color:"white"};

    const dispatch = useDispatch()

    const history = useHistory()

    const logoutHandler = e => 
    {
        e.preventDefault()
        dispatch( authActions.deleteToken() )
        history.push("/")
    }

    const logout = <button onClick={logoutHandler} className="font-weight-bold btn btn-danger">Logout</button>

    return (
        <nav>
            <ul className="m-0" style={{listStyle:"none"}}>
                <li className="pl-3 d-inline">
                    <Restricted fallback={fallback}>
                        <NavLink
                        to="/quotes"
                        activeStyle={active}
                        >
                            <strong>quotes</strong>
                        </NavLink>

                    </Restricted>
                </li>
                <li className="pl-3 d-inline">
                    <Restricted fallback={fallback}>
                        <NavLink
                        to="/menu"
                        activeStyle={active}
                        >
                            <strong>menu</strong>
                        </NavLink>

                    </Restricted>
                </li>
                <li className="pl-3 d-inline">
                    <Restricted fallback={fallback}>
                        <NavLink
                        to="/goals"
                        activeStyle={active}
                        >
                            <strong>course goals</strong>
                        </NavLink>

                    </Restricted>
                </li>
                <li className="pl-3 d-inline">
                    <Restricted fallback={fallback}>
                        <NavLink
                        to="/expenses"
                        activeStyle={active}
                        >
                            <strong>expenses</strong>
                        </NavLink>

                    </Restricted>
                </li>
                <li className="pl-3 d-inline">
                    <Restricted fallback={fallback}>
                        <NavLink
                        to="/assignments"
                        activeStyle={active}
                        >
                            <strong>assignments</strong>
                        </NavLink>

                    </Restricted>
                </li>
                <li className="pl-3 d-inline">
                    <Restricted 
                        fallback={
                            <NavLink to="/">
                                <span className="btn btn-success">
                                    <strong>Login</strong>
                                </span>
                            </NavLink>    
                        }
                    >
                        {logout}
                    </Restricted>
                    
                </li>
            </ul>
        </nav>
    )
}