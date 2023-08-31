/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {progress} from '../../utils/api';

export function downloadHandler(pEvent) {
    let
        loading = Math.round((pEvent.loaded * 100) / pEvent.total),
        state = loading !== 100 ?
            { loading, loadFinished: false }
            : { loading };
    this.setState(state);
}
export function LoadBar (progress){
    return (
        <div className="row dark-background sticky-top" style={{zIndex:4,overflow:"hidden"}}>
            <div className="" style={
                {
                    width:`${progress.loaded}%`,
                    backgroundColor:"var(--highlight-blue)",
                    height:"6px"
                }
            }/>
        </div>
    )
}
