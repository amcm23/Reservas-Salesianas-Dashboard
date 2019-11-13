import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import UserForm from "./UserForm";

function EditUserModal(props) {
  const { modal, user, hideEdit } = props;

  console.log("user dentro de edit modal: ", user);

  function showModal() {
    props.showAddModalProps();
  }

  return (
    <Modal isOpen={modal} toggle={showModal} size="xl">
      <ModalHeader toggle={showModal}>Editar Usuario</ModalHeader>
      <ModalBody>
        <UserForm
          fetchUsers={() => props.fetchUsers()}
          showModal={showModal}
          hideModal={hideEdit}
          user={user}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={showModal}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditUserModal;
