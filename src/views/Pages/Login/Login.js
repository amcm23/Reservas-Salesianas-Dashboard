import React, { Component } from "react";
import useForm from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../../actions/auth";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import jwt_decode from "jwt-decode";

function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    login(data, res => {
      if (res === "No existen usuario en la BBDD con este ID.") {
        alert("Usuario no autorizado");
      } else {
        var decoded = jwt_decode(res.permiso);
        console.log("DECODED ---> ", decoded.id);
        localStorage.setItem("auth", res.permiso);
        localStorage.setItem("currentUser", JSON.stringify(decoded));
        props.history.push("/dashboard");
      }
    });
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-muted">Inicia sesión en tu cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <input
                        type="text"
                        autoComplete="username"
                        name="email"
                        defaultValue=""
                        ref={register({ required: true })}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <span style={{ color: "red" }}>Campo obligatorio</span>
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
                        name="password"
                        defaultValue=""
                        ref={register({ required: true })}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                      {errors.password && (
                        <span style={{ color: "red" }}>Campo obligatorio</span>
                      )}
                    </InputGroup>

                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" type="submit">
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Registrarse</h2>
                    <p>
                      Si aún no tienes una cuenta puedes registrarte totalmente
                      gratis pulsando aquí.
                    </p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Regístrate aquí
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
