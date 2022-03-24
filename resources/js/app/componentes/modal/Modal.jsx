import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap-modal';

function noMemoModal (props)
{
    return (
        <Modal
            show={props.open}
            onHide={props.closeModal}>
            <Modal.Header>
                <Modal.Title id='ModalHeader'>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.content}
            </Modal.Body>
            <Modal.Footer>
                <Modal.Dismiss className='btn btn-default'>Cancelar</Modal.Dismiss>
            </Modal.Footer>
        </Modal>
    );
}
export default React.memo(noMemoModal);
