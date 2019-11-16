import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Modal,
  Button,
  Alert,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import useForm from "react-hook-form";
import { FaTrashAlt, FaCentercode } from "react-icons/fa";

export default function Types(props) {
  const { register, handleSubmit, errors } = useForm();

  const [types, setTypes] = useState([{}]);
  const { modal, showModal } = props;

  useEffect(() => {
    fetchTypes();
  }, []);

  const onSubmit = data => {
    console.log(data);
    axios({
      method: "post",
      url: `https://reservas.rota.salesianas.com/public/tipos.php/tipos`,
      data: {
        nombre: data.name
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
      fetchTypes();
      Swal.fire({
        title: "Añadido",
        text: "El tipo de espacio ha sido añadido con éxito.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };

  function fetchTypes() {
    axios
      .get(`https://reservas.rota.salesianas.com/public/tipos.php/tipos`)
      .then(res => {
        setTypes(res.data);
        console.log("TIPOS: ", res.data);
      });
    console.log("TIPOS: ", types);
  }

  function handleDelete(id) {
    console.log("deleting: ", id);
    Swal.fire({
      title: "¿Está seguro que desea eliminar el tipo de espacio?",
      text:
        "Esta acción será irreversible (si hay un espacio asignado a este tipo, no podrá eliminarse hasta que no haya ningún espacio con este tipo asignado).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: ""
    }).then(result => {
      if (result.value) {
        axios
          .delete(
            `https://reservas.rota.salesianas.com/public/tipos.php/tipos/delete/${id}`
          )
          .then(result => {
            fetchTypes();
            Swal.fire({
              title: "Eliminado",
              text: "Tipo de espacio eliminado con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }

  function optionsFormatter(cell, row) {
    return (
      <React.Fragment>
        <Button
          color="danger"
          onClick={() => handleDelete(row.ID)}
          style={{ marginBottom: "0.5rem" }}
        >
          <FaTrashAlt />
        </Button>
      </React.Fragment>
    );
  }

  const columns = [
    {
      dataField: "NOMBRE",
      text: "Nombre",
      align: "left",
      headerAlign: "left",
      style: { size: 100 }
    },
    {
      dataField: "",
      text: "Opciones",
      align: "right",
      headerAlign: "right",
      style: { size: 100 },
      formatter: optionsFormatter
    }
  ];

  return (
    <Modal isOpen={modal} toggle={showModal} size="md">
      <ModalHeader toggle={showModal}>Tipos de espacios</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={9} sm={9}>
              <input
                name="name"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Nombre del tipo"
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={3} sm={3}>
              <Button
                type="submit"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
                color="primary"
              >
                Añadir
              </Button>
            </Col>
          </Row>

          {types === "No existen tipos en la BBDD." ? (
            <Alert color="warning">No hay tipos de espacios todavía</Alert>
          ) : (
            <BootstrapTable
              keyField="id"
              data={types}
              columns={columns}
              responsive
              stripped={true}
              bordered={false}
            />
          )}
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={showModal}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
