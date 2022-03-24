import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import Titulo from '../../../app/componentes/basic/Titulo';
import Actions from '../../../app/componentes/basic/Actions';
import {
    assignHorarios,
    createFeriadosList
} from '../../../app/utils/Helper';
import {
    Text
} from '../../../app/componentes/input/Text';
import {
    MultipleSelect
} from '../../../app/componentes/input/MultipleSelect';
import {
    Toggle
} from '../../../app/componentes/input/Toggle';

export default function Formulario (props) {
    const data = props.data.all,
        estado = props.fields.scope == 1,
        feriadoList = createFeriadosList(data.feriados.data);

    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;

    return (
        <>
            <Titulo title={
                    props.editar
                        ? props.fields.nombre
                        : "Agregar Evento"
                }
                links={props.nav.links}
                buttons={props.nav.buttons}
                changeView={props.changeView} />
            <div className="container-fluid">
                <div className="row relative visible">
                    <div className="col-md-6 container-fluid">
                        <div className="row">
                            <Text rows={1}
                                titulo="Nombre"
                                holder="Nombre del evento hasta 45 caracteres"
                                name="nombre"
                                value={props.fields.nombre}
                                changeHandler={props.change}
                                errors={props.errors.nombre}/>
                        </div>
                        <div className="row v-padding">
                            <Text rows={4}
                                titulo="Descripción"
                                holder="Descripción del evento hasta 100 caracteres"
                                name="descripcion"
                                value={props.fields.descripcion}
                                changeHandler={props.change}
                                errors={props.errors.descripcion}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={
                            estado
                                ? "hidden"
                                : "top-padding full-width overlay"
                            }/>
                        <h6 className="highlight m-font">
                            Horarios
                        </h6>
                        <MultipleSelect fieldName="Días de semana"
                            name="horarios"
                            titulo="Selecciona los horarios"
                            optionData={data.horarios.list}
                            errors={props.errors.horarios}
                            changeSelect={props.change}
                            selected ={props.fields.horarios}/>
                        <div className="v-padding">
                            <h6 className="highlight m-font">
                                Feriados
                            </h6>
                            <MultipleSelect fieldName="Feriados"
                                name="feriados"
                                titulo="Selecciona los feriados"
                                optionData={feriadoList}
                                errors={props.errors.feriados}
                                changeSelect={props.change}
                                selected ={props.fields.feriados}/>
                        </div>
                        <div className="v-padding">
                            <h6 className="highlight m-font">
                                Promociones
                            </h6>
                            <MultipleSelect fieldName="Promociones"
                                name="promociones"
                                titulo="Selecciona las promociones"
                                optionData={data.promociones.list}
                                errors={props.errors.promociones}
                                changeSelect={props.change}
                                selected ={props.fields.promociones}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
