/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export const FeriadosActions = {
    week: {
        no_data: (
            key,
            actions
        ) => ({}),
        data: (
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
                    to: `/escritorio/feriados/editar/${key}`,
                    params:{id:key},
                    route:'feriados'
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
        })
    },
    month: {
        data: (
            key,
            actions
        ) => ({
            links: [
                {
                    title: (
                        <div className="smaller-text decorate-hover highlight-title small-v-padding">
                            <i className="fas fa-eye side-margin" />
                        </div>
                    ),
                    to: `/escritorio/feriados/${key}`,
                    params:{id:key},
                    route:'feriados'
                },{
                    title: (
                        <div className="smaller-text decorate-hover highlight-title small-v-padding">
                            <i className="fas fa-pen inline-box side-margin" />
                        </div>
                    ),
                    to: `/escritorio/feriados/editar/${key}`,
                    params:{id:key},
                    route:'feriados'
                }
            ],
            buttons: [
                {
                    title: (
                        <div className="smaller-text  highlight-title decorate-hover ">
                            <i className="fas fa-trash side-margin" />
                        </div>
                    ),
                    click: actions.eliminar,
                    data: key
                }
            ]
        }),
        no_data: (
            key,
            actions
        ) => ({})
    }
};
