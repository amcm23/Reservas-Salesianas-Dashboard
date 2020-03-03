import React from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserForm(props) {
  const { user } = props;
  console.log("user dentro del user form: ", user);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      dni: user && user.DNI,
      nombre: user && user.NOMBRE,
      papellido: user && user.P_APELLIDO,
      sapellido: user && user.S_APELLIDO,
      direccion: user && user.DIRECCION,
      email: user && user.EMAIL,
      telefono: user && user.TELEFONO,
      pass: user && user.PASS,
      admin: user && user.ADMIN
    }
  });
  const onSubmit = data => {
    console.log(data);

    if (user) {
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
            url: `https://reservas.rota.salesianas.com/public/usuarios.php/usuarios/modificar/${user.ID}`,
            data: {
              dni: data.dni,
              nombre: data.nombre,
              papellido: data.papellido,
              sapellido: data.sapellido,
              direccion: data.direccion,
              email: data.email,
              telefono: data.telefono,
              pass: data.pass,
              admin: data.admin,
              activo: true
            }
          }).then(res => {
            console.log(res);
            console.log(res.data);
            props.fetchUsers();
            props.showModal();
            Swal.fire({
              title: "Editado",
              text: "Usuario editado con éxito.",
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
        text: "Se creará el usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          axios({
            method: "post",
            url:
              "https://reservas.rota.salesianas.com/public/usuarios.php/usuarios",
            data: {
              dni: data.dni,
              nombre: data.nombre,
              papellido: data.papellido,
              sapellido: data.sapellido,
              direccion: data.direccion,
              email: data.email,
              telefono: data.telefono,
              pass: data.pass
            }
          }).then(res => {
            console.log(res);
            console.log(res.data);
            props.fetchUsers();
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
        <Col lg={2}>
          <h5>Datos de acceso</h5>
        </Col>
        <Col lg={10}>
          <Row>
            <Col md={2}>
              <Label>Email (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="email"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="ejemplo@mail.com"
                style={{ width: "100%" }}
              />
              {errors.email && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Repita el correo (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="email"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Repita el correo"
                style={{ width: "100%" }}
              />
              {errors.email && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Contraseña (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="pass"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Contraseña"
                style={{ width: "100%" }}
              />
              {errors.contraseña && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Repita la contraseña (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="repeatPass"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Repita la contraseña"
                style={{ width: "100%" }}
              />
              {errors.contraseña && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>
          </Row>
        </Col>

        <Col lg={12} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <hr></hr>
        </Col>

        <Col lg={2}>
          <h5>Datos Personales</h5>
        </Col>
        <Col lg={10}>
          <Row>
            <Col md={2}>
              <Label>DNI (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="dni"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="DNI"
                style={{ width: "100%" }}
              />
              {errors.dni && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Nombre (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="nombre"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Nombre"
                style={{ width: "100%" }}
              />
              {errors.nombre && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Primer Apellido (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="papellido"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Primer Apellido"
                style={{ width: "100%" }}
              />
              {errors.p_apellido && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Segundo Apellido (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="sapellido"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Segundo Apellido"
                style={{ width: "100%" }}
              />
              {errors.s_apellido && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Dirección (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="direccion"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Dirección"
                style={{ width: "100%" }}
              />
              {errors.direccion && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>

            <Col md={2}>
              <Label>Teléfono (*)</Label>
            </Col>
            <Col md={4}>
              <input
                name="telefono"
                defaultValue=""
                ref={register({ required: true })}
                placeholder="Teléfono"
                style={{ width: "100%" }}
              />
              {errors.telefono && (
                <span style={{ color: "red" }}>Campo obligatorio</span>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Button type="submit">Añadir Usuario</Button>
    </form>
  );
}
