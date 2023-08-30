import Modal from 'react-modal'
import {createPortal} from 'react-dom'
import * as classes from '../app/food/css/Food.module.css' 
import {useSelector} from 'react-redux'
import {Transition} from 'react-transition-group';
import { Fragment } from 'react';

const classByState = {
    entering:"modal--opening",
    entered:"modal--open" ,
    exiting:"modal--closed"
}

export default function({closeModal,title,children})
{
    const {modalDisplay} = useSelector( state => state.ui )
    return createPortal(
        <Transition 
            mountOnEnter
            unmountOnExit
            in={modalDisplay} 
            timeout={200}
        >
        {
            state => 
            {
                const animationClassName = classByState[state] ? classByState[state] : ""
                return (
                    <Fragment>
                        <div 
                            className="modal-overlay"
                            onClick={closeModal}
                        />
                        <div
                            aria-label="modal"
                            className={`modal ${animationClassName} `}
                        >
                            <div className="d-flex flex-row justify-content-between">
                                <h2 className="font-weight-bold">{title}</h2>
                                <button onClick={closeModal} className={classes.delete}>×</button>
                            </div>
                            {children}
                        </div>
                    </Fragment>
                )
            }
        }
        </Transition>,
        document.getElementById('orderModalPortal')
    );
}