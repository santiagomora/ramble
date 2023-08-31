import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Button(props) {
    return (
        <>
            <button
                type={props.type ? props.type : ""}
                data={(props.data) ? props.data : ""}
                onClick={props.click}
                className={props.class}
                disabled={props.disabled}>
                {(props.title) ? props.title: ""}
            </button>
        </>
    );
}
export default React.memo(Button);
