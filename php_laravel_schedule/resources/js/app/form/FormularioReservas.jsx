import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Select } from '../componentes/input/Select';
import {Numeric} from '../componentes/input/Numeric';

const   minutos = {
            1: "1 minuto",
            2: "2 minutos",
            3: "3 minutos",
            5: "5 minutos",
            4: "4 minutos",
            6: "6 minutos",
            10: "10 minutos",
            12: "12 minutos",
            15: "15 minutos",
            20: "20 minutos",
            30: "30 minutos"
        },
        caida= {
            10: "10 minutos",
            20: "20 minutos",
            30: "30 minutos",
            40: "40 minutos",
            50: "50 minutos"
        },
        antelacion = {
            1: "1 horas",
            2: "2 horas",
            3: "3 horas",
            4: "4 horas",
            5: "5 horas",
            6: "6 horas",
            7: "7 horas",
            8: "8 horas",
            9: "9 horas",
            12: "12 horas",
            24: "24 horas",
            36: "36 horas"
        }


export const FormularioReservas = (props)  => {
    const select = {
        intervalo: {
            name: "intervalo_reserva",
            selected: props.fields.intervalo_reserva,
            list: minutos
        },
        caida: {
            name: "caida_reserva",
            selected: props.fields.caida_reserva,
            list: caida
        },
        antelacion: {
            name: "antelacion_reserva",
            selected: props.fields.antelacion_reserva,
            list: antelacion
        }
    };

    return (
        <>
            <div className="row v-padding">
                <div className="col-md-6">
                    <h6 className="highlight no-margin m-font">
                        Antelación de la reserva
                    </h6>
                    <Select titulo="Selecciona la antelación de las reservas"
                        changeSelect={props.change}
                        errors={props.errors.antelacion_reserva}
                        {...select.antelacion}/>
                    <span className="smaller-text">
                        El mínimo de horas que el usuario debe esperar antes de hacer la reservación (si la suma de esta y la hora actual excede el cierre de reservas actual, el usuario tendrá que reservar el próximo día)
                    </span>
                </div>
                <div className="col-md-6">
                    <h6 className="highlight no-margin m-font">
                        Intervalo de la reserva
                    </h6>
                    <Select titulo="Selecciona la antelación de las reservas"
                        changeSelect={props.change}
                        errors={props.errors.intervalo_reserva}
                        {...select.intervalo}/>
                    <span className="smaller-text">
                        El espacio temporal entre los minutos disponibles para hacer la reserva en una hora.
                    </span>
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <h6 className="highlight no-margin m-font">
                        Caída de la reserva
                    </h6>
                    <Select titulo="Selecciona la antelación de las reservas"
                        changeSelect={props.change}
                        errors={props.errors.caida_reserva}
                        {...select.caida}/>
                    <span className="smaller-text">
                        La cantidad de minutos que pasarán desde la hora de la reserva para que se considere como inválida
                    </span>
                </div>
                <div className="col-md-6">
                    <Numeric  titulo="Disponibilidad de reservas"
                        name="disponibilidad_reserva"
                        holder="Puedes elegir hasta 60 días como máximo"
                        value={props.fields.disponibilidad_reserva}
                        changeHandler={props.change}
                        errors={props.errors.disponibilidad_reserva}/>
                    <span className="smaller-text">
                        La cantidad de días a partir de la fecha actual, disponibles para hacer la reserva.
                    </span>
                </div>
            </div>
        </>
    )
}
