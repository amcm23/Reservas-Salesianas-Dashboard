import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import UserForm from './UserForm'

function AddUserModal(props) { 

    const { modal } = props

    function showModal() {
        props.showAddModalProps()
    }

    return (

        <Modal isOpen={modal} toggle={showModal}>
        <ModalHeader toggle={showModal}>Añadir Usuario</ModalHeader>
        <ModalBody>
          <UserForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={showModal}>Ok</Button>{' '}
          <Button color="secondary" onClick={showModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

    )
}

export default AddUserModal