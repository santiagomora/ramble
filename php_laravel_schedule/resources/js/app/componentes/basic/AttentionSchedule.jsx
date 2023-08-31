/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {DAYS,MONTHS} from '../../constantes/DaysMonths';

const minuto = (min) => min < 10 ? `0${min}` : min;

export const generateHourString = ({
    apertura,
    cierre
}) => (apertura && cierre)
    ? ({
        atencion:`${apertura.atencion.hora}:${minuto(apertura.atencion.minuto)} - ${cierre.atencion.hora}:${minuto(cierre.atencion.minuto)}`,
        reservas:`${apertura.reserva.hora}:${minuto(apertura.reserva.minuto)} - ${cierre.reserva.hora}:${minuto(cierre.reserva.minuto)}`
    })
    : ({});

export default function AttentionSchedule (props){
    const fecha = props.displayDate,
        data = props.data,
        {atencion,reservas} = generateHourString(data),
        dspRes = props.displayQty
            ? "col-md-4"
            : "col-md-6";
    return (
        <>
            <div className={fecha ? "col-md-12 no-padding sub-title" : "hidden"}>
                {
                    props.displayDate
                    ?
                        <div className="highlight">
                            {
                                `${DAYS[fecha.getDay()]} ${fecha.getDate()} de ${MONTHS[fecha.getMonth()]} ${fecha.getFullYear()}`
                            }
                        </div>
                    :
                        <></>
                }
                {data.nombre||""}
            </div>
            <div className="col-md-12 container-fluid no-padding">
                <div className="row v-padding">
                    <div className={dspRes}>
                        <span className="m-font bold side-margin">
                            atención:
                        </span>
                        <span className="side-margin">
                            {`${atencion} horas`}
                        </span>
                    </div>
                    <div className={dspRes}>
                        <span className="m-font bold side-margin">
                            reservas:
                        </span>
                        <span className="side-margin">
                            {`${reservas} horas`}
                        </span>
                    </div>
                    <div className={props.displayQty ? `${dspRes} bold text-right` : "hidden"}>
                        {props.displayQty}
                    </div>
                </div>
            </div>
        </>
    );
}
