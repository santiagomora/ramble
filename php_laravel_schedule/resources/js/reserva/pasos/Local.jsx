import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Select
} from "../../app/componentes/input/Select";

function Local(props){
    return (
        <div className={(props.current) ? "" : "hidden"}>
            <div className="col-sm-12">
                <h3 className="bold highlight-title">seleccionar local</h3>
                <Select {...props.select} hideSearch={props.hideSearch} titulo="selecciona el local donde vas a reservar" change={props.change} toggle={props.showToggle} />
            </div>
        </div>
    );
}
export default Local;
