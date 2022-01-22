import React,{Suspense, useEffect, useState} from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import Conditional from '../composition/Conditional'
import Restricted from '../composition/Restricted'

const Login = React.lazy( () => import('./auth/Login') )
const Profile = React.lazy( () => import('./auth/Profile') )
const Assignments = React.lazy( () => import('./assignments/Assignments') )
const Food = React.lazy( () => import('./food/Food') )
const Expenses = React.lazy( () => import('./expenses/Expenses') )
const Goals = React.lazy( () => import('./goals/Goals') )
const Quotes = React.lazy( () => import('./quotes/Quotes') )

const fallback = <p className="text-center">...loading</p>

const defaultTimeout = 3

const RestrictedFallback = () => 
{
    const [countdown,setCountdown] = useState(defaultTimeout)
    useEffect(
        () => 
        {
            const interval = setInterval(
                () => {
                    if(countdown>0)
                        setCountdown( ps =>  ps-1 )
                },
                1000
            )
            return () => clearInterval(interval)
        },
        []
    )
    return (
        <Conditional
            condition={countdown>0}
            alternative={<Redirect to="/"/>}
        >
            <div className="text-center" style={{padding:"9rem"}}>
                <h3 className="font-weight-bold">
                    Oops!... User unathenticated
                </h3>
                <p>Redirecting in {countdown}</p>
            </div>
        </Conditional>
    )

}

function Content()
{
    return(
        <Suspense fallback={fallback}>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={
                        () => (
                            <Restricted fallback={<Login/>}>
                                <Profile/>
                            </Restricted>
                        )
                    }
                />
                <Route
                    path="/expenses"
                    render={
                        () => (
                            <Restricted fallback={<RestrictedFallback/>}>
                                <Expenses/>
                            </Restricted>
                        )
                    }
                />
                <Route
                    path="/goals"
                    render={
                        () => (
                            <Restricted fallback={<RestrictedFallback/>}>
                                <Goals/>
                            </Restricted>
                        )
                    }
                />
                <Route
                    path="/menu"
                    render={
                        (match) => (
                            <Restricted fallback={<RestrictedFallback/>}>
                                <Food {...match}/>
                            </Restricted>
                        )
                    }
                />
                <Route
                    path="/assignments"
                    render={
                        () => (
                            <Restricted fallback={<RestrictedFallback/>}>
                                <Assignments/>
                            </Restricted>
                        )
                    }
                />
                <Route
                    path="/quotes"
                    render={
                        (match) => (
                            <Restricted fallback={<RestrictedFallback/>}>
                                <Quotes {...match}/>
                            </Restricted>
                        )
                    }
                />
            </Switch>
        </Suspense>
    )

}
    
export default Content
