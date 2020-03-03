import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Badge, Alert } from "reactstrap";
import AddSpaceModal from "./AddSpaceModal";
import EditSpaceModal from "./EditSpaceModal";
import TypesModal from "./TypesModal";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchSpaces, deleteSpaces } from "../../actions/spaces";
import ReusableModal from "../../components/ReusableModal";
import Hours from "./Hours";

export default function Spaces(props) {
  const [spaces, setSpaces] = useState([{}]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [spaceToEdit, setSpaceToEdit] = useState(null);
  const [typesModal, setTypesModal] = useState(false);
  const [hoursModal, setHoursModal] = useState(false);
  const [currentSpace, setCurrentSpace] = useState(null);

  useEffect(() => {
    fetchSpaces(res => setSpaces(res));
  }, []);

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    console.log("LOCALSTORAGE ITEM ---> ", localStorage.getItem("auth"));
    if (localStorage.getItem("auth") === null) {
      console.log("UNAUTH");
      props.history.push("/login");
    } else if(localStorage.getItem("currentUser") === null) {
      console.log("UNAUTH");
      props.history.push("/login");
    } else if (JSON.parse(localStorage.getItem("currentUser")).admin !=="1") {
      props.history.push("/dashboard");
    }else {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("currentUser --> ", currentUser);
      setCurrentUser(currentUser);
    }
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
          fetchSpaces(res => setSpaces(res))
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

  function handleHours(space) {
    setHoursModal(true);
    setCurrentSpace(space);
  }

  function optionsFormatter(cell, row) {
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={() => handleHours(row)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
        >
          Ver horario
        </Button>
        <Button
          color="secondary"
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
      <ReusableModal
        modal={hoursModal}
        close={() => setHoursModal(false)}
        content={<Hours space={currentSpace} />}
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
