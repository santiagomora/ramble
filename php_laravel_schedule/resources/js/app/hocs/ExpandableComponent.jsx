/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../componentes/basic/Titulo';

export const ExpandableComponent = (props) => {
    let buttons = props.buttons||[];
    const   [more,toggle] = useState(props.show),
            title = more
            ?
                <div className="smaller-text text bold">
                    menos <i className="fas fa-minus-circle inline-box side-margin" />
                </div>
            :
                <div className="smaller-text text bold">
                    más <i className="fas fa-plus-circle inline-box side-margin" />
                </div>,
            action = [
                {
                    title:title,
                    click: (e) =>{
                        e.preventDefault();
                        toggle(!more);
                    }
                }
            ];

    buttons = buttons.concat(action);

    return (
        <>
            <Titulo title={props.title}
                links={props.links}
                buttons={buttons}
                changeView={props.changeView}/>
            <div className={more
                    ? "container-fluid"
                    : "hidden"
                }>
                {props.children}
            </div>
        </>
    )
}
