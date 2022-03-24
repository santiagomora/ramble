import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';

import  Titulo from '../../../app/componentes/basic/Titulo';
import {
     MultipleSelect
 } from '../../../app/componentes/input/MultipleSelect';
import {
     Numeric
 } from '../../../app/componentes/input/Numeric';
import {
     Text
 } from '../../../app/componentes/input/Text';
import {
    Toggle
} from '../../../app/componentes/input/Toggle'

export default function Formulario (props) {
    const estado = props.fields.scope == 1;
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo title={
                    props.editar
                        ? props.fields.nombre
                        : "Agregar Promoción"
                }
                links={props.nav.links}
                buttons={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="container-fluid">
                <div className="row relative visible top-padding">
                    <div className={
                        estado
                        ? "hidden"
                        : "top-padding full-width overlay"
                    }/>
                    <div className="col-md-6">
                        <Text rows={1}
                            titulo="Nombre"
                            holder="Nombre de la ubicación hasta 45 caracteres"
                            name="nombre"
                            value={props.fields.nombre}
                            changeHandler={props.change}
                            errors={props.errors.nombre}/>
                        <div className="top-padding">
                        <Text rows={3}
                            titulo="Descripción"
                            holder="Breve descripción de la promoción hasta 45 caracteres"
                            name="descripcion"
                            value={props.fields.descripcion}
                            changeHandler={props.change}
                            errors={props.errors.descripcion}/>
                        </div>
                        <div className="top-padding">
                            <Numeric titulo="Descuento"
                                name="descuento"
                                holder="Descuento de la promoción hasta 100%"
                                value={props.fields.descuento}
                                changeHandler={props.change}
                                errors={props.errors.descuento}/>
                        </div>
                    </div>
                    <div className="col-md-6 top-padding">
                        <div>
                            <h6 className="highlight no-margin mid-font">
                                Eventos
                            </h6>
                            <MultipleSelect fieldName={"Eventos"}
                                name="eventos"
                                titulo="Selecciona los eventos"
                                optionData={props.data.all.eventos.list}
                                errors={props.errors.id_evento}
                                changeSelect={props.change}
                                selected={props.fields.eventos}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
