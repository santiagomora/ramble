/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    agregar: (root) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/escritorio/${root}`
            }
        ]
    }),
    listado: (root) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar
                    </div>
                ),
                to: `/escritorio/${root}/agregar`
            }
        ]
    }),
    formulario:(
        eliminar,
        key,
        root
    ) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/escritorio/${root}`
            }, {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to:`/escritorio/${root}/${key}`
            }
        ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar
                    </div>
                ),
                click: () => false,
                data:1
            },
        ]
    }),
    singular: (
        eliminar,
        key,
        root
    ) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/escritorio/${root}`,
                params:{},
                route:root
            }, {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to:`/escritorio/${root}/editar/${key}`
            }
        ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar
                    </div>
                ),
                click: () => false
            },
        ]
    })
};

export const FormActions = (
    sendHandler,
    cancelHandler,
    customSend,
    customCancel
) => [
    {
        title: customCancel
        ?
            customCancel.title
        :
        (
            <div className="smaller-text text bold">
                <i className="fas fa-times-circle inline-box side-margin" />
                Cancelar
            </div>
        ),
        click: cancelHandler
    },
    {
        title: customSend
        ?
            customSend.title
        :
        (
            <div className="smaller-text text bold">
                <i className="fas fa-check-circle inline-box side-margin" />
                Guardar
            </div>
        ),
        click: sendHandler
    },
];
