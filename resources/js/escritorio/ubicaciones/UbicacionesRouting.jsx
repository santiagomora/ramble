import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';

import Formulario from './sub/Formulario';
import Ubicaciones from './sub/Ubicaciones';
import VerUbicacion from './sub/VerUbicacion';
import validation from './validation';

import {
    Navegacion
} from '../../app/acciones/ActionsByView';
import ValidationHandler from '../../app/hocs/ValidationHandler';
import ConfirmarModal from '../../app/componentes/modal/Modal';
import {
    ubicacionesHandlers
} from '../../app/handlers/sub/ubicacionesHandlers';

export default function UbicacionesRouting (props) {
    const [open,toggle] = useState(false),
        openModal = (e) => {
            e.preventDefault();
            toggle(true);
        },
        closeModal = (e) => {
            e.preventDefault();
            toggle(false);
        },
        changeView={
            right:"inactivo",
            left:"activo",
            change:() => false,
            side:1
        };
    return (
        <>
            <ConfirmarModal open={open}
                closeModal={closeModal}
                title={"Eliminar Ubicación"}
                content={"¿estás seguro de eliminar este ubicación?"} />
            <Route path={props.match.url}
                exact
                render={
                    (match) =>(
                        <Ubicaciones data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('ubicaciones')} {...match}/>
                    )
                }/>
            <Switch>
                <Route path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) =>{
                            const form ={
                                id: props.data.id,
                                id_usuario:user.id,
                                foto:props.data.foto,
                                nombre:props.data.nombre,
                                descripcion:props.data.descripcion,
                                cantidad_maxima:props.data.capacidad,
                                maximo_personas:props.data.maximo,
                                scope:props.data.estado === 'Activo' ? 1 : 2
                            };
                            changeView.side = form.scope;
                            return (
                                <ValidationHandler form={form}
                                    sendRequest={ubicacionesHandlers.form.edit}
                                    validation={validation}>
                                    <Formulario editar={true}
                                        data={props.data}
                                        toggleModal={openModal}
                                        changeView={changeView}
                                        nav={Navegacion.formulario(()=>false,match.match.params.id,'ubicaciones')}
                                        {...match} />
                                </ValidationHandler>
                            )
                        }
                    } />
                <Route path={`${props.match.url}/agregar`}
                    component={
                        (match) => {
                            const form ={
                                nombre:"",
                                id_usuario:user.id,
                                descripcion:"",
                                cantidad_maxima:'',
                                maximo_personas:'',
                                scope:1
                            };

                            return (
                                <ValidationHandler form={form}
                                    sendRequest={ubicacionesHandlers.form.add}
                                    validation={validation}>
                                    <Formulario editar={false}
                                        data={props.data}
                                        toggleModal={openModal}
                                        changeView={changeView}
                                        nav={Navegacion.agregar('ubicaciones')}
                                        {...match} />
                                </ValidationHandler>
                            )
                        }
                    } />
                <Route  path={`${props.match.url}/:id`}
                        component={
                            (match) =>{
                                changeView.side = props.data.estado === 'Activo'
                                    ? 1
                                    : 2;
                                return (
                                    <VerUbicacion data={props.data}
                                        toggleModal={openModal}
                                        changeView={changeView}
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'ubicaciones')}
                                        {...match} />
                                )
                            }
                        } />
            </Switch>
        </>
    );
}
