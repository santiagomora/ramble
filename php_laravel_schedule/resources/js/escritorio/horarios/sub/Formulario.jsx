import React,
{
    Component,
    useState
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
     Text
} from '../../../app/componentes/input/Text';

export default function Formulario (props) {
    const   data = props.data,
            [side,toggle] = useState(props.fields.id_estado);
    if(props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo    title={
                    props.editar
                        ? `Editar horario del ${DAYS[parseInt(data.horarios.diaSemana) - 1]}`
                        : `Agregar horario al ${DAYS[parseInt(props.match.params.day) - 1]}`
                }
                links={props.nav.links}
                buttons={props.nav.buttons} />
            <div className="container">
                <div className="row v-padding">
                    <div className="col-lg-6 relative visible">
                        <div className={
                            side
                                ? "hidden"
                                : "top-padding full-width overlay"
                        } />
                        <SelectFields   editar = {props.editar}
                            data={data.horarios}
                            minutos={data.minutes}
                            fields={props.fields}
                            change={props.change}
                            errors={props.errors} />
                        <div className="h-padding">
                            <EventoFields   side={side}
                                editar={props.editar}
                                eventos={data.eventos}
                                class={{type:"horario",col:"col-md-12"}}
                                data={data.horarios}
                                fields={props.fields}
                                change={props.change}
                                errors={props.errors} />
                        </div>
                    </div>
                    <div className="col-lg-6 container">
                        <div className="row justify-content-end">
                            <Toggle rightTitle="Laboral"
                                leftTitle="No laboral"
                                name="estado"
                                side={side}
                                changeSide={toggle} />

                        </div>
                        <div className="h-padding row v-padding">
                            <Text rows={4}
                                titulo="Descripción"
                                holder="Descripción del día hasta 100 caracteres"
                                name="descripcion"
                                errors={props.errors.descripcion}
                                value={props.fields.descripcion}
                                changeHandler={props.change}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
