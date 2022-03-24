import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';

import Actions from '../../../app/componentes/basic/Actions';
import Titulo from '../../../app/componentes/basic/Titulo';
import LocalesTable from '../../../app/componentes/tables/LocalesTable';
import {
    ExpandableComponent
} from '../../../app/hocs/ExpandableComponent';

function links(key) {
    return [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-eye" />
                    Ver
                </div>
            ),
            to: `/locales/${key}`,
            params:{id:key},
            route:'locales'
        },
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-pen" />
                    Editar
                </div>
            ),
            to: `/locales/editar/${key}`,
            params:{id:key},
            route:'locales'
        }
    ];
}

export default function VerFranquicia (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const   data = props.data,
            localesData = Object.values(data.locales.data).map(
                e => ({
                    ...e,
                    acciones: <Actions links={links(e.id)} buttons={[]}/>
                })
            ),
            agregar = [{
                title:(
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
                    </div>
                ),
                to:"/locales/agregar",
                params:{},
                route:'locales'
            }];
    return (
        <>
            <Titulo title={data.nombre}
                    links={props.nav.links}
                    buttons={props.nav.buttons} />
            <div className="container full-width no-padding">
                <div className="row top-padding">
                    <div className="col-md-6  mid-title">
                        Locales
                    </div>
                    <div className="col-md-6 text-right">
                        <Actions otherSection links={agregar}/>
                    </div>
                </div>
                <div className="row h-padding">
                    <LocalesTable data={localesData}/>
                </div>
            </div>
            <div className="container">
                <ExpandableComponent title ="Información"
                                     show={true}>
                    <div className="row justify-content-end v-padding">
                        <div className="col-md-4">
                            foto perfil
                        </div>
                        <div className="col-md-8">
                            <h6 className="full-width light-danger m-font">
                                Administrador
                            </h6>
                            <div>
                                {data.administrador}
                            </div>
                        </div>
                    </div>
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
                </ExpandableComponent>
                <ExpandableComponent title = "Usuario">
                    <div className="row v-padding">
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
                </ExpandableComponent>
            </div>
        </>
    )
}
