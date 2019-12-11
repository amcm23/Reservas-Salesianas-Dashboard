import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Badge, Alert } from "reactstrap";
import AddSpaceModal from "./AddSpaceModal";
import EditSpaceModal from "./EditSpaceModal";
import TypesModal from "./TypesModal";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchSpaces, deleteSpaces } from "../../actions/spaces";

export default function Spaces() {
  const [spaces, setSpaces] = useState([{}]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [spaceToEdit, setSpaceToEdit] = useState(null);
  const [typesModal, setTypesModal] = useState(false);

  useEffect(() => {
    fetchSpaces(res => setSpaces(res));
  }, []);

  function handleDelete(id) {
    console.log("deleting: ", id);
    Swal.fire({
      title: "¿Está seguro que desea eliminar el espacio?",
      text: "Esta acción será irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: ""
    }).then(result => {
      if (result.value) {
        deleteSpaces(id, () => {
          Swal.fire({
            title: "Eliminado",
            text: "Espacio eliminado con éxito.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  function handleEdit(space) {
    console.log("editing: ", space);
    setEditModal(true);
    setSpaceToEdit(space);
  }

  function hideEdit() {
    setEditModal(false);
  }

  function optionsFormatter(cell, row) {
    return (
      <React.Fragment>
        <Button
          color="primary"
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          onClick={() => handleEdit(row)}
        >
          Editar
        </Button>
        <Button
          color="danger"
          onClick={() => handleDelete(row.ID)}
          style={{ marginBottom: "0.5rem" }}
        >
          Eliminar
        </Button>
      </React.Fragment>
    );
  }

  const columns = [
    {
      dataField: "ID",
      text: "ID"
    },
    {
      dataField: "NOMBRE",
      text: "Nombre"
    },
    {
      dataField: "PRECIO",
      text: "Precio"
    },
    {
      dataField: "TIPO",
      text: "Tipo"
    },
    {
      dataField: "",
      text: "Opciones",
      formatter: optionsFormatter
    }
  ];

  return (
    <Container>
      <Button
        onClick={() => setAddModal(!addModal)}
        style={{ marginBottom: "1rem", marginRight: "1rem" }}
        color="primary"
      >
        Añadir
      </Button>
      <Button
        onClick={() => setTypesModal(!typesModal)}
        style={{ marginBottom: "1rem" }}
        color="primary"
      >
        Tipos de espacios
      </Button>
      <AddSpaceModal
        showAddModalProps={() => setAddModal(!addModal)}
        modal={addModal}
        fetchSpaces={() => fetchSpaces(res => setSpaces(res))}
      />
      <EditSpaceModal
        showAddModalProps={() => setEditModal(!editModal)}
        modal={editModal}
        fetchSpaces={() => fetchSpaces(res => setSpaces(res))}
        hideModal={hideEdit}
        space={spaceToEdit}
      />
      <TypesModal
        showModal={() => setTypesModal(!typesModal)}
        modal={typesModal}
        fetchUsers={() => fetchSpaces(res => setSpaces(res))}
        hideModal={() => setTypesModal(false)}
      />

      {spaces === "No existen espacios en la BBDD." ? (
        <Alert color="warning">No hay espacios todavía</Alert>
      ) : (
        <BootstrapTable
          keyField="id"
          data={spaces}
          columns={columns}
          responsive
          stripped={true}
        />
      )}
    </Container>
  );
}
