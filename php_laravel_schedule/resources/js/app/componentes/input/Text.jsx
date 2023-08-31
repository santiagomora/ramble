/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DisplaysErrors from '../../hocs/DisplaysErrors';

const noMemoText = (props) => {
    const hasError = props.hasError;
    return (
        <div className="full-width">
            <h6 className="highlight m-font">
                {props.titulo}
            </h6>
            <div className={
                hasError
                    ? "light-input error-box error"
                    : "light-input "
                }>
                <textarea name={props.name}
                    rows={props.rows}
                    readOnly = {props.readOnly}
                    placeholder={props.holder}
                    className={
                        hasError && props.value !==''
                            ? "full-width box-transparent error"
                            : "full-width box-transparent"}
                    onChange={props.changeHandler}
                    value={props.value}
                    needsvalue={1}
                    autoComplete="on"/>
            </div>
        </div>
    );
}


const TextArea = React.memo(noMemoText);

export const Text = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <TextArea   rows={props.rows}
                    titulo={props.titulo}
                    holder={props.holder}
                    name={props.name}
                    value={props.value}
                    changeHandler={props.changeHandler}/>
    </DisplaysErrors>
)
