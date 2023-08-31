
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import Actions from '../../../app/componentes/basic/Actions';
import {
    FormularioEstablecimiento
} from '../../../app/form/FormularioEstablecimiento';
import {
    FormularioUsuario
} from '../../../app/form/FormularioUsuario';

export default function Formulario (props) {
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    const data = props.data;
    return (
        <>
            <Titulo title={
                    props.editar
                    ? data.nombre
                    : "Agregar franquicia"
                }
                links={props.nav.links}
                buttons={props.nav.buttons} />
            <div className="container">
                <FormularioEstablecimiento  userType="Franquicia"
                    data={data}
                    isFranquicia
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
                <FormularioUsuario  data={data}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
            </div>
        </>
    )
}
