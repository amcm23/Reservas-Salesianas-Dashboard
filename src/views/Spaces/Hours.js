import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Badge, Alert, Row, Col } from "reactstrap";
import EditSpaceModal from "./EditSpaceModal";
import TypesModal from "./TypesModal";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchSpaces, deleteSpaces } from "../../actions/spaces";
import { fetchHoursBySpaceId } from "../../actions/hours";
import ReusableModal from "../../components/ReusableModal";
import AddHoursModal from "./AddHoursModal";

export default function Hours(props) {
  const [hours, setHours] = useState([{}]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    console.log("ESPACE ..>", props.space);
    props.space && fetchHoursBySpaceId(props.space.ID, res => setHours(res));
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
    //setSpaceToEdit(space);
  }

  function hideEdit() {
    setEditModal(false);
  }

  function handleHours(space) {
    //setHoursModal(true);
    //setCurrentSpace(space);
  }

  function optionsFormatter(cell, row) {
    return (
      <React.Fragment>
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
      <AddHoursModal
        showAddModalProps={() => setAddModal(!addModal)}
        modal={addModal}
        //fetchSpaces={() => fetchSpaces(res => setSpaces(res))}
      />
      <EditSpaceModal
        showAddModalProps={() => setEditModal(!editModal)}
        modal={editModal}
        // fetchSpaces={() => fetchSpaces(res => setSpaces(res))}
        hideModal={hideEdit}
        // space={spaceToEdit}
      />

      {hours === "No existen espacios/horarios en la BBDD con este ID." ? (
        <Alert color="warning">No hay horarios todavía</Alert>
      ) : (
        <Row>
          <Col>
            <div>LUNES</div>
            {hours.map(hour => {
              return hour.DIA === "1" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>MARTES</div>
            {hours.map(hour => {
              return hour.DIA === "2" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>MIERCOLES</div>
            {hours.map(hour => {
              return hour.DIA === "3" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>JUEVES</div>
            {hours.map(hour => {
              return hour.DIA === "4" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>VIERNES</div>
            {hours.map(hour => {
              return hour.DIA === "5" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>SÁBADO</div>
            {hours.map(hour => {
              return hour.DIA === "6" && <div>{hour.HORA}</div>;
            })}
          </Col>
          <Col>
            <div>DOMINGO</div>
            {hours.map(hour => {
              return (
                hour.DIA === "7" && (
                  <div>
                    {hour.DIA} - {hour.HORA}
                  </div>
                )
              );
            })}
          </Col>
        </Row>
      )}
    </Container>
  );
}
