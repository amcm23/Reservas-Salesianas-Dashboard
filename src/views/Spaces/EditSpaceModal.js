import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import SpaceForm from "./SpaceForm";
import axios from "axios";

function EditSpaceModal(props) {
  const { modal, space, hideEdit } = props;
  const [types, setTypes] = useState([]);

  console.log("user dentro de edit modal: ", space);

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
  }, []);

  function showModal() {
    props.showAddModalProps();
  }

  return (
    <Modal isOpen={modal} toggle={showModal} size="xl">
      <ModalHeader toggle={showModal}>Editar Espacio</ModalHeader>
      <ModalBody>
        <SpaceForm
          fetchSpaces={() => props.fetchSpaces()}
          showModal={showModal}
          tipos={types}
          space={space}
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

export default EditSpaceModal;
