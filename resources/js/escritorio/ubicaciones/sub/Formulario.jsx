import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
    Numeric
} from '../../../app/componentes/input/Numeric';
import {
    Text
} from '../../../app/componentes/input/Text';
import {
    Toggle
} from '../../../app/componentes/input/Toggle';

export default function Formulario (props) {
    const estado = props.fields.scope == 1;
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    const data = props.data||{};
    return (
        <>
            <Titulo title={
                    props.editar
                        ? props.fields.nombre
                        : "Agregar ubicación"
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
                    <div className="col-md-4 bold">
                        <div className="sidebar-box">
                            <img className="img-responsive"
                                src={props.fields.foto}
                                alt="ubicacion foto"
                                style={{width:"100%",height:"auto"}}/>
                        </div>
                    </div>
                    <div className="col-md-7 container">
                        <div className="row">
                            <Text rows={1}
                                titulo="Nombre"
                                holder="Nombre de la ubicación hasta 45 caracteres"
                                name="nombre"
                                value={props.fields.nombre}
                                changeHandler={props.change}
                                errors={props.errors.nombre}/>
                        </div>
                        <div className="row top-padding">
                            <Numeric titulo="Capacidad máxima"
                                name="cantidad_maxima"
                                description={
                                    <span className="light-text smaller-text">
                                        Máximo de personas en la ubicación
                                    </span>
                                }
                                holder="Máximo de personas en la ubicación"
                                value={props.fields.cantidad_maxima}
                                changeHandler={props.change}
                                errors={props.errors.cantidad_maxima}/>
                        </div>
                        <div className="row top-padding">
                            <Numeric titulo="Máximo personas"
                                name="maximo_personas"
                                description={
                                    <span className="light-text smaller-text">
                                        Máximo de personas en una reservación
                                    </span>
                                }
                                holder="Máximo de personas en una reservación"
                                value={props.fields.maximo_personas}
                                changeHandler={props.change}
                                errors={props.errors.maximo_personas}/>
                        </div>
                        <div className="row v-padding" style={{paddingBottom:"20px"}}>
                            <Text rows={4}
                                titulo="Descripcion"
                                name="descripcion"
                                holder="Breve descripción de la ubicación hasta 50 caracteres"
                                value={props.fields.descripcion}
                                changeHandler={props.change}
                                errors={props.errors.descripcion}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
