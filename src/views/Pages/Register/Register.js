import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardGroup
} from "reactstrap";
import useForm from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { login } from "../../../actions/auth";
import jwt_decode from "jwt-decode";

function Register(props) {
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = data => {
    console.log(data);
    if (data.email !== data.repeatEmail) {
      console.log("EMAILS DOESNT MATCHs");
      setError("repeatEmail", "notMatch", "emails dont match");
    }
    if (data.pass !== data.repeatPass) {
      console.log("PASS DOESNT MATCHs");
      setError("repeatPass", "notMatch", "pass dont match");
    }
    if (data.email === data.repeatEmail && data.pass === data.repeatPass) {
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
        login(
          {
            email: data.email,
            password: data.pass
          },
          res => {
            var decoded = jwt_decode(res.permiso);
            console.log("DECODED ---> ", decoded.id);
            localStorage.setItem("auth", res.permiso);
            localStorage.setItem("currentUser", JSON.stringify(decoded));
            props.history.push("/dashboard");
          }
        );
      });
    }
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <CardGroup>
          <Row className="justify-content-center">
            <Col md="4">
              <Card className="text-white bg-primary py-5 d-md-down-none">
                <CardBody className="text-center">
                  <div>
                    <h2>Iniciar sesión</h2>
                    <p>
                      Si ya tienes una cuenta puedes iniciar sesión pulsando
                      aquí.
                    </p>
                    <Link to="/login">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Inicia sesión aquí
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody className="p-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Regístrate</h1>
                    <p className="text-muted">Crea tu cuenta</p>
                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Email"
                          />
                          {errors.email && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="email"
                            name="repeatEmail"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Repita email"
                          />
                          {errors.repeatEmail && (
                            <span style={{ color: "red" }}>
                              Los emails no coinciden
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="password"
                            autoComplete="new-password"
                            name="pass"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Contraseña"
                          />
                          {errors.pass && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="password"
                            autoComplete="new-password"
                            name="repeatPass"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Repita Contraseña"
                          />
                          {errors.repeatPass && (
                            <span style={{ color: "red" }}>
                              Las contraseñas no coinciden
                            </span>
                          )}
                        </InputGroup>
                      </Col>

                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Nom.</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="name"
                            name="nombre"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Nombre"
                          />
                          {errors.nombre && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Ap. 1</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="surname"
                            name="papellido"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Primer apellido"
                          />
                          {errors.papellido && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Ap. 2</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="surname"
                            name="sapellido"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Segundo apellido"
                          />
                          {errors.sapellido && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>DNI</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="dni"
                            name="dni"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="DNI"
                          />
                          {errors.dni && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Dir.</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="address"
                            name="direccion"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Dirección"
                          />
                          {errors.direccion && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Tlf</InputGroupText>
                          </InputGroupAddon>
                          <input
                            autoComplete="telephone"
                            name="telefono"
                            defaultValue=""
                            ref={register({ required: true })}
                            placeholder="Teléfono"
                          />
                          {errors.telefono && (
                            <span style={{ color: "red" }}>
                              Campo obligatorio
                            </span>
                          )}
                        </InputGroup>
                      </Col>
                    </Row>
                    <Button
                      color="success"
                      block
                      type="submit"
                      style={{ marginTop: "1rem" }}
                    >
                      Crear cuenta
                    </Button>
                  </form>
                </CardBody>
                {/*<CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
    </CardFooter>*/}
              </Card>
            </Col>
          </Row>
        </CardGroup>
      </Container>
    </div>
  );
}

export default Register;
