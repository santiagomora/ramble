
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {DisplaysMessages} from './MessageHandler';
import {searchErrors} from '../utils/Helper';
import Actions from '../componentes/basic/Actions';
import {FormActions} from '../acciones/ActionsByView';
import * as methods from '../utils/validationMethods';

class ValidationHandler extends Component{
    constructor(props){
        super(props);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.requestHandler = this.props.sendRequest.bind(this);
        this.requestSent = this.requestSent.bind(this);

        this.actions = FormActions(
            this.enviarFormulario,
            this.cancelarFormulario,
            this.props.sendTitle,
            this.props.cancelTitle
        );

        this.state = {
            form:this.props.form,
            errors:{},
            validation:this.props.validation,
            sent:false
        };
    }

    static contextType = DisplaysMessages;

    changeFormField(e){
        const input = e.currentTarget||e,
            name = input.getAttribute('name'),
            value = input.getAttribute('needsvalue') === '1'
                ? input.value
                : input.getAttribute('value'),
            [form,errors] = methods.assignValues(
                value,
                name,
                this.state.form,
                this.state.validation,
                this.state.errors
            );
        this.setState({form,errors});
    }

    requestSent(bool,callback){
        this.setState(
            {sent:bool},
            () =>
                callback()
                    .then(
                        (response) => {
                            this.props.history.push({
                                pathname:response.data.redirect,
                                state:{message:response.data}
                            })
                        }
                    )
                    .catch(
                        (err) => {
                            this.context.validationError({
                                error:err,
                                validation:this.state.validation,
                                form:this.state.form,
                                target:this
                            })
                        }
                    )
        );
    }

    enviarFormulario(e){
        e.preventDefault();
        const [hasErrors,errors] = methods.searchErrors(
            this.state.errors,
            this.state.validation,
            this.state.form
        );
        if (hasErrors.length>0)
            this.setState(
                {errors},
                () => this.context.frontEndError(hasErrors)
            )
        else
            this.requestSent(
                true,
                () => this.requestHandler(
                    methods.castBeforeSending(
                        this.state.form,
                        this.state.validation
                    )
                )
            )
    }

    cancelarFormulario(e){
        e.preventDefault();
        this.context({
            message:{
                data:'cancelar from Ubicaciones form',
                type:'failure',
                update:false
            }
        })
    }

    render(){
        return (
            <>
                <div className="visible relative">
                    <div className={this.state.sent
                            ? "top-padding full-width overlay"
                            : "hidden"}
                        style={{marginLeft:"-15px"}}/>
                    <form className="full-width">
                        {
                            React.cloneElement(
                                this.props.children,
                                {
                                    fields:this.state.form,
                                    change:this.changeFormField,
                                    errors:this.state.errors
                                }
                            )
                        }
                        <div className="row justify-content-end h-padding">
                            <Actions buttons={
                                this.props.hideCancel
                                ?
                                    [this.actions[1]]
                                :
                                    this.actions
                            }/>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
export default withRouter(ValidationHandler)
