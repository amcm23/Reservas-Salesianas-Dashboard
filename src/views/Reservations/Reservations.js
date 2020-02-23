import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Alert, Card, CardHeader } from "reactstrap";
import AddReservationModal from "./AddReservationModal";
import EditReservationModal from "./EditReservationModal";
import axios from "axios";
import Swal from "sweetalert2";

export default function Spaces(props) {
  const [reservations, setReservations] = useState([{}]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [reservationToEdit, setReservationToEdit] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    console.log("LOCALSTORAGE ITEM ---> ", localStorage.getItem("auth"));
    if (localStorage.getItem("auth") === null) {
      console.log("UNAUTH");
      props.history.push("/login");
    } else {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("currentUser --> ", currentUser);
      setCurrentUser(currentUser);
    }
  }, []);

  function fetchReservations() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/reservas.php/reservas`)
      .then(res => {
        setReservations(res.data);
        console.log("reservas: ", res.data);
      });
    console.log("reservas: ", reservations);
  }

  function handleDelete(id) {
    console.log("deleting: ", id);
    Swal.fire({
      title: "¿Está seguro que desea eliminar la reserva?",
      text: "Esta acción será irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: ""
    }).then(result => {
      if (result.value) {
        axios
          .delete(
            `https://reservas.rota.salesianas.com/public/reservas.php/reservas/delete/${id}`
          )
          .then(result => {
            fetchReservations();
            Swal.fire({
              title: "Eliminada",
              text: "Reserva eliminada con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }

  function handleEdit(reservation) {
    console.log("editing: ", reservation);
    setEditModal(true);
    setReservationToEdit(reservation);
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
      dataField: "USUARIO",
      text: "Usuario"
    },
    {
      dataField: "ESPACIO",
      text: "Espacio"
    },
    {
      dataField: "FECHA",
      text: "Fecha"
    },
    {
      dataField: "HORA",
      text: "Hora"
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
      <AddReservationModal
        showAddModalProps={() => setAddModal(!addModal)}
        modal={addModal}
        fetchReservations={() => fetchReservations()}
      />
      <EditReservationModal
        showAddModalProps={() => setEditModal(!editModal)}
        modal={editModal}
        fetchReservations={() => fetchReservations()}
        hideModal={hideEdit}
        reservation={reservationToEdit}
      />

      <Card>
        <CardHeader>Reservas</CardHeader>
        {reservations === "No existen reservas en la BBDD." ? (
          <Alert color="warning">No hay reservas todavía</Alert>
        ) : (
          <BootstrapTable
            keyField="id"
            data={reservations}
            columns={columns}
            responsive
            striped={true}
            style={{
              overflow: "auto",
              display: "block",
              tableLayout: "auto"
            }}
          />
        )}
      </Card>
    </Container>
  );
}
