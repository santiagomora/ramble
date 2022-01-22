import React,{ Suspense } from 'react'
import {Route,Redirect,Switch} from 'react-router'

const Checkout = React.lazy( () => import('./Checkout') )
const Menu = React.lazy( () => import('./Menu') )

const fallback = <p className="text-center">...loading</p>

function InnerRouting({match})
{
    return (
        <Suspense fallback={fallback}>
            <Switch>
                <Route 
                    path={`${match.url}/`}
                    exact
                    render={() => <Redirect to={`${match.url}/food`}/>}
                />
                <Route 
                    path={`${match.url}/checkout`}
                    render={() => <Checkout/>}
                />
                <Route 
                    path={`${match.url}/food`}
                    render={() => <Menu/>}
                />
            </Switch>
        </Suspense>
    )
    
}

export default InnerRouting