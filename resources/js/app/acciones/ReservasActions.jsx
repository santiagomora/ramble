/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const ReservasActions = {
    day:{
        Rechazada: (
            actions,
            data
        ) => ({
            buttons: [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-history inline-box side-margin" />
                            Revertir
                        </div>
                    ),
                    click: actions.revertir,
                    data: data
                }
            ],
            links:null
        }),
        Pendiente: (
            actions,
            data
        ) => ({
            buttons:[
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-times-circle inline-box side-margin" />
                            Rechazar
                        </div>
                    ),
                    click: actions.rechazar,
                    data: data
                },
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-check-circle inline-box side-margin" />
                            Aprobar
                        </div>
                    ),
                    click: actions.aprobar,
                    data: data
                }
            ],
            links: null
        }),
        Aprobada: (
            actions,
            data
        ) => ({
            buttons:[{
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-history inline-box side-margin" />
                        Revertir
                    </div>
                ),
                click: actions.revertir,
                data: data
            }],
            links: null
        })
    }
};
