import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import HoursForm from "./HoursForm";
import axios from "axios";

function AddHoursModal(props) {
  const { modal } = props;

  function showModal() {
    props.showAddModalProps();
  }

  return (
    <Modal isOpen={modal} toggle={showModal} size="lg">
      <ModalHeader toggle={showModal}>Añadir Horario</ModalHeader>
      <ModalBody>
        <HoursForm
          fetchHours={() => props.fetchHours()}
          showModal={showModal}
          space={props.space.ID}
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

export default AddHoursModal;
