import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Alert } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function Spaces(props) {
  const [reservations, setReservations] = useState([{}]);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    var currUser = localStorage.getItem("currentUser")
    console.log("CURRENT USOR --> ", currUser);
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
      console.log("currentUser ELSE --> ", currentUser);
      setCurrentUser(currentUser);
    }
  }, []);

  function fetchHistory() {
    axios.get(`https://florente.salesianas.es/historicos`).then(res => {
      setReservations(res.data);
      console.log("reservas: ", res.data);
    });
    console.log("reservas: ", reservations);
  }

  const columns = [
    {
      dataField: "usuario",
      text: "Usuario"
    },
    {
      dataField: "espacio",
      text: "Espacio"
    },
    {
      dataField: "fecha",
      text: "Fecha"
    },
    {
      dataField: "hora",
      text: "Hora"
    }
  ];

  return (
    <Container>
      <h2>Historico de reservas</h2>
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
    </Container>
  );
}
