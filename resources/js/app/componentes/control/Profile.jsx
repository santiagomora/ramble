/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';

function Profile(props) {
    return (
        <div className="container fixed-down white-background" style={{zIndex:5,height:"100%",borderLeft:"solid 1px var(--border)",marginTop:"6px"}}>
            <div className="row">
                <div>
                    foto perfil
                </div>
                <div>
                    logout y otros
                </div>
            </div>
        </div>
    );
}
export default React.memo(Profile);
