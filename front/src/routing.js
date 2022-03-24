import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";

import projects from './projects/projects';

const {
    Timestamp,
    UrlReducer,
    ExerciseTracker,
    HeaderParser,
    FileMetadata
} = projects;

function Routing( props ){
    return(
        <Switch>
            <Route path="/" exact>
                <div>
                </div>
            </Route>
            <Route path="/timestamp">
                <Timestamp/>
            </Route>
            <Route path="/header-parser">
                <HeaderParser/>
            </Route>
            <Route path="/url-reducer">
                <UrlReducer/>
            </Route>
            <Route path="/exercise-tracker">
                <ExerciseTracker/>
            </Route>
            <Route path="/file-metadata">
                <FileMetadata/>
            </Route>
        </Switch>
    )
}

export default Routing;
