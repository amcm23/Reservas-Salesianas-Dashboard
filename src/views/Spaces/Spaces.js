import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Badge, Alert } from "reactstrap";
import AddSpaceModal from "./AddSpaceModal";
import EditUserModal from "./EditUserModal";
import TypesModal from "./TypesModal";
import axios from "axios";
import Swal from "sweetalert2";

export default function Spaces() {
  const [spaces, setSpaces] = useState([{}]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [typesModal, setTypesModal] = useState(false);

  useEffect(() => {
    fetchSpaces();
  }, []);

  function fetchSpaces() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/espacios.php/espacios`)
      .then(res => {
        setSpaces(res.data);
        console.log("ESPACIOS: ", res.data);
      });
    console.log("ESPACIOS: ", spaces);
  }

  function handleDelete(id) {
    console.log("deleting: ", id);
    Swal.fire({
      title: "¿Está seguro que desea eliminar el usuario?",
      text: "Esta acción será irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: ""
    }).then(result => {
      if (result.value) {
        axios
          .delete(
            `https://reservas.rota.salesianas.com/public/usuarios.php/usuarios/delete/${id}`
          )
          .then(result => {
            fetchSpaces();
            Swal.fire({
              title: "Eliminado",
              text: "Usuario eliminado con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }

  function handleEdit(user) {
    console.log("editing: ", user);
    setEditModal(true);
    setUserToEdit(user);
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
        fetchSpaces={() => fetchSpaces()}
      />
      <EditUserModal
        showAddModalProps={() => setEditModal(!editModal)}
        modal={editModal}
        fetchUsers={() => fetchSpaces()}
        hideModal={hideEdit}
        user={userToEdit}
      />
      <TypesModal
        showModal={() => setTypesModal(!typesModal)}
        modal={typesModal}
        fetchUsers={() => fetchSpaces()}
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
