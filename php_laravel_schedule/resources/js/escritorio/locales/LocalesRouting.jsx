/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';

import {
    Navegacion
} from '../../app/acciones/ActionsByView';
import Formulario from '../eventos/sub/Formulario';
import ConfirmarModal from '../../app/componentes/modal/Modal';
import ValidationHandler from '../../app/hocs/ValidationHandler';
import {
    localesHandlers
} from '../../app/handlers/sub/localesHandlers';

import Locales from './sub/Locales';
import VerLocal from './sub/VerLocal';
import validation from './validation';


const assignList = (fr,nm) => {
    const list = {};
    list[fr] = nm;
    return list;
}

export default function LocalesRouting (props) {
    const [open,toggle] = useState(false),
        openModal = (e) => {
            e.preventDefault();
            toggle(true);
        },
        closeModal = (e) => {
            e.preventDefault();
            toggle(false);
        };
    return (
        <>
            <ConfirmarModal open={open}
                closeModal={closeModal}
                title={"Eliminar Local"}
                content={"¿estás seguro de eliminar este local?"} />
            <Route path={props.match.url}
                exact
                render={
                    (match) =>
                        <Locales data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('locales')}
                            {...match}/>
                }/>
            <Switch>
                <Route path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) => {
                            const fields = {
                                id:props.data.id,
                                id_franquicia:props.data.franquicia.id,
                                nombre:props.data.nombre,
                                correo_contacto:props.data.correoContacto,
                                telefono_contacto:props.data.telefonoContacto,
                                username: props.data.username,
                                email: props.data.email,
                                razon_social:props.data.razonSocial,
                                cuit_cuil:props.data.cuitCuil,
                                id_provincia:props.data.provincia.id,
                                direccion_local:props.data.direccionLocal,
                                nombre_adm:props.data.admNombre,
                                correo_adm:props.data.admEmail,
                                telefono_adm:props.data.admTelefono
                            },
                            config = (user.rol === 2)
                                ? {
                                    rol:'franquicia',
                                    sel:user.id,
                                    list:assignList(user.id,user.nombre)
                                }
                                : {
                                    rol:'admin',
                                    sel:match.params.id||"",
                                    list:props.data
                                };
                            return (
                                <ValidationHandler form={fields}
                                    sendRequest={localesHandlers.form.edit}
                                    validation={validation}>
                                    <Formulario editar={true}
                                        data={props.data}
                                        type={config}
                                        toggleModal={openModal}
                                        nav={Navegacion.formulario(()=>false,match.match.params.id,'locales')}
                                        {...match}/>
                                </ValidationHandler>

                            )
                        }
                    }/>
                <Route path={`${props.match.url}/agregar`}
                    render={
                        (match) =>{
                            const fields = {
                                id_usuario:user.id,
                                id_franquicia:user.id,
                                nombre:"",
                                correo_contacto:"",
                                telefono_contacto:"",
                                username: "",
                                email: "",
                                razon_social:"",
                                cuit_cuil:"",
                                id_provincia:"",
                                direccion_local:""
                            },
                            config = (user.rol === 2)
                                ? {
                                    rol:'franquicia',
                                    sel:user.id,
                                    list:assignList(user.id,user.nombre)
                                }
                                : {
                                    rol:'admin',
                                    sel:"",
                                    list:props.data
                                };
                            return (
                                <ValidationHandler form={fields}
                                    sendRequest={localesHandlers.form.add}
                                    validation={validation}>
                                    <Formulario editar={false}
                                        data={props.data}
                                        type={config}
                                        toggleModal={openModal}
                                        nav={Navegacion.agregar('locales')}
                                        {...match} />
                                </ValidationHandler>
                            )
                        }
                    }/>
                <Route path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerLocal data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'locales')}
                                {...match} />
                    }/>
            </Switch>
        </>
    );
}
