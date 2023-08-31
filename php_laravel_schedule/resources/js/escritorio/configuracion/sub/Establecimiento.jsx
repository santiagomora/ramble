/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import {
    FormularioEstablecimiento
} from '../../../app/form/FormularioEstablecimiento';
import Titulo from '../../../app/componentes/basic/Titulo';
import Actions from '../../../app/componentes/basic/Actions';

export default function Establecimiento (props) {
    return (
        <>
            <Titulo title="Configurar Establecimiento"
                links={props.nav.links} />
            <div className="container">
                <FormularioEstablecimiento  data={props.data}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
            </div>
        </>
    );
}
