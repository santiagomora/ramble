import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import {WaitsLoading} from './DataHandler';
import Navigation from '../componentes/agenda/Navigation';

class DateFilter extends Component {
    constructor(props){
        super(props);
        this.performChanges = this.performChanges.bind(this);
    }

    static contextType = WaitsLoading;

    changeView(e){
        this.props.history.replace({
            state:{
                ...this.props.location.state,
                show:e.currentTarget.getAttribute('data')
            }
        });
    }

    performChanges(date){
        this.context({date:new Date(date)});
    }

    changeMonth(e){
        e.preventDefault();
        const date = new Date(this.props.data.date);
        date.setMonth(parseInt(e.currentTarget.getAttribute('value')))
        this.performChanges(date);
    }

    changeYear(e) {
        e.preventDefault();
        const date = new Date(this.props.data.date);
        date.setFullYear(parseInt(e.currentTarget.getAttribute('value')));
        this.performChanges(date);
    }

    render(){
        const props = this.props,
            date = props.data.date
                ? props.data.date
                : new Date(),
            location = (props.location||{}).state||{};
        return(
            <>
                <Navigation date={date}
                    changeMonth={this.changeMonth.bind(this)}
                    changeYear={this.changeYear.bind(this)}
                    changeView={this.changeView.bind(this)}
                    route={props.route}
                    controls={Object.values(props.controls)}
                    show={location.show||props.defaultView}
                    hide={props.hideViews}/>
                <div className="row h-padding">
                    {
                        React.cloneElement(
                            this.props.children,
                            {
                                show:location.show||props.defaultView,
                                date:date,
                                data:props.data
                            }
                        )
                    }
                </div>
            </>
        );
    }
}

export default withRouter(DateFilter);
