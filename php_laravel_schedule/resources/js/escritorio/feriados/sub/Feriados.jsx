import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import {
    NO_DAY_CONTROL
} from '../../../app/constantes/CalendarControls';
import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import FeriadosTable from '../../../app/componentes/tables/FeriadosTable';
import DateFilter from '../../../app/hocs/DateFilter';
import FeriadoViews from '../../../app/componentes/agenda/FeriadoView';
import {
    WaitsLoading
} from '../../../app/hocs/DataHandler';
import {
    assignType
} from '../../../app/utils/Helper';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-calendar-week inline-box side-margin" />
                Horarios
            </div>
        ),
        to:`/horarios`
    }
];


const dataByType = {
    agenda: (par) => (
        <DateFilter data={par.props.data}
            controls={NO_DAY_CONTROL}
            route={'feriados'}
            defaultView={"1"}>
            <FeriadoViews actions={{eliminar:par.props.toggleModal}}/>
        </DateFilter>
    ),
    tabla: (par) => (
        <div className="container-fluid">
            <div className="row">
                <FeriadosTable actions={{eliminar:par.props.toggleModal}} data={par.props.data.data}/>
            </div>
        </div>
    )
}

export default class Feriados extends Component {
    constructor(props){
        super(props);
    }

    static contextType = WaitsLoading;

    componentDidMount() {
        console.log('mount')
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    changeView(){
        const loc = (this.props.location||{}).state||{};
        this.context({
            date:loc.date,
            type: assignType(this.props.data.type)
        });
    }

    render(){
        return (
            <>
                <Titulo title="Feriados"
                    changeView ={{
                        right:"viendo tabla",
                        left:"viendo agenda",
                        change:this.changeView.bind(this),
                        side:this.props.data.type === 'agenda'
                    }}
                    links={this.props.nav.links.concat(links)}/>
                {
                    dataByType[this.props.data.type](this)
                }
            </>
        );
    }
}
