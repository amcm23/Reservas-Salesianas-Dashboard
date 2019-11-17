import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import SpaceForm from "./ReservationForm";
import axios from "axios";

function AddSpaceModal(props) {
  const { modal } = props;
  const [types, setTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);

  function showModal() {
    props.showAddModalProps();
  }

  function fetchUsers() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/usuarios.php/usuarios`)
      .then(res => {
        setUsers(res.data);
        console.log("TIPOS: ", res.data);
      });
    console.log("USUARIOS: ", users);
  }

  function fetchSpaces() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/espacios.php/espacios`)
      .then(res => {
        setSpaces(res.data);
        console.log("ESPACIOS: ", res.data);
      });
    console.log("SPACES: ", spaces);
  }

  useEffect(() => {
    fetchUsers();
    fetchSpaces();
  }, [modal]);

  return (
    <Modal isOpen={modal} toggle={showModal} size="md">
      <ModalHeader toggle={showModal}>Crear Reserva</ModalHeader>
      <ModalBody>
        <SpaceForm
          fetchReservations={() => props.fetchReservations()}
          showModal={showModal}
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

export default AddSpaceModal;
