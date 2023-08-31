import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import React, {
    Component
} from 'react';

import Escritorio from './sub/Escritorio';

export default function EscritorioRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Escritorio data={props.data} {...match} />
                } />
        </>
    );
}
