import ReactDOM from 'react-dom';
import {
    Switch,
    Route
} from 'react-router-dom';
import React, {
    Component
} from 'react';

import {
    Navegacion
} from '../../app/acciones/ActionsByView';
import ValidationHandler from '../../app/hocs/ValidationHandler';
import {
    configuracionHandlers
} from '../../app/handlers/sub/configuracionHandlers';

import Establecimiento from './sub/Establecimiento';
import Usuario from './sub/Usuario';
import Reservas from './sub/Reservas';
import Configuracion from './sub/Configuracion';
import validation from './validation';


export default function ConfiguracionRouting (props) {
    const nav = Navegacion.agregar('configuracion');
    console.log(props.data)
    return (
        <>
            <Route path={props.match.url}
                exact
                component={
                    (match) =>
                        <Configuracion data={props.data}
                            {...match} />
                } />
            <Route path={`${props.match.url}/usuario`}
                exact
                component={
                    (match) => {
                        const fields = {
                            id:props.data.id,
                            id_usuario:user.id,
                            id_franquicia:props.data.franquicia.id||"",
                            username:props.data.username,
                            email:props.data.email,
                            password:"culo"
                        }
                        return (
                            <ValidationHandler form = {fields}
                                    validation = {validation}
                                    sendRequest={configuracionHandlers.form.usuario}>
                                <Usuario data={props.data}
                                    nav={nav}
                                    {...match}/>
                            </ValidationHandler>
                        );
                    }
                } />
            <Route path={`${props.match.url}/establecimiento`}
                component={
                    (match) =>{
                        const fields = {
                            id:props.data.id,
                            id_usuario:user.id,
                            id_franquicia:props.data.franquicia.id||"",
                            nombre:props.data.nombre,
                            correo_contacto:props.data.correoContacto,
                            telefono_contacto:props.data.telefonoContacto,
                            razon_social:props.data.razonSocial,
                            cuit_cuil:props.data.cuitCuil,
                            id_provincia:props.data.provincia.id,
                            direccion_local:props.data.direccionLocal,
                            nombre_adm:props.data.admNombre,
                            correo_adm:props.data.admEmail,
                            telefono_adm:props.data.admTelefono
                        };
                        return (
                            <ValidationHandler form = {fields}
                                validation = {validation}
                                sendRequest={configuracionHandlers.form.establecimiento}>
                                <Establecimiento data={props.data}
                                    nav={nav}
                                    {...match}/>
                            </ValidationHandler>
                        )
                    }
                }/>
            <Route path={`${props.match.url}/reservas`}
                component={
                    (match) =>{
                        const fields = {
                            id:props.data.id,
                            id_usuario:user.id,
                            intervalo_reserva:props.data.intervalo.id,
                            caida_reserva:props.data.caida,
                            antelacion_reserva:props.data.antelacionReserva,
                            disponibilidad_reserva:props.data.disponiblidad
                        };
                        return (
                            <ValidationHandler form = {fields}
                                    validation = {validation}
                                    sendRequest={configuracionHandlers.form.reservas}>
                                <Reservas data={props.data}
                                    nav={nav}
                                    {...match}/>
                            </ValidationHandler>
                        )
                    }
                } />
        </>
    );
}
