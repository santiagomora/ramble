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
import { MultipleSelect } from '../componentes/input/MultipleSelect';

export const EventoFields = (props) => {
    return (
        <>
            <div className='row relative visible v-padding'>
                <div className={
                    props.side
                        ? "hidden"
                        : "top-padding full-width overlay"
                } />
                <div className="m-font light-danger full-width">
                    Eventos
                </div>
                <div className="col-md-12 no-padding">
                    <MultipleSelect fieldName={"Eventos"}
                                    name='id_evento'
                                    titulo="Selecciona los eventos"
                                    optionData={props.eventos.list}
                                    errors={props.errors.id_evento}
                                    changeSelect={props.change}
                                    selected={props.fields.id_evento}/>
                </div>
            </div>
        </>
    );
}
