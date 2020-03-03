import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReservationForm from "./ReservationForm";
import axios from "axios";
import {
  fetchReservations,
  createReservation,
  editReservation,
  deleteReservation
} from "../../actions/reservations";
import { fetchSpaces } from "../../actions/spaces";
import { fetchUsers } from "../../actions/users";

function EditReservationModal(props) {
  const { modal, reservation, hideEdit } = props;

  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchUsers(data => setUsers(data));
    fetchSpaces(data => setSpaces(data));
  }, [modal]);

  function showModal() {
    props.showAddModalProps();
  }

  return (
    <Modal isOpen={modal} toggle={showModal} size="xl">
      <ModalHeader toggle={showModal}>Editar Espacio</ModalHeader>
      <ModalBody>
        <ReservationForm
          fetchReservations={() => props.fetchReservations()}
          showModal={showModal}
          reservation={reservation}
          usuarios={users}
          espacios={spaces}
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

export default EditReservationModal;
