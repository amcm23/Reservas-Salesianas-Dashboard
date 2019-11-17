import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { DatePicker } from "react-datepicker";
import moment from "moment";

export default function ReservationForm(props) {
  const { space, usuarios, espacios } = props;
  console.log("space dentro del space form: ", space);
  const [fecha, setFecha] = useState("");
  const { register, handleSubmit, setValue, errors } = useForm({
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
        text: "Se editará .",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          axios({
            method: "put",
            url: `https://reservas.rota.salesianas.com/public/reservas.php/reservas/modificar/${space.ID}`,
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
        title: "¿Desea confirmar?",
        text: "Se creará la reserva.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          axios({
            method: "post",
            url:
              "https://reservas.rota.salesianas.com/public/reservas.php/reservas",
            data: {
              usuario: data.usuario,
              espacio: data.espacio,
              fecha: data.fecha,
              hora: data.hora
            }
          }).then(res => {
            console.log(res);
            console.log(res.data);
            props.fetchReservations();
            props.showModal();
            Swal.fire({
              title: "Creada",
              text: "Reserva creada con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={2}>
          <Label>Usuario (*)</Label>
        </Col>
        <Col md={10}>
          <select name="usuario" ref={register}>
            {usuarios !== "No existen usuarios en la BBDD." &&
              usuarios.map(usuario => {
                return <option value={usuario.ID}>{usuario.NOMBRE}</option>;
              })}
          </select>
          {errors.usuario && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>

        <Col md={2}>
          <Label>Espacio (*)</Label>
        </Col>
        <Col md={10}>
          <select name="espacio" ref={register}>
            {espacios !== "No existen espacios en la BBDD." &&
              espacios.map(espacio => {
                return <option value={espacio.ID}>{espacio.NOMBRE}</option>;
              })}
          </select>
          {errors.espacio && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>

        <Col md={2}>
          <Label>Fecha (*)</Label>
        </Col>
        <Col md={10}>
          <input
            type="date"
            name="fecha"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Fecha"
            style={{ width: "100%" }}
          />
          {errors.fecha && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>

        <Col md={2}>
          <Label>Hora (*)</Label>
        </Col>
        <Col md={10}>
          <input
            type="time"
            name="hora"
            defaultValue=""
            ref={register({ required: true })}
            placeholder="Fecha"
            style={{ width: "100%" }}
          />
          {errors.hora && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>
      </Row>

      <Button type="submit">{space ? "Editar" : "Crear"} Reserva</Button>
    </form>
  );
}
