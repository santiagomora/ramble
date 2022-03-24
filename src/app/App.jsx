import React,{
    Component
} from 'react';

import {
    GET
} from '../utils/http.jsx';

import Controls from './Controls.jsx';

import Results from './Results.jsx';

import SetType from './SetType.jsx';

import axios from 'axios';

import '../css/App.css';

//GET({url:'/recent?limit=10&offset=0'})

let cancel,token;

function search({term}){

    const {offset,limit,type} = this.state,
        {CancelToken} = axios;

    if ( token )
        cancel('cancelled')

    token = new CancelToken(
        c => {cancel = c}
    )

    GET({
        cancelToken: token,
        url:`/${type}?snippet=${term}&limit=${limit}&offset=${offset}`
    })
    .then(
        res => {
            const {data} = res.data;
            this.setState({data})
        }
    )
    .catch(
        err => {
            if ( axios.isCancel(err) ){
                console.log(err.message)
            }
        }
    )

}

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            term:"",
            type:"local",
            offset:1,
            limit:10,
            data:[],
            columns:3
        }

        this.search = search.bind(this);
        this.change = this.change.bind(this);
        this.setType = this.setType.bind(this);

    }

    change({term}){
        this.setState(
            {term},
            () => {
                const {term} = this.state
                this.search({term})
            }
        )
    }

    setType({target}){
        const {term} = this.state
        this.setState(
            {type:target.value},
            this.change({term})
        )
    }

    componentDidMount(){
        this.search({term:''})
    }

    render(){

        const {term,data} = this.state;

        return (
            <div className="container-fluid app">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h2>type to search images</h2>
                    </div>
                    <div className="col-md-2">
                        <SetType change={this.setType}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 svpadding">
                        <input
                            type="text"
                            name="search"
                            className="searchbox"
                            onChange={
                                ({currentTarget}) =>
                                    this.change({
                                        term:currentTarget.value
                                    })
                            }
                            value={term}/>
                    </div>
                </div>
                <Controls
                    state={this.state}
                    change={this.change}/>
                <Results {...this.state}/>
            </div>
        );

    }

}

export default App;
