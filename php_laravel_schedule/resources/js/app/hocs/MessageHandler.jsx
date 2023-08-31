/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from '../componentes/control/Message';
import {searchErrors} from '../utils/validationMethods';
export const DisplaysMessages = React.createContext({});

function pushMessage (m) {
    const queue = this.state.messages;
    queue.push(m)
    this.setState({messages:queue})
}

const messageType = {
    customError:function (location,callback){
        return function (err) {
            callback()
            .then (
                res => {
                    if (location.match('esctritorio')) {
                        this.pushMessage({
                            data:(
                                <div className="h-padding">
                                    {error.error}
                                </div>
                            ),
                            title:(
                                <>
                                    <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                                    <span className="side-margin">{`Error ${error.code}`}</span>
                                </>
                            ),
                            type:'failure',
                            show:true
                        })
                    }
                }
            )
        }
    },
    frontEndError: function (errors){
        this.pushMessage({
            data:(
                <ul className="h-padding nav-list">
                    {errors}
                </ul>
            ),
            title:(
                <>
                    <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                    <span className="side-margin">Errores</span>
                </>
            ),
            type:'failure',
            show:true
        })

    },
    backEndError: function (error) {
        const errorMessage = error.response
            ? error.response
            : error;
        this.pushMessage({
            data:(
                <div className="h-padding">
                    <div className="inline-block ">
                        <span className="side-margin bold">código</span>
                        <span className="side-margin bold">{(errorMessage||{}).status||504}</span>
                    </div>
                    <div className="inline-block side-margin">
                        {(errorMessage||{}).statusText||errorMessage+''}
                    </div>
                </div>
            ),
            title:(
                <>
                    <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                    <span className="side-margin">Errores</span>
                </>
            ),
            type:'failure',
            show:true
        })
    },
    validationError: function ({error,validation,form,target}) {
        let message = {};
        if (error.response.data.errors){
            const rewrittenErrors = rewriteErrors(error.response.data.errors),
                [hasErrors,err] = searchErrors(
                    rewrittenErrors,
                    validation,
                    form
                );
            target.setState(
                {errors:err,sent:false},
                () =>
                    this.pushMessage({
                        data:(
                            <ul className="h-padding nav-list">
                                {hasErrors}
                            </ul>
                        ),
                        title:(
                            <>
                                <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                                <span className="side-margin">Errores</span>
                            </>
                        ),
                        type:'failure',
                        show:true
                    })
            );
        } else
            this.pushMessage({
                data:error.response.data,
                type:'failure',
                show:true
            })
    },
    success: function (data){
        this.pushMessage({
            data:data.message,
            title:(
                <>
                    <i className="fas fa-check-circle bold sub-title side-margin" />
                    <span className="side-margin">{data.title}</span>
                </>
            ),
            type:data.type,
            show:true
        });
    },
    failure: function (data){
        this.pushMessage({
            data:data.message,
            title:(
                <>
                    <i className="fas fa-exclamation-triangle bold sub-title side-margin" />
                    <span className="side-margin">{data.title}</span>
                </>
            ),
            type:data.type,
            show:true
        });
    }
}

function rewriteErrors (errors) {
    return Object.keys(errors).reduce(
        (tot,cur) => {
            const ind = cur.match(/\./gi)
                ? cur.split('.')[0]
                : cur;
            if (tot[ind])
                tot[ind].push(errors[cur][0]);
            else
                tot[ind] = [errors[cur][0]]
            return tot;
        },
        {}
    )
}

export default class MessageHandler extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[]
        }
        this.hideMessage = this.hideMessage.bind(this);
        this.pushMessage = pushMessage.bind(this);
        this.messageType = Object.keys(messageType).reduce(
            (t,c) => {
                t[c] = messageType[c].bind(this);
                return t;
            }
            ,{}
        );
    }

    hideMessage(key){
        const messages = this.state.messages;
        messages[key].show = false;
        this.setState({messages});
    }

    componentDidUpdate(pp){
        const loc = this.props.location,
            currMsg = (loc.state||{}).message||{},
            prevMsg = (pp.location.state||{}).message||{};
        if (currMsg.message!=prevMsg.message && currMsg.message){
            this.messageType[currMsg.type](currMsg)
        }
    }

    render(){
        const messages = this.state.messages;
        return (
            <>
                {
                    messages.length>0
                    ?
                        messages.map(
                            (m,i) => {
                                if (m.show)
                                    return (
                                        <div key={i}>
                                            <Message hide={this.hideMessage}
                                                index={i}
                                                message={m}/>
                                        </div>
                                    )
                            }
                        )
                    :
                        <></>

                }
                <DisplaysMessages.Provider value={this.messageType}>
                    {this.props.children}
                </DisplaysMessages.Provider>
            </>
        )
    }
}
