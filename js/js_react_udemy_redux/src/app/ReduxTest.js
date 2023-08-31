import {Fragment} from 'react'
import Counter from './Counter'
import Header from './Header'
import Login from './Login'

export default function ReduxTest()
{
    return (
        <Fragment>
            <Header /> 
            <Counter/>
            <Login />
        </Fragment>
    )
}