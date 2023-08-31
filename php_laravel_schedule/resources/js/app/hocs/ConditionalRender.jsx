import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function ConditionalRender (props) {
    return(
        <>
            {
                ( props.permission.indexOf(props.rol) != -1 )
                ?
                    props.children
                :
                <></>
            }
        </>
    );
}
