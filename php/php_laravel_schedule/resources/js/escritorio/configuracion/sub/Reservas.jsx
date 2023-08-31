import ReactDOM from 'react-dom';
import React, {
    Component
} from 'react';

import {
    FormularioReservas
} from '../../../app/form/FormularioReservas';
import Titulo from '../../../app/componentes/basic/Titulo';

export default function Reservas (props) {
    return (
        <>
            <Titulo title="Configurar Reservas"
                links={props.nav.links} />
            <div className="container">
                <FormularioReservas data ={props.data}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
            </div>
        </>
    );
}
