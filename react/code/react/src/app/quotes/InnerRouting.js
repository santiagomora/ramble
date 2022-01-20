import { Switch,Route,Redirect } from 'react-router'
import React, { Suspense } from 'react'

const ListQuotes = React.lazy( () => import('./ListQuotes') )
const QuoteView = React.lazy( () => import('./single/QuoteView') )
const AddQuote = React.lazy( () => import('./form/AddQuote') )

const fallback = <p className="text-center">...loading</p>

export default function InnerRouting({match})
{
    return (
        <Suspense fallback={fallback}>
            <Switch>
                <Route 
                    path={`${match.url}/`} 
                    exact
                    render={() => <Redirect to={`${match.url}/list`} /> }
                />
                <Route 
                    path={`${match.url}/list`}
                    render={() => <ListQuotes url='/quote/7'/>}
                />
                <Route 
                    path={`${match.url}/add`}
                    render={() => <AddQuote/>}
                />
                <Route 
                    path={`${match.url}/:_id`}
                    render={({match}) => <QuoteView url={`/quote/single/${match.params._id}`}/>}
                />
            </Switch>

        </Suspense>
    )
    
}