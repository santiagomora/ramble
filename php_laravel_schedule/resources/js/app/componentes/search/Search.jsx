/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Text} from '../input/Text';
import {GET} from '../../utils/api';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

const findOccur = (regex,str) =>
    str.replace(regex, x => `<>${x}<>`)
        .split('<>')
        .map(
            (e,i) =>
                e.search(regex)!==-1
                    ? <span key={i} className="highlight-title">{e}</span>
                    : e
        );

const filterData = (regex,data,route) =>
    data.reduce(
        (t,c) => (
            (
                fields[route].filter(
                    e => c[e].match(regex)
                )||[]
            ).length>0
                ? [...t,c]
                : t
        ),
        []
    );

const fields = {
    reservas: ['nombre','apellido','dni'],
    feriados:['nombre']
};

const prettyData = {
    reservas:(data,term) =>
        data.map(
            (e,i) => {
                const   reg = term
                            ? new RegExp(`${term}`,'gi')
                            : null,
                        title = reg
                            ? [findOccur(reg,e.nombre),', ',findOccur(reg,e.apellido)]
                            : [e.nombre,', ',e.apellido]
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`reservas/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">
                                <span className="bold light-danger">{reg ? findOccur(reg,e.dni) : e.dni}</span>
                            </div>
                            <div className="text smaller-text">
                                <div>
                                    <span className="bold">email:</span>
                                    <span>{e.email},</span>
                                </div>
                                <div>
                                    <span className="bold">teléfono:</span>
                                    <span>{e.telefono}</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }
        ),
    feriados:(data,term) =>
        data.map(
            (e,i) => {
                const title = term
                    ? findOccur(new RegExp(`${term}`,'gi'),e.nombre)
                    : e.nombre,
                    fecha = new Date(e.fecha)
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`feriados/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">
                                <div className="bold light-danger">
                                    {`${fecha.getDay()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`}
                                </div>
                                <div>
                                    {e.descripcion}
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }
        )
};

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            focus:false,
            results:[]
        };
        this.requestData = this.requestData.bind(this);
        this.storeRequest = this.storeRequest.bind(this);
    }

    requestData(route){
        const request = GET({
                endpoint:`search/${route}/${user.id}`
            })
            .then(
                response => {
                    const results = this.state.focus
                        ? response.data.data
                        : []
                    this.setState({results})
                }
            )
            .catch((err) => console.log(err))
    }

    storeRequest(){
        const searchState = this.props.location.state||{};
        this.props.history.replace({
            state:{
                ...searchState,
                search:this.state.term
            }
        })
    }

    componentDidMount(){
        const searchState = this.props.location.state||{};
        if (searchState.search)
            this.setState({term:searchState.search})
    }

    componentDidUpdate(pp,ps){
        if (ps.focus !== this.state.focus && this.state.focus)
            this.requestData(this.props.route);
        else if (ps.focus !== this.state.focus && !this.state.focus)
            this.storeRequest();
    }

    changeSearch (e) {
        const term = e.target.value;
        this.setState({term});
    }

    toggleFocus(){
        const focus = !this.state.focus;
        this.setState({focus});
    }

    render (){
        const   data = this.state.results,
                term = this.state.term,
                route = this.props.route,
                filter = (term)
                    ? filterData(new RegExp(`${term}`,'gi'),data,route)
                    : data;
        return (
            <div className="full-width align-center">
                <div className="white-background search-box full-width relative flex-row">
                    <div className="select-title"
                        style={{overflow:"hidden"}}>
                        <input  type="text"
                            value={term}
                            placeholder={`buscar en ${route}`}
                            className="smaller-text inline-block h-padding"
                            onChange = {this.changeSearch.bind(this)}
                            onFocus={this.toggleFocus.bind(this)}
                            onBlur={this.toggleFocus.bind(this)}/>
                    </div>
                    <div className="margin-left h-padding v-align-center">
                        <i className="fas fa-search"
                            style={{
                                color:this.state.focus
                                    ? 'var(--light-danger)'
                                    : 'var(--border)'
                                }}/>
                    </div>
                </div>
                <div className={
                    term === "" || !this.state.focus
                        ? "hidden"
                        : "visible relative"
                    } style={{zIndex:'10'}}>
                    <div className="overlay full-width"
                        style={{opacity:1}}>
                        <div className="arrow-up" 
                            style={{marginLeft:"3px"}}/>
                        <div className="white-background shadow-result round-border">
                        {
                            filter.length>0
                            ? (
                                <ul className="nav-list no-padding">
                                    {prettyData[route](filter,term)}
                                </ul>
                            ) : (
                                <div className="box-padding extra-v-padding text-center bold">
                                    sin resultados
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Search);
