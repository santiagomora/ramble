import React, {
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';

import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import {
    generateHourArray,
    calculateOffset,
    generateAcceptedHours,
    checkValid
} from './Handlers';
import CalendarioEventos from './CalendarioEventos';
import CalendarioFormulario from './CalendarioFormulario';

import {compareDates} from '../../../app/utils/Helper';

export default class EventoFrame extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.changeDate = this.changeDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    changeDate(e){
        this.props.change(e.currentTarget)
    }

    fetchData(date,callback){
        const data = this.props.data.data;
        new Promise (
            (resolve,reject) => {
                this.props.fetch(date)
                    .then(resolve())
            }
        )
        .then(callback)
    }
    render(){
        const props = this.props,
            data = props.data.data,
            horario = generateAcceptedHours({
                a: data.antelacion,
                g: props.current,
                i: data.intervalo.id,
                f: props.fecha,
                m: props.minDate
            });
        return (
            <div className="container-fluid">
                <CalendarioEventos data={props.data}
                    showDate={props.fecha}
                    minDate={props.minDate}
                    clickCallback={this.changeDate}
                    fetch = {this.fetchData}
                    change={props.change}/>
                <div className="row justify-content-end smaller-text top-padding">
                    {`Debes reservar con al menos ${data.antelacion} horas de antelación.`}
                </div>
                <div className="row">
                    <CalendarioFormulario date={props.fecha}
                        currentData={props.current}
                        ubicaciones={data.ubicaciones}
                        horario={horario}
                        fields={props.fields}
                        change={props.change}
                        errors={props.errors} />
                </div>
            </div>
        );
    }
}
