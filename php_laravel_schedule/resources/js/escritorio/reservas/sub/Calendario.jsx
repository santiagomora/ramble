import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
    NO_WEEK_CONTROLS
} from '../../../app/constantes/CalendarControls';
import ReservasTable from '../../../app/componentes/tables/ReservasTable';
import {
    ReservaView
} from '../../../app/componentes/agenda/ReservaView';
import DateFilter from '../../../app/hocs/DateFilter';
import {
    WaitsLoading
} from '../../../app/hocs/DataHandler';
import {
    assignType
} from '../../../app/utils/Helper';

export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };
    }

    static contextType = WaitsLoading;

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    changeView(){
        const loc = (this.props.location||{}).state||{};
        this.context({
            date:loc.date,
            type: assignType(this.props.data.type)
        });
    }

    render(){
        const loc = this.props.location.state||{},
            type = loc.type
                ? loc.type
                : this.props.data.type;
        return (
            <>
                <Titulo title="Reservaciones"
                    links={this.props.nav.links}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="bold text-right">
                            {`${this.props.data.data.length} reservas encontradas`}
                        </div>
                        <ReservasTable actions={this.actions} data={this.props.data.data}/>
                    </div>
                </div>
            </>
        );
    }
}
