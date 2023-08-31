import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import UbicacionesTable from '../../../app/componentes/tables/UbicacionesTable';

export default function Ubicaciones (props) {
    const data = Object.values(props.data);
    return (
        <>
            <Titulo title="Ubicaciones"
                links={props.nav.links}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="m-font">
                        {`Mostrando ${data.length} ubicaciones encontradas`}
                    </div>
                    <UbicacionesTable actions={{eliminar:props.toggleModal}}
                        data={data}/>
                </div>
            </div>
        </>
    );
}
