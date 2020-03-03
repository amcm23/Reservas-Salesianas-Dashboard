import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function ReusableModal(props) {
  const { modal, content, close, hasOkButton, okFunction, title } = props;

  return (
    <Modal isOpen={modal} toggle={close} size="xl">
      <ModalHeader toggle={close}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={close}>
          Cancelar
        </Button>
        {hasOkButton && (
          <Button color="primary" onClick={okFunction}>
            Ok
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default ReusableModal;
