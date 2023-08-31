/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
    assignHorarios,
    createFeriadosList
} from '../../../app/utils/Helper';
import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import PromocionesTable from '../../../app/componentes/tables/PromocionesTable';

export default function VerEvento (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data,
        promociones = Object.values(data.promociones.data).map(
            e => ({
                ...e,
                nombre:(
                    <Link to={`/promociones/${e.id}`}>
                        <span className="text">
                            {e.nombre}
                        </span>
                    </Link>
                )
            })
        ),
        horarios = Object.values(data.horarios.list),
        feriados = createFeriadosList(data.feriados.data);
    return (
        <>
            <Titulo title={data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}
                changeView={props.changeView}/>
            <div className="row col-md-12">
                <div className="mid-title">
                    Promociones
                </div>
                {
                    promociones.length>0
                    ?
                        <PromocionesTable data={promociones}/>
                    :
                        <div className="bold h-padding">
                            No hay promociones asociadas
                        </div>
                }
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <div className="m-font highlight">
                        Descripción:
                    </div>
                    <div style={{wordBreak:"break-word"}}>
                        {data.descripcion}
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
                        <h6 className="highlight m-font v-padding">
                            Horarios
                        </h6>
                        {
                            horarios.length>0
                            ?
                                <ul className="nav-list no-padding">
                                    <CommaList list={assignHorarios(data.horarios.list)[0]} route='horarios'/>
                                </ul>
                            :
                                "No hay horarios asociados"
                        }
                    </div>
                    <div className="top-padding">
                        <h6 className="highlight m-font">
                            Feriados
                        </h6>
                        {
                            Object.values(feriados).length>0
                            ?
                                <ul className="nav-list no-padding">
                                    <CommaList list={feriados} route='horarios/feriados'/>
                                </ul>
                            :
                                <div className="bold">
                                    No hay feriados asociados
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
