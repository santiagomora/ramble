import '../css/app.css';
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import {useDispatch} from 'react-redux'
import {Notification} from '../ui/ui'
import { Fragment, useEffect } from 'react';
import {authActions} from '../store/actions/actions';

function App()
{
    const dispatch= useDispatch()
    useEffect(
        () => 
        {
            dispatch(authActions.fetchToken())
        },
        []
    )
    return (
        <Fragment>
            <Router>
                <Header/>
                <div className="app">
                    <Notification/>
                    <div className="px-3">
                        <Content/>
                    </div>
                </div>
            </Router>
            <Footer/>
        </Fragment>
    );
}

export default App;
