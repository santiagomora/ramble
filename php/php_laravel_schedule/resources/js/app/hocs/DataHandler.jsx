import React, {
    Component
} from 'react';
import {
    withRouter,
    matchPath
} from 'react-router-dom';
import {
    downloadHandler,
    LoadBar
} from '../componentes/control/LoadBar';
import {Redirect} from 'react-router-dom';
import {handlerArray} from '../handlers/index';
import ReactDOM from 'react-dom';
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../componentes/control/Lateral';
import {DisplaysMessages} from './MessageHandler';
import Loader from 'react-loader-spinner';
import BarraNavegacion from '../componentes/control/BarraNavegacion';
import WaitEvent from './WaitEvent';

function searchHandler (path) {
    return handlerArray.filter(
        c => path.match(c.match)
    ).pop();
}

function awaitLoading ({
    handler,
    route,
    user
}){
    this.setState({
            loading:0,
            loadFinished:false,
            fetchData: handler.callback({
                params:route.params,
                user
            }).bind(this)
        },() => this.fetchHandler(
            this.props.location.state||{}
        )
    );
}


function assignRoute (location){
    const handler = searchHandler(location);
    return {
        handler,
        route:matchPath(
            location,
            { path:handler.endpoint }
        )
    };
};


export const WaitsLoading = React.createContext({});

class DataHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:0
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    static contextType = DisplaysMessages;

    routeChange (location) {
        const config = assignRoute(location.pathname);
        this.awaitLoading({
            ...config,
            user:this.props.user
        })
    }

    fetchHandler(params){
        return this.state.fetchData(params)
            .catch(
                err => {
                    if (err.response.status === 401)
                        this.props.logout({err})
                }
            )
    }

    shouldComponentUpdate(np,ns){
        return  np.location !== this.props.location
            || ns.loadFinished !== this.state.loadFinished;
    }

    componentDidUpdate(pp,ps){
        if(pp.location.pathname !== this.props.location.pathname){
            this.routeChange(this.props.location)
        }
    }

    componentDidMount() {
        this.routeChange(this.props.location);
    }

    componentWillUnmount() {
    }

    render() {
        const props = this.props,
            user = this.props.user,
            loc = this.state.location||{},
            path = loc.pathname||props.location.pathname;

        return (
            <WaitsLoading.Provider value={this.fetchHandler}>
                <div className="dark-background"
                    style={{height:"40vh"}}>
                    <div className="row relative justify-content-end"
                        style={{marginRight:"0.5%"}}>
                        <BarraNavegacion user={props.user}
                            logout={props.logout}/>
                    </div>
                </div>
                <div className="container-fluid white-background"
                    style={{
                        width:"99%",
                        borderRadius:"10px",
                        marginTop:"-32vh",
                        overflow:"auto",
                        height:"100vh"
                    }}>
                    <LoadBar loaded={this.state.loading}/>
                    <BreadCrumb url={`usuario${loc.pathname}`}
                        usuario={user.nombre}
                        nombre={this.state.nombre}/>
                    <div className="row">
                        <Lateral current={path}
                            user={user}
                            items={sidebar}/>
                        <div className="col-md-10">
                            {
                                (this.state.data)
                                ?
                                    <div style={{padding:"10px 16px"}}
                                        className="main-container">
                                        <div className="visible relative">
                                            <div className={
                                                this.state.loadFinished
                                                    ? "hidden"
                                                    : "top-padding full-width overlay"
                                                }/>
                                                <WaitEvent cond={loc.pathname !== props.location.pathname}>
                                                    {
                                                        React.cloneElement(
                                                            this.props.children,
                                                            {
                                                                data:this.state.data,
                                                                match:props.global,
                                                                location:loc,
                                                                message:this.state.message
                                                            }
                                                        )
                                                    }
                                                </WaitEvent>
                                        </div>
                                    </div>
                                :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </WaitsLoading.Provider>
        );
    }
}

/*


*/

export default withRouter(DataHandler);
