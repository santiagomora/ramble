/**
 * react basic
 */
import React, {
    Component,
    useContext,
    useEffect,
    useState
} from 'react';
import ReactDOM from 'react-dom';

import EventoFrame from '../../../reserva/pasos/evento/EventoFrame';
import Titulo from '../../../app/componentes/basic/Titulo';
import {
    WaitsLoading
} from '../../../app/hocs/DataHandler';

export default function Formulario (props) {
    const   context = useContext(WaitsLoading),
            data = props.data,
            fecha = new Date(props.fields.fecha_reserva),
            currentData = data.data.feriados.data[fecha.getDate()]
                ? data.data.feriados.data[fecha.getDate()]
                : data.data.horarios.data[fecha.getDay()+1];
    return (
        <>
            <Titulo title='Agregar Reservación'
                links={props.nav.links} />
            <div className="container-fluid">
                <div className="row">
                    <EventoFrame  displayTitles={false}
                        current={true}
                        fecha={fecha}
                        minDate={props.fields.min_fecha}
                        fetch = {context}
                        data={data}
                        current={currentData}
                        location={props.location}
                        fields={props.fields}
                        change={props.change}
                        errors={props.errors}/>
                </div>
            </div>
        </>
    );
}
