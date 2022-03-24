import {Container} from '../../composition/composition'
import InnerRouting from './InnerRouting'
import {Link,NavLink} from 'react-router-dom'

const active = {fontWeight:"bold",color:"black"};

const QuoteNavigation = ({match}) => 
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
                    to={`${match.url}/list`}
                    activeStyle={active}
                >
                    <strong>QUOTES</strong>
                </NavLink>
            </li>
            <li className="pl-3">
                <NavLink 
                    to={`${match.url}/add`}
                    activeStyle={active}
                >
                    <strong>ADD QUOTE</strong>
                </NavLink>
            </li>
        </ul>
    )
}


export default function Quotes(props)
{
    const {match} = props

    return (
        <Container>
            <div className="d-flex flex-row justify-content-between">
                <h2 className="font-weight-bold pt-4 m-0">
                    <Link to="/quotes">Quotes</Link>
                </h2>
            </div>
            <div className="container-fluid p-0 pb-3">
                <div className="row">
                    <div className="col-md-12">
                        <QuoteNavigation match={match}/>
                    </div>
                </div>
                <InnerRouting 
                    match={match}
                />
            </div>
        </Container>
    )
}

