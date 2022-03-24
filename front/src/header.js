import {NavLink} from 'react-router-dom';

function Navigation( props ){
    return(
        <ul className="nav-bar">
            <li className="nav-link">
                <NavLink to="/timestamp"
                    activeClassName="is-active">
                    <code>TIMESTAMP</code>
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/header-parser"
                    activeClassName="is-active">
                    <code>HEADER PARSER</code>
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/url-reducer"
                    activeClassName="is-active">
                    <code>URL REDUCER</code>
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/exercise-tracker"
                    activeClassName="is-active">
                    <code>EXERCISE TRACKER</code>
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/file-metadata"
                    activeClassName="is-active">
                    <code>FILE METADATA</code>
                </NavLink>
            </li>
        </ul>
    )
}

function Header( props ){
    return(
        <div className="row justify-content-center header">
            <div className="col-md-12">
                <h1 style={{textAlign:"center"}}>
                    <NavLink to="/"
                        activeClassName="is-active">
                        <code>
                            freeCodeCamp API projects
                        </code>
                    </NavLink>
                </h1>
            </div>
            <div className="col-md-12">
                <Navigation/>
            </div>
        </div>
    )
}

export default Header;
