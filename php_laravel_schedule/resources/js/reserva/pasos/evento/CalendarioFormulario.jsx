import React, {
    Component,
    useState,
    useEffect
} from 'react';
import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import Promociones from './Promociones';
import {
    generateListByLocationCapacity
} from './Handlers';

import {
    Select
} from "../../../app/componentes/input/Select.jsx";
import {
    Text
} from "../../../app/componentes/input/Text.jsx";

function CalendarioFormulario(props) {
    const fields = props.fields,
        ubicacion = props.ubicaciones.data[props.fields.id_ubicacion] || null,
        personas = ubicacion ? generateListByLocationCapacity(ubicacion.maximo+1) : {},
        eventos = props.currentData.eventos,
        promociones = props.fields.id_evento ? eventos.data[fields.id_evento].promociones.data : null,
        select = {
            id_ubicacion:{
                name:"id_ubicacion",
                selected: fields.id_ubicacion,
                list: props.ubicaciones.list
            },
            id_evento: {
                name: "id_evento",
                selected: fields.id_evento,
                list: eventos.list
            },
            hora_reserva: {
                name: "hora_reserva",
                selected: fields.hora_reserva,
                list: props.horario.hList||{}
            },
            minuto_reserva: {
                name: "minuto_reserva",
                selected: fields.minuto_reserva,
                list: props.horario.hourArray[props.fields.hora_reserva]||{}
            },
            cantidad_personas: {
                name: "cantidad_personas",
                selected: fields.cantidad_personas,
                list:personas
            }
        };
    return (
        <div className="container-fluid">
            <div className="row box-padding">
                <h3 className={
                    props.displayTitles
                        ? "bold highlight-title align-center"
                        : "hidden"
                    }>
                    datos de contacto
                </h3>
            </div>
            <div className="row h-padding">
                <h6 className="highlight m-font no-margin">
                    Hora de reserva
                </h6>
                <span   className="side-margin row smaller-text h-padding inline-block"
                        style={{verticalAlign:"bottom"}}>
                    {`${DAYS[props.date.getDay()]}, ${props.date.getDate()} de ${MONTHS[props.date.getMonth()]} del ${props.date.getFullYear()}`}
                </span>
            </div>
            <div className="row box-padding">
                <div    className="col-sm-5 h-padding text-left"
                        style={{paddingLeft:"0px"}}>
                    <Select titulo="Hora"
                            changeSelect={props.change}
                            errors={props.errors.hora_reserva}
                            {...select.hora_reserva}/>
                </div>
                <div className="col-sm-1 text-center v-align-center h-padding">
                    <h6 className="c-title"
                        style={{ color: "#bfbfbf" }}>:</h6>
                </div>
                <div className="col-md-6 text-left relative visible h-padding">
                    <div className={
                        select.hora_reserva.selected
                        ? "hidden"
                        : "top-padding full-width overlay"
                    }/>
                    <Select titulo="Minutos"
                            changeSelect={props.change}
                            errors={props.errors.minuto_reserva}
                            readOnly={select.hora_reserva.selected ? true : false}
                            {...select.minuto_reserva}/>
                </div>
            </div>

            <div className="row v-padding">
                <div className="col-md-4">
                    <Text   rows={1}
                            titulo="Nombre"
                            name="nombre"
                            holder="Nombre del solicitante hasta 100 caracteres"
                            value={props.fields.nombre}
                            changeHandler={props.change}
                            errors={props.errors.nombre}/>
                </div>
                <div className="col-md-4">
                    <Text   rows={1}
                            titulo="Apellido"
                            name="apellido"
                            holder="Apellido del solicitante hasta 100 caracteres"
                            value={props.fields.apellido}
                            changeHandler={props.change}
                            errors={props.errors.apellido} />
                </div>
                <div className="col-sm-4">
                    <Text   rows={1}
                            titulo="Correo electrónico"
                            name="email"
                            holder="Email del solicitante hasta 100 caracteres"
                            value={props.fields.email}
                            changeHandler={props.change}
                            errors={props.errors.email}/>
                </div>
            </div>
            <div className="row v-padding full-width">
                <div className="col-md-6">
                    <Text   rows={1}
                            titulo="Teléfono"
                            name="telefono"
                            holder="Teléfono del solicitante hasta 20 caracteres"
                            value={props.fields.telefono}
                            changeHandler={props.change}
                            errors={props.errors.telefono}/>
                </div>
                <div className="col-md-6">
                    <Text   rows={3}
                            titulo="Observaciones"
                            name="descripcion_evento"
                            holder="Observaciones de la reserva (alguna petición extra o algo que quieras dejar claro)"
                            value={props.fields.descripcion}
                            changeHandler={props.change}
                            errors={props.errors.descripcion_evento}/>
                </div>
            </div>
            <div className="row top-padding">
                <div className=" col-md-3">
                    <i className="line-v-middle fas fa-angle-left highlight-title" />
                    <div className="text-left right-padding">
                        foto relacionada <br />a la ubicacion
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <h6 className="highlight m-font no-margin">
                                Ubicación
                            </h6>
                            <Select changeSelect={props.change}
                                    titulo="Selecciona la ubicación"
                                    errors={props.errors.id_ubicacion}
                                    {...select.id_ubicacion}/>
                        </div>
                        <div className="col-md-6 text-left flex-row relative visible">
                            <div className={
                                select.id_ubicacion.selected
                                ?
                                    "hidden"
                                :
                                    "top-padding full-width overlay"}/>
                            <div className="full-width">
                                <h6 className="highlight m-font no-margin">
                                    Personas
                                </h6>
                                <Select changeSelect={props.change}
                                        titulo="Selecciona la cantidad de personas"
                                        readOnly={select.id_ubicacion.selected ? true : false}
                                        errors={props.errors.cantidad_personas}
                                        {...select.cantidad_personas}/>
                                <div className="smaller-text">
                                    {
                                        select.id_ubicacion.selected
                                        ?
                                            "Máximo " + ubicacion.maximo + " personas para " + ubicacion.nombre
                                        :
                                            "Debes seleccionar una ubicación"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6 no-padding">
                            <div className="container">
                                <div className="row text-left">
                                    <div className="col-md-12">
                                        <h6 className="highlight m-font no-margin">
                                            Ocasión
                                        </h6>
                                        <Select changeSelect={props.change}
                                                titulo="Selecciona tipo de evento de tu reserva"
                                                errors={props.errors.id_evento}
                                                {...select.id_evento}/>
                                        {
                                            select.id_evento.selected
                                                ?
                                                <div className="smaller-text">
                                                    <div>{"Descripcion: " + eventos.data[select.id_evento.selected].descripcion}</div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-left">
                            {
                                promociones
                                    ?
                                    <ul className="no-padding nav-list full-width">
                                        {
                                            Object.values(promociones).map(
                                                (p, i) =>
                                                    <li key={i}
                                                        className="full-width border-button">
                                                        <div className="inline-block v-align-center">
                                                            <input  type="radio"
                                                                    name="id_promocion"
                                                                    value={props.fields.id_promocion} />
                                                        </div>
                                                        <div className="inline-block">
                                                            <div className="bold">
                                                                {p.nombre}
                                                            </div>
                                                            <div className="smaller-text">
                                                                {p.descripcion}
                                                            </div>
                                                            <div className="text-right smaller-text bold">
                                                                {
                                                                    p.descuento !== 0
                                                                        ? `${p.descuento}% de descuento`
                                                                        :"sin descuento"
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                            )
                                        }
                                    </ul>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CalendarioFormulario);
