import React,
{
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import ReactDOM from 'react-dom';

import Promociones from './Promociones';
import Calendario from './Calendario';
import {
    compareDates
} from '../../../app/utils/Helper';
import AttentionSchedule from '../../../app/componentes/basic/AttentionSchedule'

function CalendarioEventos(props){
    const   data = props.data.data,
        [date,changeDate] = useState(props.showDate),
        [hoverDate, changeHover] = useState(props.showDate),
        fecha = hoverDate.getDate(),
        dia = hoverDate.getDay(),
        hoverData = data.feriados.data[fecha]
            ? data.feriados.data[fecha]
            : data.horarios.data[dia+1];

    useEffect(
        () => {
            changeDate(props.showDate)
            changeHover(props.showDate)
        },
        [props.showDate]
    );

    return (
        <>
            <div className="row v-padding">
                <AttentionSchedule displayDate={hoverDate} data={hoverData}/>
            </div>
            <div className="row v-padding">
                <div className="col-md-8 text-left no-padding">
                    <Calendario showDate={date}
                        minDate={props.minDate}
                        formDate = {props.fecha}
                        data={props.data}
                        changeHover={changeHover}
                        fetch={props.fetch}
                        clickCallback={props.clickCallback}
                        change ={props.change} />
                </div>
                <div className="col-md-4 no-padding">
                    <Promociones data={hoverData.eventos.data}/>
                </div>
            </div>
        </>

    );
}

export default  React.memo(
    CalendarioEventos,
    (pp,np) => compareDates(
            pp.showDate,
            np.showDate,{
                d:'=',
                m:'=',
                y:'='
            }
        )
);
