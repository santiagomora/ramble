/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Button from '../basic/Button';

/**
 * props
 * @param {*} props
 * component
 */
function noMemoToggle(props) {
    const side = props.side;
    return (
        <div className="inline-block small-margin">
            <span className="margin-box bold">
                {
                    (side == 1)
                        ? props.rightTitle
                        : props.leftTitle
                }
            </span>
            <div className="inline-block">
                <div className = {
                    (side == 1)
                        ? "inline-block toggle text-left"
                        : "inline-block toggle text-right"
                }>
                    <button className="circle"
                        value={side == 1 ? 2 : 1}
                        name={props.name}
                        onClick= {
                            (e) => {
                                e.preventDefault();
                                props.changeSide(e);
                            }
                        }/>
                </div>
            </div>
        </div>
    );
}
export const Toggle = React.memo(noMemoToggle);
