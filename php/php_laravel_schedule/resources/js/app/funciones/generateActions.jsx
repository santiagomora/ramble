import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export function assignActionsByStatus(
    estado,
    actions,
    data
) {
    switch (estado) {
        case 'rechazado':
            return [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-eye inline-box side-margin" />
                            Ver reserva
                        </div>
                    ),
                    click: actions.ver,
                    data: data
                },
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
            ];
            break;
        case 'pendiente':
            return [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-eye inline-box side-margin" />
                            Ver reserva
                        </div>
                    ),
                    click: actions.ver,
                    data: data
                },
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
            ];
            break;
        case 'aprobado':
            return [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-eye inline-box side-margin" />
                            Ver reserva
                        </div>
                    ),
                    click: actions.ver,
                    data: data
                },
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
            ];
        break;
    }
}


export function generateActions(
    hasEvents,
    actions,
    data,
    enableTitles,
    type,
    show
){
    let acciones = [{}];
    switch(type){
        case 'reservas':
        if(!enableTitles){
            acciones = [{
                click: actions.ver,
                data: data
            }];
        }else {
            if(hasEvents){
                if(!show){
                    acciones = [
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-eye inline-box side-margin" />
                                    Ver reservaciones
                                </div>
                            ),
                            click: actions.ver,
                            data: data
                        },
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-plus-circle  inline-box side-margin" />
                                    Expandir
                                </div>
                            ),
                            click: actions.expandir,
                            data: data
                        }
                    ];
                }else{
                    acciones = [
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-eye inline-box side-margin" />
                                    Ver reservaciones
                                </div>
                            ),
                            click: actions.ver,
                            data: data
                        },
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-minus-circle  inline-box side-margin" />
                                    Contraer
                                </div>
                            ),
                            click: actions.expandir,
                            data: data
                        }
                    ];
                }
            }
        }
        break;
        case 'horarios':
        case 'feriados':
            acciones = (hasEvents) ? [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-pen inline-box side-margin" />
                            {(enableTitles) ? 'Editar' : ''}
                        </div>
                    ),
                    click: actions.editar,
                    data: data,
                    class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
                },
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-trash inline-box side-margin" />
                            {(enableTitles) ? 'Eliminar' : ''}
                        </div>
                    ),
                    click: actions.eliminar,
                    data: data,
                    class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
                }
            ] : [
                    {}
                ];
            if (!enableTitles && hasEvents)
                acciones.push({
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-eye inline-box side-margin" />
                            {(enableTitles) ? 'Ver' : ''}
                        </div>
                    ),
                    click: actions.ver,
                    data: data,
                    class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
                });
        break;
    }
    return acciones;
}