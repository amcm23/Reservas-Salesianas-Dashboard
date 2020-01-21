import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { editSpaces, createSpace } from "../../actions/spaces";

export default function HoursForm(props) {
  const { space, tipos } = props;
  const [sameHour, setSameHour] = useState("0");
  console.log("space dentro del space form: ", space);

  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const hourChecker = data => {
    return (
      (!lunes && data.lmin >= data.lmax) ||
      (!martes && data.mmin >= data.mmax) ||
      (!miercoles && data.xmin >= data.xmax) ||
      (!jueves && data.jmin >= data.jmax) ||
      (!viernes && data.vmin >= data.vmax) ||
      (!sabado && data.smin >= data.smax) ||
      (!domingo && data.dmin >= data.dmax) ||
      data.lvmin >= data.lvmax ||
      data.ldmin >= data.ldmax
    );
  };
  const { register, handleSubmit, errors, setError } = useForm();
  const onSubmit = data => {
    console.log(data);
    if (!lunes && data.lmin >= data.lmax) {
      setError("lmin", "err", errHoraMinMax);
      setError("lmax", "err", errHoraMaxMin);
    }
    if (!martes && data.mmin >= data.mmax) {
      setError("mmin", "err", errHoraMinMax);
      setError("mmax", "err", errHoraMaxMin);
    }
    if (!miercoles && data.xmin >= data.xmax) {
      setError("xmin", "err", errHoraMinMax);
      setError("xmax", "err", errHoraMaxMin);
    }
    if (!jueves && data.jmin >= data.jmax) {
      setError("jmin", "err", errHoraMinMax);
      setError("jmax", "err", errHoraMaxMin);
    }
    if (!viernes && data.vmin >= data.vmax) {
      setError("vmin", "err", errHoraMinMax);
      setError("vmax", "err", errHoraMaxMin);
    }
    if (!sabado && data.smin >= data.smax) {
      setError("smin", "err", errHoraMinMax);
      setError("smax", "err", errHoraMaxMin);
    }
    if (!domingo && data.dmin >= data.dmax) {
      setError("dmin", "err", errHoraMinMax);
      setError("dmax", "err", errHoraMaxMin);
    }
    if (data.lvmin >= data.lvmax) {
      setError("lvmin", "err", errHoraMinMax);
      setError("lvmax", "err", errHoraMaxMin);
    }
    if (data.ldmin >= data.ldmax) {
      setError("ldmin", "err", errHoraMinMax);
      setError("ldmax", "err", errHoraMaxMin);
    }
    console.log("errors --> ", hourChecker(data));
    if (!hourChecker(data) && space) {
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
    } else if (!hourChecker(data)) {
      Swal.fire({
        title: "¿Desea confirmar el horario?",
        text: "Se creará el horario.",
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

  const hoursOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
  ];

  function handleSameHour(e) {
    console.log("E --> ", e.target.value);
    setSameHour(e.target.value);
  }

  useEffect(() => {
    console.log("SAME HOUR ---> ", sameHour);
  }, [sameHour]);

  const errHoraMinMax = "La hora min. no puede ser igual o superior a la max.";
  const errHoraMaxMin = "La hora max. no puede ser igual o inferior a la min.";

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Mismo horario para: </label>
        <select
          onChange={e => handleSameHour(e)}
          value={sameHour}
          style={{ marginLeft: 5 }}
        >
          <option value={0}>Ningún día</option>
          <option value={1}>Lunes a Viernes</option>
          <option value={2}>Toda la semana</option>
        </select>
      </div>
      {sameHour === "0" && (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <input
                name="monday"
                type="checkbox"
                checked={lunes}
                onChange={() => setLunes(!lunes)}
              />{" "}
              Lunes
            </Col>
            {lunes ? (
              <Col>Deshabilitado</Col>
            ) : (
              <React.Fragment>
                <Col>
                  Hora min:
                  <select
                    name="lmin"
                    ref={register({ required: true })}
                    disabled={lunes}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lmin && (
                    <p style={{ color: "red" }}>{errors.lmin.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="lmax"
                    ref={register({ required: true })}
                    disabled={lunes}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lmax && (
                    <p style={{ color: "red" }}>{errors.lmax.message}</p>
                  )}
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row>
            <Col>
              <input
                type="checkbox"
                checked={martes}
                onChange={() => setMartes(!martes)}
              />
              Martes
            </Col>
            {martes ? (
              <Col>Deshabilitado</Col>
            ) : (
              <React.Fragment>
                <Col>
                  Hora min:
                  <select
                    name="mmin"
                    ref={register({ required: true })}
                    disabled={martes}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.mmin && (
                    <p style={{ color: "red" }}>{errors.mmin.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="mmax"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                    disabled={martes}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.mmax && (
                    <p style={{ color: "red" }}>{errors.mmax.message}</p>
                  )}
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <input
                type="checkbox"
                checked={miercoles}
                onChange={() => setMiercoles(!miercoles)}
              />
              Miércoles
            </Col>
            <Col>
              Hora min:
              <select
                name="xmin"
                ref={register({ required: true })}
                disabled={miercoles}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.xmin && (
                <p style={{ color: "red" }}>{errors.xmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="xmax"
                ref={register({ required: true })}
                disabled={miercoles}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.xmax && (
                <p style={{ color: "red" }}>{errors.xmax.message}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="checkbox"
                checked={jueves}
                onChange={() => setJueves(!jueves)}
              />
              Jueves
            </Col>
            <Col>
              Hora min:
              <select
                name="jmin"
                ref={register({ required: true })}
                disabled={jueves}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.jmin && (
                <p style={{ color: "red" }}>{errors.jmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="jmax"
                ref={register({ required: true })}
                disabled={jueves}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.jmax && (
                <p style={{ color: "red" }}>{errors.jmax.message}</p>
              )}
            </Col>
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <input
                type="checkbox"
                checked={viernes}
                onChange={() => setViernes(!viernes)}
              />
              Viernes
            </Col>
            <Col>
              Hora min:
              <select
                name="vmin"
                ref={register({ required: true })}
                disabled={viernes}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.vmin && (
                <p style={{ color: "red" }}>{errors.vmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="vmax"
                ref={register({ required: true })}
                disabled={viernes}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.vmax && (
                <p style={{ color: "red" }}>{errors.vmax.message}</p>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}

      {sameHour === "1" && (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <div>Lunes a Viernes</div>
            </Col>
            <Col>
              Hora min:
              <select
                name="lvmin"
                ref={register({ required: true })}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.lvmin && (
                <p style={{ color: "red" }}>{errors.lvmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="lvmax"
                ref={register({ required: true })}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.lvmax && (
                <p style={{ color: "red" }}>{errors.lvmax.message}</p>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}
      {sameHour === "2" && (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <div>Lunes a Domingo</div>
            </Col>
            <Col>
              Hora min:
              <select
                name="ldmin"
                ref={register({ required: true })}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.ldmin && (
                <p style={{ color: "red" }}>{errors.ldmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="ldmax"
                ref={register({ required: true })}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.ldmax && (
                <p style={{ color: "red" }}>{errors.ldmax.message}</p>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}
      {sameHour !== "2" && (
        <React.Fragment>
          <Row>
            <Col>
              <input
                type="checkbox"
                checked={sabado}
                onChange={() => setSabado(!sabado)}
              />
              Sábado
            </Col>
            <Col>
              Hora min:
              <select
                name="smin"
                ref={register({ required: true })}
                disabled={sabado}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.smin && (
                <p style={{ color: "red" }}>{errors.smin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="smax"
                ref={register({ required: true })}
                disabled={sabado}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.smax && (
                <p style={{ color: "red" }}>{errors.smax.message}</p>
              )}
            </Col>
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0" }}>
            <Col>
              <input
                type="checkbox"
                checked={domingo}
                onChange={() => setDomingo(!domingo)}
              />
              Domingo
            </Col>
            <Col>
              Hora min:
              <select
                name="dmin"
                ref={register({ required: true })}
                disabled={domingo}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.dmin && (
                <p style={{ color: "red" }}>{errors.dmin.message}</p>
              )}
            </Col>
            <Col>
              Hora máx:
              <select
                name="dmax"
                ref={register({ required: true })}
                disabled={domingo}
                style={{ marginLeft: 5 }}
              >
                {hoursOptions.map(hour => {
                  return <option value={hour}>{hour}</option>;
                })}
              </select>
              {errors.dmax && (
                <p style={{ color: "red" }}>{errors.dmax.message}</p>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}

      <Button type="submit" color="primary" style={{ marginTop: "1.5rem" }}>
        {space ? "Editar" : "Añadir"} Horario
      </Button>
    </form>
  );
}
