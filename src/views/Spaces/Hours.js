import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Container,
  Button,
  Badge,
  Alert,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import EditSpaceModal from "./EditSpaceModal";
import TypesModal from "./TypesModal";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchSpaces, deleteSpaces } from "../../actions/spaces";
import {
  fetchHoursBySpaceId,
  deleteHour,
  createHour,
  activeHour
} from "../../actions/hours";
import ReusableModal from "../../components/ReusableModal";
import AddHoursModal from "./AddHoursModal";
import { FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

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
          props.space &&
            fetchHoursBySpaceId(props.space.ID, res => setHours(res));
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

  function handleDeleteHour(id) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el horario?",
      text: "Esta acción será irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: ""
    }).then(result => {
      if (result.value) {
        deleteHour(
          {
            espacio: parseInt(props.space.ID),
            dia: id
          },
          () => fetchHoursBySpaceId(props.space.ID, res => setHours(res))
        );
      }
    });
  }

  function handleHour(hour) {
    console.log("hora --> ", hour);
    if (hour.DISPONIBLE === "0") {
      console.log("ACTIVATE");
      activeHour(
        {
          espacio: parseInt(hour.ESPACIO),
          dia: hour.DIA,
          hora: hour.HORA
        },
        () => fetchHoursBySpaceId(props.space.ID, res => setHours(res))
      );
    } else {
      createHour(
        {
          dias: [hour.DIA],
          espacio: parseInt(hour.ESPACIO),
          horamin: parseInt(hour.HORA),
          horamax: parseInt(hour.HORA),
          borrado: [{ dia: hour.DIA, horas: [hour.HORA] }]
        },
        () => fetchHoursBySpaceId(props.space.ID, res => setHours(res))
      );
    }
  }

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
        space={props.space}
        modal={addModal}
        fetchHours={() => {
          fetchHoursBySpaceId(props.space.ID, res => setHours(res));
          setAddModal(false);
        }}
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
          <Col md="3">
            <Card>
              <CardHeader
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flex: 1
                }}
              >
                LUNES{" "}
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(1)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "1" && (
                      <Card
                        style={
                          hour.DISPONIBLE === "1"
                            ? {
                                backgroundColor: "rgba(0,0,0,0)",
                                margin: 5,
                                border: 1,
                                borderColor: "",
                                textAlign: "center"
                              }
                            : {
                                backgroundColor: "#d9dbda",
                                margin: 5,
                                border: 1,
                                borderColor: "gray",
                                textAlign: "center"
                              }
                        }
                      >
                        <div
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {" "}
                          {hour.HORA}
                          <Button
                            style={{
                              backgroundColor: "rgba(0,0,0,0)",
                              border: 0
                            }}
                            onClick={() => handleHour(hour)}
                          >
                            {hour.DISPONIBLE === "1" ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                MARTES
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(2)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "2" && (
                      <Card
                      style={
                        hour.DISPONIBLE === "1"
                          ? {
                              backgroundColor: "rgba(0,0,0,0)",
                              margin: 5,
                              border: 1,
                              borderColor: "",
                              textAlign: "center"
                            }
                          : {
                              backgroundColor: "#d9dbda",
                              margin: 5,
                              border: 1,
                              borderColor: "gray",
                              textAlign: "center"
                            }
                      }
                    >
                      <div
                        style={{
                          flex: 1,
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {" "}
                        {hour.HORA}
                        <Button
                          style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            border: 0
                          }}
                          onClick={() => handleHour(hour)}
                        >
                          {hour.DISPONIBLE === "1" ? (
                            <MdCheckBox />
                          ) : (
                            <MdCheckBoxOutlineBlank />
                          )}
                        </Button>
                      </div>
                    </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                MIERCOLES
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(3)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "3" && (
                      <Card
                        style={
                          hour.DISPONIBLE === "1"
                            ? {
                                backgroundColor: "rgba(0,0,0,0)",
                                margin: 5,
                                border: 1,
                                borderColor: "",
                                textAlign: "center"
                              }
                            : {
                                backgroundColor: "#d9dbda",
                                margin: 5,
                                border: 1,
                                borderColor: "gray",
                                textAlign: "center"
                              }
                        }
                      >
                        <div
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {" "}
                          {hour.HORA}
                          <Button
                            style={{
                              backgroundColor: "rgba(0,0,0,0)",
                              border: 0
                            }}
                            onClick={() => handleHour(hour)}
                          >
                            {hour.DISPONIBLE === "1" ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                JUEVES
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(4)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "4" && (
                      <Card
                        style={
                          hour.DISPONIBLE === "1"
                            ? {
                                backgroundColor: "rgba(0,0,0,0)",
                                margin: 5,
                                border: 1,
                                borderColor: "",
                                textAlign: "center"
                              }
                            : {
                                backgroundColor: "#d9dbda",
                                margin: 5,
                                border: 1,
                                borderColor: "gray",
                                textAlign: "center"
                              }
                        }
                      >
                        <div
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {" "}
                          {hour.HORA}
                          <Button
                            style={{
                              backgroundColor: "rgba(0,0,0,0)",
                              border: 0
                            }}
                            onClick={() => handleHour(hour)}
                          >
                            {hour.DISPONIBLE === "1" ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                VIERNES
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(5)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "5" && (
                      <Card
                      style={
                        hour.DISPONIBLE === "1"
                          ? {
                              backgroundColor: "rgba(0,0,0,0)",
                              margin: 5,
                              border: 1,
                              borderColor: "",
                              textAlign: "center"
                            }
                          : {
                              backgroundColor: "#d9dbda",
                              margin: 5,
                              border: 1,
                              borderColor: "gray",
                              textAlign: "center"
                            }
                      }
                    >
                      <div
                        style={{
                          flex: 1,
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {" "}
                        {hour.HORA}
                        <Button
                          style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            border: 0
                          }}
                          onClick={() => handleHour(hour)}
                        >
                          {hour.DISPONIBLE === "1" ? (
                            <MdCheckBox />
                          ) : (
                            <MdCheckBoxOutlineBlank />
                          )}
                        </Button>
                      </div>
                    </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                SÁBADO
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(6)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "6" && (
                      <Card
                        style={
                          hour.DISPONIBLE === "1"
                            ? {
                                backgroundColor: "rgba(0,0,0,0)",
                                margin: 5,
                                border: 1,
                                borderColor: "",
                                textAlign: "center"
                              }
                            : {
                                backgroundColor: "#d9dbda",
                                margin: 5,
                                border: 1,
                                borderColor: "gray",
                                textAlign: "center"
                              }
                        }
                      >
                        <div
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {" "}
                          {hour.HORA}
                          <Button
                            style={{
                              backgroundColor: "rgba(0,0,0,0)",
                              border: 0
                            }}
                            onClick={() => handleHour(hour)}
                          >
                            {hour.DISPONIBLE === "1" ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardHeader>
                DOMINGO
                <Button
                  color="rgba(0,0,0,0)"
                  onClick={() => handleDeleteHour(7)}
                >
                  <FaTrash />
                </Button>
              </CardHeader>
              <CardBody>
                {hours.map(hour => {
                  return (
                    hour.DIA === "7" && (
                      <Card
                        style={
                          hour.DISPONIBLE === "1"
                            ? {
                                backgroundColor: "rgba(0,0,0,0)",
                                margin: 5,
                                border: 1,
                                borderColor: "",
                                textAlign: "center"
                              }
                            : {
                                backgroundColor: "#d9dbda",
                                margin: 5,
                                border: 1,
                                borderColor: "gray",
                                textAlign: "center"
                              }
                        }
                      >
                        <div
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {" "}
                          {hour.HORA}
                          <Button
                            style={{
                              backgroundColor: "rgba(0,0,0,0)",
                              border: 0
                            }}
                            onClick={() => handleHour(hour)}
                          >
                            {hour.DISPONIBLE === "1" ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  );
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
