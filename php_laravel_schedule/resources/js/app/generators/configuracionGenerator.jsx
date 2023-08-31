/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import Actions from '../componentes/basic/Actions';
import {ExpandableComponent} from '../hocs/ExpandableComponent';

const configurationCards = [
    {
        element: (data) => (
            <>
                <div className="row v-padding">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Nombre
                        </h6>
                        <div>
                            {data.nombre}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Correo
                        </h6>
                        <div>
                            {data.correoLocal}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Teléfono
                    </h6>
                        <div>
                            {data.telefonoLocal}
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Razón Social
                    </h6>
                        <div>
                            {data.razonSocial}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            CUIT / CUIL
                        </h6>
                        <div>
                            {data.cuitCuil}
                        </div>
                    </div>
                </div>
                <div className="row sub-title top-padding">
                    Encargado
                </div>
                <div className="row v-padding">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Nombre
                        </h6>
                        <div>
                            {data.admNombre}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Teléfono
                        </h6>
                        <div>
                            {data.admTelefono}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Correo
                        </h6>
                        <div>
                            {data.admEmail}
                        </div>
                    </div>
                </div>
                <div className="row sub-title top-padding">
                    Ubicación
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Provincia
                        </h6>
                        <div>
                            {(data.provincia||{}).nombre||"Sin definir"}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Dirección del local
                        </h6>
                        <div>
                            {data.direccionLocal}
                        </div>
                    </div>
                </div>
            </>
        ),
        route: 'establecimiento',
        title: 'Mi establecimiento'
    },
    {
        element: (data) => (
            <>
                <div className="row top-padding">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Username
                        </h6>
                        <div>
                            {data.username}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Correo
                        </h6>
                        <div>
                            {data.email}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger m-font">
                            Contraseña de usuario
                    </h6>
                        <div>
                            *******************
                    </div>
                    </div>
                </div>
            </>
        ),
        route: 'usuario',
        title: 'Mi usuario'
    },
    {
        element: (data) => (
            <>
                <div className="row top-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Intervalo de Reservas
                    </h6>
                        <div>
                            {data.intervalo.description}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Caída de la reserva
                    </h6>
                        <div>
                            {data.caida+ " minutos"}
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Antelacion de Reservas
                        </h6>
                        <div>
                            {
                                data.antelacionReserva
                                    ? data.antelacionReserva + " horas"
                                    :"Sin definir"
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger m-font">
                            Disponibilidad de Reservas
                        </h6>
                        <div>
                            3 días
                        </div>
                    </div>
                </div>
            </>
        ),
        route: 'reservas',
        title: 'Reservas'
    }
];

export default function generateConfigurationCards (
    data
){
    return configurationCards.map(
        (e,i) => {
            const actions = <div className="normal-text"><i className="fas fa-pen" />Editar</div>,
                links = [
                    {
                        title: (
                            <div className="smaller-text text bold text-center">
                                <i className="fas fa-pen inline-box side-margin" />
                                Editar
                            </div>
                        ),
                        to: `/configuracion/${e.route}`,
                        params:{},
                        route:'configuracion'
                    }
                ];
            return {
                content: () => {
                    return (
                        <>
                            <ExpandableComponent    title = {e.title}
                                                    show={i===0}
                                                    links = {links}>
                                {e.element(data)}
                            </ExpandableComponent>
                        </>
                    );
                },
                class: "v-padding"
            }
        }
    );
}
