import ReactDOM from 'react-dom';
import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom';

import {
    ReservaView
} from '../../../app/componentes/agenda/ReservaView';
import DateFilter from '../../../app/hocs/DateFilter';
import Titulo from '../../../app/componentes/basic/Titulo';

export default class Escritorio extends Component {
    constructor(props){
        super(props);
        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };
    }

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    render(){
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title={"Bienvenido, "+data.username} />
                <DateFilter hideViews
                    data={this.props.data}
                    route={'reservas'}
                    controls={{}}>
                    <ReservaView actions={this.actions}/>
                </DateFilter>
            </>
        );
    }
}
