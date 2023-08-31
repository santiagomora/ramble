import React, {
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';

const type = {
    success:{backgroundColor:'var(--success-transparent)',color:'white'},
    warning:{backgroundColor:'var(--warning-transparent)',color:'white'},
    failure:{backgroundColor:'var(--danger-transparent)',color:'white'}
}

export default function Message (props){
    const style = {
        position:"fixed",
        top:"20px",
        right:"20px",
        zIndex:'1031',
        borderRadius:"3px",
        maxWidth:"400px",
        minWidth:"200px",
        ...type[props.message.type]
    };
    useEffect(
        ()=>{
            setTimeout(
                () => {
                    if (props.message.show)
                        props.hide(props.index)
                },
                5000
            )
        },
        []
    )
    return (
        <div className="extra-box-padding" style={style}>
            <div className="relative">
                <button
                    style={{
                        position:"absolute",
                        right:"-5px",
                        top:"-5px",
                        color:"white"
                    }}
                    onClick={e => {
                        e.preventDefault();
                        props.hide(props.index)
                    }}
                    className="box-transparent">
                    <i className="fas fa-times"/>
                </button>
                <div className="text bold" style={{color:"white"}}>
                    {props.message.title}
                </div>
                {props.message.data}
            </div>
        </div>
    )
}
