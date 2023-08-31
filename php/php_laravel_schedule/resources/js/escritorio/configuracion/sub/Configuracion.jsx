import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import generateConfigurationCards from '../../../app/generators/configuracionGenerator';

export default function Configuracion (props) {
    const configuracion = generateConfigurationCards(
        props.data
    );
    return (
        <>
            <Titulo title="Configuración"/>
            <ul className="full-width nav-list no-padding">
                {
                    configuracion.map(
                        (elem, index) =>
                            <li key={index} className={elem.class}><elem.content /></li>
                    )
                }
            </ul>
        </>
    );
}
