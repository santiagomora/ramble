import React,{
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import {
    compareDates
} from '../../../app/utils/Helper';
import {
    checkValid
} from './Handlers';

function Calendario(props) {
    const [dateEvent,changeDate]  = useState({
            event:null,
            dt:props.showDate,
            fetch:false
        }),
        data = props.data.data,
        frst = useRef(true),
        inputRef = useRef(null),
        dayChange = (date) => {
            changeDate({
                event:  new Event('change',{
                            bubbles: true
                        }),
                dt: checkValid({
                    date:date,
                    min:props.minDate,
                    horarios:data.horarios.data,
                    feriados:data.feriados.data
                }),
                fetch:false
            });
        },
        tileDisabled = ({ activeStartDate, date, view }) => {
            const   normal = data.horarios.data[date.getDay() + 1],
                    feriado = data.feriados.data[date.getDate()],
                    feriadoNoLaboral = feriado!==undefined
                        ? feriado.estado === 'no_laboral'
                        : false,
                    disableByDate = view === 'month'
                        ? normal.estado === 'no_laboral' || feriadoNoLaboral
                        : date.getMonth() < activeStartDate.getMonth()
                            || date.getFullYear() < activeStartDate.getFullYear();

            return disableByDate;
        },
        monthChange = (date) => {
            changeDate({
                event:  new Event('change',{
                            bubbles: true
                        }),
                dt: checkValid({
                    date:date,
                    min:props.minDate,
                    horarios:data.horarios.data,
                    feriados:data.feriados.data
                }),
                fetch:true
            });
        },
        navChange = ({ activeStartDate, view }) => {
            changeDate({
                event:  new Event('change',{
                            bubbles: true
                        }),
                dt:checkValid({
                    date:activeStartDate,
                    min:props.minDate,
                    horarios:data.horarios.data,
                    feriados:data.feriados.data
                }),
                fetch:true
            });
        },
        tileContent = ({ date, view }) => {
            const   index = date.getDate(),
                    feriado = data.feriados.data[index],
                    fData = feriado !== undefined
                        ? feriado
                        : data.horarios.data[date.getDay()+1],
                    cond =  fData.estado === 'no_laboral'
                            || compareDates(date, props.minDate, {d:'<',m:'=',y:'='}),
                    handler =
                        (date) =>
                            (e) =>
                                props.changeHover(date);
            return feriado !== undefined
                ?
                    <>
                        <div    className="full-cover box-padding"
                                onMouseOver={cond ? e => false : handler(date) }
                                onMouseLeave={cond ? e => false :handler(props.showDate)}/>
                        <p className="no-margin bold smaller-text">
                            <i className="line-v-middle fas fa-ellipsis-h highlight-title" />
                        </p>
                    </>
                :
                    <>
                        <div    className="full-cover box-padding"
                                onMouseOver={cond ? e => false : handler(date) }
                                onMouseLeave={cond ? e => false :handler(props.showDate)}/>
                        <p></p>
                    </>
        };

    useEffect(
        () => {
            if (!frst.current) {
                if (dateEvent.fetch)
                    props.fetch(
                        {date:dateEvent.dt},
                        () => inputRef.current.dispatchEvent(dateEvent.event)
                    )
                else
                    inputRef.current.dispatchEvent(dateEvent.event)
            } else
                frst.current = false;
        },
        [dateEvent]
    );
    return (
        <>
            <input  readOnly
                type="date"
                ref = {inputRef}
                value={dateEvent.dt}
                onChange={props.clickCallback}
                name="fecha_reserva"
                className="hidden" />
            <Calendar tileClassName='relative'
                showNeighboringMonth={false}
                value={props.showDate}
                minDate={props.minDate}
                onClickDay={dayChange}
                onClickMonth={monthChange}
                tileDisabled={tileDisabled}
                tileContent={tileContent}
                onActiveDateChange={navChange} />
        </>
    );
}

export default React.memo(Calendario)
