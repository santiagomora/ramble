/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import MessageHandler from '../app/hocs/MessageHandler';
import AuthControl from './AuthControl';
import Reservas from '../reserva/Reserva';

function AppRouting (props){
    return(
        <Router basename="/">
            <Route path='/'
                render={
                    (match) => (
                        <MessageHandler {...match}>
                            <AuthControl {...match}/>
                        </MessageHandler>
                    )
                }/>
            <Route path='/reservas'
                render={
                    (match) => <Reservas {...match}/>
                }/>
        </Router>
    );
}

if (document.getElementById('app-container')) {
    ReactDOM.render(
        <AppRouting/>,
        document.getElementById('app-container')
    )
}
