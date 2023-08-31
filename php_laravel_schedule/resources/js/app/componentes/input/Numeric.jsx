/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import DisplaysErrors from '../../hocs/DisplaysErrors';
import ReactDOM from 'react-dom';

function noMemoNumeric(props) {
    const   hasError = props.hasError;
    return (
        <div className="full-width">
            <h6 className={
                props.description
                    ? "highlight m-font no-margin"
                    : "highlight m-font"}>
                {props.titulo}
            </h6>
            {props.description||""}
            <div className={
                hasError
                    ? "light-input error-box error"
                    : "light-input "
                }>
                <textarea   name={props.name}
                            rows='1'
                            placeholder={props.holder}
                            className={
                                hasError && props.value !==''
                                    ? "full-width box-transparent error"
                                    : "full-width box-transparent"
                            }
                            onChange={
                                e => {
                                    e.preventDefault()
                                    if (parseInt(e.currentTarget.value) || e.currentTarget.value === '')
                                        props.changeHandler(e);
                                }
                            }
                            value={props.value}
                            needsvalue={1}/>
            </div>
        </div>
    );
}

const Number = React.memo(noMemoNumeric);

export const Numeric = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <Number titulo={props.titulo}
                holder={props.holder}
                name={props.name}
                value={props.value}
                changeHandler={props.changeHandler}/>
    </DisplaysErrors>
)
