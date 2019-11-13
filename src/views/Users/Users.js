import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Badge } from "reactstrap";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import axios from "axios";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/usuarios.php/usuarios`)
      .then(res => {
        setUsers(res.data);
      });
  }

  function typeFormatter(cell, row) {
    return (
      <span>
        {row.ADMIN === 1 ? (
          <Badge color="warning">Administrador</Badge>
        ) : (
          "Usuario"
        )}
      </span>
    );
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
            fetchUsers();
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
      dataField: "DNI",
      text: "DNI"
    },
    {
      dataField: "NOMBRE",
      text: "Nombre"
    },
    {
      dataField: "P_APELLIDO",
      text: "1er Apellido"
    },
    {
      dataField: "S_APELLIDO",
      text: "2º Apellido"
    },
    {
      dataField: "DIRECCION",
      text: "Dirección"
    },
    {
      dataField: "EMAIL",
      text: "Email"
    },
    {
      dataField: "TELEFONO",
      text: "Teléfono"
    },
    {
      dataField: "ADMIN",
      text: "Tipo",
      formatter: typeFormatter
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
        style={{ marginBottom: "1rem" }}
        color="primary"
      >
        Añadir
      </Button>
      <AddUserModal
        showAddModalProps={() => setAddModal(!addModal)}
        modal={addModal}
        fetchUsers={() => fetchUsers()}
      />
      <EditUserModal
        showAddModalProps={() => setEditModal(!editModal)}
        modal={editModal}
        fetchUsers={() => fetchUsers()}
        hideModal={hideEdit}
        user={userToEdit}
      />
      <BootstrapTable
        keyField="id"
        data={users}
        columns={columns}
        responsive
        stripped={true}
      />
    </Container>
  );
}
