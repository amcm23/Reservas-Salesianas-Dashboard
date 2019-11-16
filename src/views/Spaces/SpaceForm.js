import React from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function SpaceForm(props) {
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
        text: "Se editará el usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          axios({
            method: "put",
            url: `https://reservas.rota.salesianas.com/public/espacios.php/espacios/modificar/${space.ID}`,
            data: {
              nombre: data.nombre,
              precio: data.precio,
              tipo: data.tipo
            }
          }).then(res => {
            console.log(res);
            console.log(res.data);
            props.fetchSpaces();
            props.showModal();
            Swal.fire({
              title: "Editado",
              text: "Espacio editado con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
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
          axios({
            method: "post",
            url:
              "https://reservas.rota.salesianas.com/public/espacios.php/espacios",
            data: {
              nombre: data.nombre,
              precio: data.precio,
              tipo: data.tipo
            }
          }).then(res => {
            console.log(res);
            console.log(res.data);
            props.fetchSpaces();
            props.showModal();
            Swal.fire({
              title: "Registrado",
              text: "Usuario registrado con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      });
    }
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={2}>
          <Label>Nombre (*)</Label>
        </Col>
        <Col md={10}>
          <input
            name="nombre"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Nombre del espacio"
            style={{ width: "100%" }}
          />
          {errors.nombre && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>

        <Col md={2}>
          <Label>Precio (*)</Label>
        </Col>
        <Col md={10}>
          <input
            name="precio"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Precio"
            style={{ width: "100%" }}
          />
          {errors.precio && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>

        <Col md={2}>
          <Label>Tipo (*)</Label>
        </Col>
        <Col md={10}>
          <select name="tipo" ref={register}>
            {tipos !== "No existen tipos en la BBDD." &&
              tipos.map(tipo => {
                return <option value={tipo.ID}>{tipo.NOMBRE}</option>;
              })}
          </select>
          {errors.s_apellido && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>
      </Row>

      <Button type="submit">Añadir Espacio</Button>
    </form>
  );
}
