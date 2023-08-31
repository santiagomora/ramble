/**
 * react basic
 */
import React, {
    Component,
    useState,
    useEffect
} from 'react';
import {
    DAYS,
    MONTHS,
    HOURS
} from '../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import {Select} from '../componentes/input/Select';
import {Text} from '../componentes/input/Text';

export const SelectFields = (props) => {
    const   fields = props.fields,
            select = {
                apertura_reserva_hora: {
                    name: "apertura_reserva_hora",
                    selected: fields.apertura_reserva_hora,
                    list: HOURS
                },
                apertura_reserva_minuto: {
                    name: "apertura_reserva_minuto",
                    selected: fields.apertura_reserva_minuto,
                    list: props.minutos
                },
                cierre_reserva_hora: {
                    name: "cierre_reserva_hora",
                    selected: fields.cierre_reserva_hora,
                    list: HOURS,
                },
                cierre_reserva_minuto: {
                    name: "cierre_reserva_minuto",
                    selected: fields.cierre_reserva_minuto,
                    list: props.minutos
                },
                apertura_atencion_hora: {
                    name: "apertura_atencion_hora",
                    selected: fields.apertura_atencion_hora,
                    list: HOURS
                },
                apertura_atencion_minuto: {
                    name: "apertura_atencion_minuto",
                    selected: fields.apertura_atencion_minuto,
                    list: props.minutos
                },
                cierre_atencion_hora: {
                    name: "cierre_atencion_hora",
                    selected: fields.cierre_atencion_hora,
                    list: HOURS
                },
                cierre_atencion_minuto: {
                    name: "cierre_atencion_minuto",
                    selected: fields.cierre_atencion_minuto,
                    list: props.minutos
                }
            };
    return (
        <>
            {
                props.type==='feriado'
                ?
                    <div className='col-md-12' style={{padding:"10px 0 0 0"}}>
                        <Text rows={1}
                            titulo="Nombre"
                            name="nombre"
                            holder="Nombre del feriado hasta 50 caracteres"
                            errors={props.errors.nombre}
                            value={props.fields.nombre}
                            changeHandler={props.change}/>
                    </div>
                :
                    ""
            }
            <div className="col-md-12 container top-padding">
                <div className="m-font light-danger full-width row">
                    Horario de Reserva
                </div>
                <div className="row">
                    <div className="col-md-12 container no-padding">
                        <div className="row">
                            <div className="col-md-6 container">
                                <div className="row">
                                    <div className="col-md-12">
                                        Apertura
                                    </div>
                                    <div className="col-sm-5 text-left">
                                         <Select titulo="Hora"
                                                 changeSelect={props.change}
                                                 errors={props.errors.apertura_reserva_hora}
                                                 {...select.apertura_reserva_hora}/>
                                    </div>
                                    <div className="col-sm-2 text-center v-align-center h-padding">
                                        <h6 className="c-title"
                                            style={{ color: "#bfbfbf" }}>
                                            :
                                        </h6>
                                    </div>
                                    <div className="col-sm-5 text-left relative visible">
                                        <Select titulo="Minuto"
                                                changeSelect={props.change}
                                                errors={props.errors.apertura_reserva_minuto}
                                                {...select.apertura_reserva_minuto}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 container">
                                <div className="row">
                                    <div className="col-md-12">
                                        Cierre
                                    </div>
                                    <div className="col-sm-5 text-left">
                                        <Select titulo="Hora"
                                                changeSelect={props.change}
                                                errors={props.errors.cierre_reserva_hora}
                                                {...select.cierre_reserva_hora}/>
                                    </div>
                                    <div className="col-sm-2 text-center v-align-center">
                                        <h6 className="c-title"
                                            style={{ color: "#bfbfbf" }}>
                                            :
                                        </h6>
                                    </div>
                                    <div className="col-md-5 text-left relative visible">
                                        <Select titulo="Minutos"
                                                changeSelect={props.change}
                                                errors={props.errors.cierre_reserva_minuto}
                                                {...select.cierre_reserva_minuto}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="m-font light-danger full-width">
                        Horario de Atención
                    </div>
                    <div className="col-md-12 container no-padding">
                        <div className="row">
                            <div className="col-md-6 container">
                                <div className="row">
                                    <div className="col-md-12 ">
                                    Apertura
                                    </div>
                                    <div className="col-sm-5 text-left">
                                        <Select titulo="Hora"
                                                changeSelect={props.change}
                                                errors={props.errors.apertura_atencion_hora}
                                                {...select.apertura_atencion_hora}/>
                                    </div>
                                    <div className="col-sm-2 text-center v-align-center h-padding">
                                        <h6 className="c-title"
                                            style={{ color: "#bfbfbf" }}>
                                            :
                                        </h6>
                                    </div>
                                    <div className="col-sm-5 text-left">
                                        <Select titulo="Minutos"
                                                changeSelect={props.change}
                                                errors={props.errors.apertura_atencion_minuto}
                                                {...select.apertura_atencion_minuto}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 container">
                                <div className="row">
                                    <div className="col-md-12">
                                        Cierre
                                    </div>
                                    <div    className="col-sm-5 text-left">
                                        <Select titulo="Horas"
                                                changeSelect={props.change}
                                                errors={props.errors.cierre_atencion_hora}
                                                {...select.cierre_atencion_hora}/>
                                    </div>
                                    <div className="col-sm-2 text-center v-align-center h-padding">
                                        <h6 className="c-title"
                                            style={{ color: "#bfbfbf" }}>
                                            :
                                        </h6>
                                    </div>
                                    <div className="col-sm-5 text-left relative visible">
                                        <Select titulo="Minutos"
                                                changeSelect={props.change}
                                                errors={props.errors.cierre_atencion_minuto}
                                                {...select.cierre_atencion_minuto}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
