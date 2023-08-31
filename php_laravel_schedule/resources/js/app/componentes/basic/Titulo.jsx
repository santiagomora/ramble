/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from './ButtonList';
import Actions from './Actions';

export default function Titulo (props){
    return (
        <>
            <div className="c-title no-padding inline-block"
                style={{overflow:"hidden"}}>
                {props.title}
            </div>
            <div className="inline-block">
                <Actions links={props.links}
                    buttons={props.buttons}
                    toggle={props.changeView}/>
            </div>
        </>
    );
}
