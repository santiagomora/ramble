import { useRouteMatch } from "react-router"
import {quoteCast} from "../../../cast/cast"
import {Route,Link} from 'react-router-dom'
import {DisplayDateHelper} from '../../../helper/helper'
import QuoteComments from "./QuoteComments"
import {withFetchOnMountHoc, withRequestHoc} from "../../../hocs/hocs"

const Quote = ({data}) => {
    const match = useRouteMatch();
    const quote = quoteCast(data)
    return(
        <div className="py-4 container-fluid">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center font-italic font-weight-bold m-0">
                        "{quote.text}"
                    </h1>
                    <p className="text-center">
                        <strong>{quote.title}</strong> <br/>by {quote.author} on <DisplayDateHelper date={quote.createdAt}/>
                    </p>
                    <div className="text-right"> 
                        <strong> Last updated at: </strong><DisplayDateHelper date={quote.updatedAt}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10 offset-1">
                    <div className="text-right pt-3">
                        <Route exact path={`${match.url}/`}>
                            <Link 
                                to={`${match.url}/comments`}
                                className="btn btn-primary"
                            >
                                Load comments...
                            </Link>
                        </Route>
                    </div>
                    <Route path={`${match.url}/comments`}>
                        <h4 className="font-weight-bold">
                            Comments
                        </h4>
                        <QuoteComments _id={quote._id}/>
                    </Route>
                </div>
            </div>
        </div>  
    )
}

export default withRequestHoc(withFetchOnMountHoc(Quote))