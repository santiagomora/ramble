import React, {
    Component,
    useState,
    useContext
} from 'react';
import ReactDOM from 'react-dom';

import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import {
    Calendario
} from '../../../app/form/Calendario';
import {
    SelectFields
} from '../../../app/form/SelectFields';
import {
    EventoFields
} from '../../../app/form/EventoFields';
import Titulo from '../../../app/componentes/basic/Titulo';
import {
    Toggle
} from '../../../app/componentes/input/Toggle';
import Actions from '../../../app/componentes/basic/Actions';
import {
    generateHoursFromInterval
} from '../../../app/utils/Helper';
import {
    WaitsLoading
} from '../../../app/hocs/DataHandler';
import {
    Text
} from '../../../app/componentes/input/Text';

export default function Formulario (props) {
    const   context = useContext(WaitsLoading),
        [side,toggle] = useState(props.fields.id_estado),
        data = props.data;
    let fecha = new Date(props.fields.fecha_feriado),
        fstring = `${DAYS[fecha.getDay()]}, ${fecha.getDate()} de ${MONTHS[fecha.getMonth()]} de ${fecha.getFullYear()}`;
    if (props.editar)
        props.nav.buttons[0].click = toggle;
    return (
        <>
            <Titulo title={
                props.editar
                    ? props.fields.nombre
                    : "Agregar Feriado"
                }
                links={props.nav.links}
                buttons={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="container-fluid">
                <div className="row v-padding">
                    <div className="col-md-6">
                        <Calendario editar={props.editar}
                            date={props.fields.fecha_feriado}
                            data={data}
                            change={props.change}
                            fetch={context}/>
                        <div className="bold smaller-text v-padding margin-box">
                            * Los días inhabilitados ya tienen feriados asignados
                        </div>
                        <div className="h-padding v-padding">
                            <Text rows={4}
                                titulo="Descripción"
                                holder="Descripción del día hasta 100 caracteres"
                                name="descripcion"
                                errors={props.errors.descripcion}
                                value={props.fields.descripcion}
                                changeHandler={props.change}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="container">
                            <div className="row relative visible ">
                                <div className="bold sub-title">
                                    {fstring}
                                </div>
                                <div className={
                                    side
                                        ? "hidden"
                                        : "top-padding full-width overlay"
                                    }/>
                                <SelectFields editar ={props.editar}
                                    data={data.feriados}
                                    minutos = {data.minutes}
                                    fields={props.fields}
                                    change={props.change}
                                    errors={props.errors}
                                    type='feriado'/>
                            </div>
                            <EventoFields   side={side}
                                editar = {props.editar}
                                eventos={data.eventos}
                                data={data.feriados}
                                fields={props.fields}
                                change={props.change}
                                errors={props.errors}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
