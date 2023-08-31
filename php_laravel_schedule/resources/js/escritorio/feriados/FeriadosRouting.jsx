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
    Navegacion,
    FormActions
} from '../../app/acciones/ActionsByView';
import ConfirmarModal from '../../app/componentes/modal/Modal';
import ValidationHandler from '../../app/hocs/ValidationHandler';

import Formulario from './sub/Formulario';
import Feriados from './sub/Feriados';
import VerFeriado from './sub/VerFeriado';
import validation from './validation';

export default function FeriadosRouting (props) {
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
            right:"no laboral",
            left:"laboral",
            change:() => false,
            side:1
        };
    return (
        <>
            <ConfirmarModal open={open}
                closeModal={closeModal}
                title={"Eliminar Feriado"}
                content={"¿estás seguro de eliminar este feriado?"} />
            <Route  path={props.match.url}
                exact
                render={
                    (match) =>
                        <Feriados data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('feriados')} {...match} />
                } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) => {
                            const feriado = props.data.feriados,
                                form ={
                                    nombre:                    feriado.nombre,
                                    fecha_feriado:             props.data.date,
                                    id_evento:                 Object.keys(props.data.eventos.list).join(','),
                                    apertura_reserva_hora:     feriado.apertura.reserva.hora,
                                    apertura_reserva_minuto:   feriado.apertura.reserva.minuto,
                                    cierre_reserva_hora:       feriado.cierre.reserva.hora,
                                    cierre_reserva_minuto:     feriado.cierre.reserva.minuto,
                                    apertura_atencion_hora:    feriado.apertura.atencion.hora,
                                    apertura_atencion_minuto:  feriado.apertura.atencion.minuto,
                                    cierre_atencion_hora:      feriado.cierre.atencion.hora,
                                    cierre_atencion_minuto:    feriado.cierre.atencion.minuto,
                                    descripcion:               props.data.descripcion||"",
                                    id_estado:                 feriado.estado === 'laboral'
                                };
                            changeView.side = form.id_estado ? 1 : 2;
                            return (
                                <ValidationHandler form={form}
                                    sendRequest={()=> false}
                                    validation={validation}>
                                    <Formulario data={props.data}
                                        toggleModal={openModal}
                                        formActions={FormActions()}
                                        editar={true}
                                        changeView={changeView}
                                        nav={
                                            Navegacion.formulario(
                                                ()=>false,
                                                match.match.params.id,
                                                'feriados'
                                            )
                                        }
                                        {...match} />
                                </ValidationHandler>
                            )
                        }
                    } />
                <Route  path={`${props.match.url}/agregar`}
                    component={
                        (match) => {
                            const form ={
                                fecha_feriado:             new Date(props.data.date),
                                nombre:                    "",
                                id_evento:                 "",
                                apertura_reserva_hora:     "",
                                apertura_reserva_minuto:   "",
                                cierre_reserva_hora:       "",
                                cierre_reserva_minuto:     "",
                                apertura_atencion_hora:    "",
                                apertura_atencion_minuto:  "",
                                cierre_atencion_hora:      "",
                                cierre_atencion_minuto:    "",
                                descripcion:               "",
                                id_estado:                 1
                            };
                            return (
                                <ValidationHandler form={form}
                                    sendRequest={()=> false}
                                    validation={validation}>
                                    <Formulario data={props.data}
                                        toggleModal={openModal}
                                        changeView={changeView}
                                        nav={Navegacion.agregar('feriados')}
                                        editar={false}
                                        {...match} />
                                </ValidationHandler>
                            )
                        }
                    } />
                <Route path={`${props.match.url}/:id`}
                    component={
                        (match) =>{
                            changeView.side = props.data.estado === 'Activo'
                                ? 1
                                : 2;
                            return (
                                <VerFeriado data={props.data}
                                    toggleModal={openModal}
                                    changeView={changeView}
                                    nav={
                                        Navegacion.singular(
                                            ()=>false,match.match.params.id,
                                            'feriados'
                                        )}
                                    {...match} />
                                );
                        }
                    }/>
            </Switch>
        </>
    );
}
