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

import {Navegacion} from '../../app/acciones/ActionsByView';
import ConfirmarModal from '../../app/componentes/modal/Modal';
import ValidationHandler from '../../app/hocs/ValidationHandler';
import {
    franquiciasHandlers
} from '../../app/handlers/sub/franquiciasHandlers';

import Formulario from './sub/Formulario';
import Franquicias from './sub/Franquicias';
import VerFranquicia from './sub/VerFranquicia';
import validation from './validation';

export default function FranquiciasRouting (props) {
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
                title={"Eliminar Franquicia"}
                content={"¿estás seguro de eliminar este franquicia?"} />
            <Route path={props.match.url}
                exact
                render={
                    (match) =>
                        <Franquicias toggleModal={openModal}
                            data={props.data}
                            nav={Navegacion.listado('franquicias')} {...match}/>
                } />
            <Switch>
                <Route path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) => {
                            const fields = {
                                id:props.data.id,
                                nombre:props.data.nombre,
                                correo_contacto:props.data.correoContacto||'',
                                telefono_contacto:props.data.telefonoContacto||'',
                                username: props.data.username||'',
                                email: props.data.email||'',
                                razon_social:props.data.razonSocial||'',
                                cuit_cuil:props.data.cuitCuil||''
                            };
                            return (
                                <ValidationHandler form={fields}
                                    sendRequest={franquiciasHandlers.form.edit}
                                    validation={validation}>
                                    <Formulario data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.formulario(()=>false,match.match.params.id,'franquicias')}
                                        editar={true} {...match} />
                                </ValidationHandler>

                            )
                        }
                    } />
                <Route path={`${props.match.url}/agregar`}
                    render={
                        (match) => {
                            const fields = {
                                id:'',
                                nombre:'',
                                correo_contacto:'',
                                telefono_contacto:'',
                                username: '',
                                email: '',
                                razon_social:'',
                                cuit_cuil:''
                            };
                            return (
                                <ValidationHandler form={fields}
                                        sendRequest={franquiciasHandlers.form.add}
                                        validation={validation}>
                                    <Formulario data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.agregar('franquicias')}
                                        editar={false} {...match} />
                                </ValidationHandler>

                            )
                        }
                    } />
                <Route path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerFranquicia
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'franquicias')} {...match} />
                    } />
            </Switch>
        </>
    );
}
