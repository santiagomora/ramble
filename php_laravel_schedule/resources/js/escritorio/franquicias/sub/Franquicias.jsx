import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import Actions from '../../../app/componentes/basic/Actions';
import FranquiciasTable from '../../../app/componentes/tables/FranquiciasTable'

const links = (key) => [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-eye" />
                Ver
            </div>
        ),
        to: `/franquicias/${key}`,
        params:{id:key},
        route:'franquicias'
    },
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-pen" />
                Editar
            </div>
        ),
        to: `/franquicias/editar/${key}`,
        params:{id:key},
        route:'franquicias'
    },
    ,
    {
        title:(
            <div className="smaller-text text bold">
                <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
            </div>
        ),
        to:"/locales/agregar",
        params:{},
        route:'locales'
    }
];

export default function Franquicias (props) {
    const data = Object.keys(props.data).map(
        e => ({
            ...props.data[e],
            acciones: <Actions links={links(e)} buttons={[]} />
        })
    );
    return (
        <>
            <Titulo title="Franquicias"
                links={props.nav.links} />
            <div className="container">
                <div className="row">
                    <FranquiciasTable data={data}/>
                </div>
            </div>
        </>
    );
}
