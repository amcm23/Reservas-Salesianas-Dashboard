import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import SpaceForm from "./SpaceForm";
import axios from "axios";

function AddSpaceModal(props) {
  const { modal } = props;
  const [types, setTypes] = useState([]);

  function showModal() {
    props.showAddModalProps();
  }

  function fetchTypes() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/tipos.php/tipos`)
      .then(res => {
        setTypes(res.data);
        console.log("TIPOS: ", res.data);
      });
    console.log("TIPOS: ", types);
  }

  useEffect(() => {
    fetchTypes();
  }, [modal]);

  return (
    <Modal isOpen={modal} toggle={showModal} size="md">
      <ModalHeader toggle={showModal}>Añadir Espacio</ModalHeader>
      <ModalBody>
        <SpaceForm
          fetchSpaces={() => props.fetchSpaces()}
          showModal={showModal}
          tipos={types}
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
