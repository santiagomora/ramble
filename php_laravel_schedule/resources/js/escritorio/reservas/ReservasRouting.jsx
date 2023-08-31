import React,
{
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';

import {
    calculateOffset,
    checkValid
} from '../../reserva/pasos/evento/Handlers';
import {
    Navegacion
} from '../../app/acciones/ActionsByView';
import ValidationHandler from '../../app/hocs/ValidationHandler';

import Formulario from './sub/Formulario';
import Calendario from './sub/Calendario';
import VerReserva from './sub/VerReserva';
import validation from './validation';


const ReservasRouting = (props) => (
    <>
        <Route path={props.match.url}
            exact
            render={
                (match) => {
                    return (
                        <Calendario data={props.data}
                            nav={Navegacion.listado('reservas')} {...match}/>
                    )
                }
            } />
        <Switch>
            <Route path={`${props.match.url}/agregar`}
                render={
                    (match) => {
                        const data = props.data.data,
                            ndate = new Date(),
                            currentData =   data.feriados.data[ndate.getDate()]
                                ? data.feriados.data[ndate.getDate()]
                                : data.horarios.data[ndate.getDay()+1],
                            min = calculateOffset(
                                data.antelacion,
                                ndate,
                                currentData
                            ),
                            date = checkValid({
                                date: new Date(min),
                                min: min,
                                horarios:data.horarios.data,
                                feriados:data.feriados.data
                            }),
                            form ={
                                fecha_reserva: (props.location.state||{}).date
                                    ? props.location.state.date
                                    :  date,
                                min_fecha: min,
                                id_ubicacion:"",
                                id_evento:"",
                                id_promocion:"",
                                hora_reserva:"",
                                minuto_reserva:"",
                                cantidad_personas:"",
                                nombre:"",
                                apellido:"",
                                email:"",
                                telefono:"",
                                descripcion_evento:""
                            };
                        return (
                            <ValidationHandler form={form}
                                sendRequest={()=> false}
                                validation={validation}>
                                <Formulario data={props.data}
                                    nav={Navegacion.agregar('reservas')} {...match}/>
                            </ValidationHandler>
                        );
                    }
            } />
            <Route  path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerReserva data={props.data}
                                nav={
                                    Navegacion.singular(
                                        ()=>false,
                                        match.match.params.id,
                                        'reservas'
                                    )
                                } {...match}/>
                    } />
        </Switch>
    </>
)

export default ReservasRouting;
