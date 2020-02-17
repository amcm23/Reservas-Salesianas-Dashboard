import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import Swal from "sweetalert2";
import moment from "moment";
import {
  createReservation,
  editReservation,
  createHistoric
} from "../../actions/reservations";

export default function ReservationForm(props) {
  const { usuarios, espacios, reservation, hour, day, space } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      usuario: reservation && reservation.USUARIO,
      espacio: space ? space : reservation && reservation.ESPACIO,
      fecha: day
        ? moment(day).format("YYYY-MM-DD")
        : reservation && reservation.FECHA,
      hora: hour ? hour : reservation && reservation.HORA
    }
  });
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

  const onSubmit = data => {
    console.log(data);

    if (reservation) {
      Swal.fire({
        title: "¿Desea confirmar la edición?",
        text: "Se editará .",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          editReservation(
            {
              usuario:
                currentUser && currentUser.admin === "1"
                  ? data.usuario
                  : currentUser.id,
              espacio: data.espacio,
              fecha: data.fecha,
              hora: data.hora
            },
            reservation.ID,
            () => {
              props.fetchReservations();
              props.showModal();
              Swal.fire({
                title: "Editada",
                text: "Reserva editada con éxito.",
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
        title: "¿Desea confirmar?",
        text: "Se creará la reserva.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          createReservation(
            {
              usuario:
                currentUser && currentUser.admin === "1"
                  ? data.usuario
                  : currentUser.id,
              espacio: data.espacio,
              fecha: data.fecha,
              hora: data.hora
            },
            () => {
              createHistoric({
                usuario:
                  currentUser && currentUser.admin === "1"
                    ? data.usuario
                    : currentUser.id,
                espacio: data.espacio,
                fecha: data.fecha,
                hora: data.hora
              });
              props.fetchReservations();
              props.showModal();
              Swal.fire({
                title: "Creada",
                text: "Reserva creada con éxito.",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {currentUser && currentUser.admin === "1" && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        <Col md={2}>
          <Label>Espacio (*)</Label>
        </Col>
        <Col md={10}>
          <select name="espacio" ref={register} disabled={space ? true : false}>
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
            disabled={day ? true : false}
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
            disabled={hour ? true : false}
          />
          {errors.hora && (
            <span style={{ color: "red" }}>Campo obligatorio</span>
          )}
        </Col>
      </Row>

      <Button type="submit">{reservation ? "Editar" : "Crear"} Reserva</Button>
    </form>
  );
}
