import ReactDOM from 'react-dom';
import React, {
    Component
} from 'react';

import {
    FormularioUsuario
} from '../../../app/form/FormularioUsuario';
import Titulo from '../../../app/componentes/basic/Titulo';

export default function Usuario (props) {
    return (
        <>
            <Titulo title="Configurar Usuario"
                links={props.nav.links} />
            <div className="container">
                <FormularioUsuario  data={props.data}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
            </div>
        </>
    );
}
