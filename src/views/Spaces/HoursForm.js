import React from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { editSpaces, createSpace } from "../../actions/spaces";

export default function HoursForm(props) {
  const { space, tipos } = props;
  console.log("space dentro del space form: ", space);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      nombre: space && space.NOMBRE,
      precio: space && space.PRECIO,
      tipo: space && space.TIPO
    }
  });
  const onSubmit = data => {
    console.log(data);

    if (space) {
      Swal.fire({
        title: "¿Desea confirmar la edición?",
        text: "Se editará el espacio.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          editSpaces(
            {
              nombre: data.nombre,
              precio: data.precio,
              tipo: data.tipo
            },
            space.ID,
            () => {
              props.fetchSpaces();
              props.showModal();
              Swal.fire({
                title: "Editado",
                text: "Espacio editado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: "¿Desea confirmar el registro?",
        text: "Se creará el espacio.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          createSpace(
            {
              nombre: data.nombre,
              precio: data.precio,
              tipo: data.tipo,
              centro: 1
            },
            () => {
              props.fetchSpaces();
              props.showModal();
              Swal.fire({
                title: "Registrado",
                text: "Usuario registrado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      });
    }
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <div>Lunes</div>
        </Col>
        <Col>
          Hora min:
          <input
            name="recargo"
            defaultValue="0"
            ref={register({ required: false })}
            placeholder="Recargo"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Button type="submit" color="primary" style={{ marginTop: "1.5rem" }}>
        {space ? "Editar" : "Añadir"} Horario
      </Button>
    </form>
  );
}
