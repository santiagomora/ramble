import React,
{
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';

function Promociones (props) {
    const data = props.data,
        list = props.list,
        showData = Object.keys(props.data).reduce(
            (tot,curr, i) => {
                const promo = props.data[curr].promociones;
                if ( promo && promo.data ){
                    Object.keys(promo.data).map(
                        (e,i) => {
                            const eventos = promo.data[e].eventos.list;
                            if (tot[e]){
                                Object.assign(tot[e].eventos, eventos);
                            } else {
                                tot[e] = {
                                    nombre: promo.data[e].nombre,
                                    eventos: eventos,
                                    descripcion: promo.data[e].descripcion,
                                    descuento: promo.data[e].descuento,
                                };
                            }
                        }
                    )
                }
                return tot;
            },
            {}
        ),
        dataArray = Object.keys(showData);

    return (
        <>
            <div className="sub-title highlight">
                Promociones del día
            </div>
            <ul style={{ maxHeight: "45vh", overflowY: "auto"}}
                className="nav-list no-padding full-width" >
                {
                    dataArray.length>0
                    ?
                        dataArray.map(
                            (e,i) => {
                                const eventoArray = showData[e].eventos;
                                return (
                                    <li key={i}
                                        className="v-padding"
                                        keyvalue={e}
                                        style={{ paddingRight: "10px" }}>
                                        <div className="smaller-text">
                                            <div className="bold half inline-block">
                                                {showData[e].nombre}
                                            </div>
                                            <div className="half text-right inline-block">
                                                {showData[e].descuento !== 0 ? showData[e].descuento + "% descuento" : "sin descuento"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="smaller-text">{showData[e].descripcion}<span className="side-margin bold">en los eventos:</span></div>
                                            <CommaList list = {eventoArray} endpoint='' />
                                        </div>
                                    </li>
                                )
                            }
                        )
                    :
                        <div style={{padding:"0px 10px 10px 0px"}}> Sin promociones para mostrar</div>
                }
            </ul>
        </>
    )
}
export default React.memo(Promociones)
