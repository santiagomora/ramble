/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const UbicacionesActions = (
    key,
    actions
) => ({
    links: [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-pen inline-box side-margin" />
                    Editar
                </div>
            ),
            to: `/escritorio/ubicaciones/editar/${key}`
        }
    ],
    buttons: [
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-trash inline-box side-margin" />
                    Eliminar
                </div>
            ),
            click: actions.eliminar,
            data: key
        }
    ]
});
