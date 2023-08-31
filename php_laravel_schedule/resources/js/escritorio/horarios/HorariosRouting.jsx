import ReactDOM from 'react-dom';
import React,
{
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
import Horarios from './sub/Horarios';
import VerHorario from './sub/VerHorario';
import validation from './validation'

export default function HorariosRouting (props) {
    const   [open,toggle] = useState(false),
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
                title={"Eliminar Horario"}
                content={"¿estás seguro de eliminar este horario?"} />
            <Route path={props.match.url}
                exact
                component={
                    (match) =>
                        <Horarios   data={props.data}
                                    toggleModal={openModal} {...match}/>
                } />
            <Switch>
                <Route path={`${props.match.url}/agregar/:day`}
                    component={
                        (match) => {
                            const form ={
                                id_dia_semana:             match.match.params.day,
                                id:                        "",
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
                                id_estado:                 true
                            };
                            return (
                                <ValidationHandler form={form}
                                    sendRequest={()=> false}
                                    validation={validation}>
                                    <Formulario editar={false}
                                        data={props.data}
                                        nav={Navegacion.agregar('horarios')}
                                        formActions={FormActions()} {...match} />
                                </ValidationHandler>
                            )
                        }
                }/>
                <Route path={`${props.match.url}/editar/:id`}
                    component={
                        (match) => {
                            const   horarios = props.data.horarios,
                                form ={
                                    id:                        match.match.params.id,
                                    id_dia_semana:             horarios.diaSemana,
                                    id_evento:                 Object.keys(props.data.eventos.list).join(','),
                                    apertura_reserva_hora:     horarios.apertura.reserva.hora,
                                    apertura_reserva_minuto:   horarios.apertura.reserva.minuto,
                                    cierre_reserva_hora:       horarios.cierre.reserva.hora,
                                    cierre_reserva_minuto:     horarios.cierre.reserva.minuto,
                                    apertura_atencion_hora:    horarios.apertura.atencion.hora,
                                    apertura_atencion_minuto:  horarios.apertura.atencion.minuto,
                                    cierre_atencion_hora:      horarios.cierre.atencion.hora,
                                    cierre_atencion_minuto:    horarios.cierre.atencion.minuto,
                                    descripcion:               props.data.descripcion||"",
                                    id_estado:                 props.data.horarios.estado === 'laboral'
                                };
                            return (
                                <ValidationHandler  form={form}
                                                    sendRequest={()=> false}
                                                    validation={validation}>
                                    <Formulario data={props.data}
                                                toggleModal={openModal}
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'horarios')}
                                                formActions={FormActions()}
                                                editar={true}/>
                                </ValidationHandler>
                            )
                        }
                }/>
                <Route path={`${props.match.url}/:id`}
                    component={
                        (match) =>(
                            <VerHorario data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'horarios')}
                                formActions={FormActions()}
                                {...props} />
                        )
                }/>
            </Switch>
        </>
    )
}
