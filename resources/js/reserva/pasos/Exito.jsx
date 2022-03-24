import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Exito(props) {
    return (
        <div className={(props.current) ? "full-width" : "hidden"}>
            <h1 className="highlight-title">¡Has reservado exitosamente!</h1>
            <img src ="/checkmark-2.png" width="30%" />
        </div>
    );
}

export default React.memo(Exito);