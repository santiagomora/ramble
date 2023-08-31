import ReactDOM from 'react-dom';
import React, {
    Component,
    useState
} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import {
    Navegacion
} from '../../app/acciones/ActionsByView';
import ConfirmarModal from '../../app/componentes/modal/Modal';
import ValidationHandler from '../../app/hocs/ValidationHandler';
import {
    promocionesHandlers
} from '../../app/handlers/sub/promocionesHandlers';

import Formulario from './sub/Formulario';
import Promociones from './sub/Promociones';
import VerPromocion from './sub/VerPromocion';
import validation from './validation';

export default function PromocionesRouting (props) {
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
                title={"Eliminar Promoción"}
                content={"¿estás seguro de eliminar este promoción?"} />
            <Route path={props.match.url}
                exact
                component={
                    (match) =>
                        <Promociones data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('promociones')}/>
                }/>
            <Switch>
                <Route path={`${props.match.url}/editar/:id`}
                    exact
                    component={
                        (match) => {
                            const selected = props.data.selected,
                                fields = {
                                    id:selected.id,
                                    id_usuario:user.id,
                                    eventos:Object.keys(selected.eventos.list).join(','),
                                    descuento:selected.descuento,
                                    descripcion:selected.descripcion,
                                    nombre:selected.nombre,
                                    scope: selected.estado === 'Activo' ? 1 : 2
                                };
                                changeView.side = fields.scope;
                            return (
                                <ValidationHandler form={fields}
                                    sendRequest={promocionesHandlers.form.edit}
                                    validation={validation}>
                                    <Formulario data={props.data}
                                        editar={true}
                                        toggleModal={openModal}
                                        changeView={changeView}
                                        nav={Navegacion.formulario(()=>false,match.match.params.id,'promociones')} {...match} />
                                </ValidationHandler>
                            )
                        }
                    }/>
                <Route path={`${props.match.url}/agregar`}
                    component={
                        (match) => {
                            const fields = {
                                id_usuario:user.id,
                                eventos:'',
                                descuento:'',
                                descripcion:'',
                                nombre:'',
                                scope: 1
                            };
                            return (
                                <ValidationHandler form={fields}
                                    sendRequest={promocionesHandlers.form.add}
                                    validation={validation}>
                                    <Formulario data={{all:props.data}}
                                        editar={false}
                                        changeView={changeView}
                                        toggleModal={openModal}
                                        nav={Navegacion.agregar('promociones')} {...match} />
                                </ValidationHandler>
                            )
                        }
                    }/>
                <Route path={`${props.match.url}/:id`}
                    component={
                            (match) => {
                                changeView.side = props.data.estado === 'Activo'
                                    ? 1
                                    : 2;
                                return (
                                    <VerPromocion data={props.data}
                                        changeView={changeView}
                                        toggleModal={openModal}
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'promociones')}
                                        {...match} />
                                )
                            }
                    }
                    />
            </Switch>
        </>
    );
}
