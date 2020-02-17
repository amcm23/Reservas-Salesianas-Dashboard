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
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>
              {/*<input
                name="monday"
                type="checkbox"
                checked={lunes}
                onChange={() => setLunes(!lunes)}
              />{" "}*/}
              Lunes
            </Col>
            {lunes ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setLunes(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario Mañana
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="lminm"
                        ref={register({ required: true })}
                        disabled={lunes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.lminm && (
                        <p style={{ color: "red" }}>{errors.lminm.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="lmaxm"
                        ref={register({ required: true })}
                        disabled={lunes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.lmaxm && (
                        <p style={{ color: "red" }}>{errors.lmaxm.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col>
                  Horario Tarde
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="lmint"
                        ref={register({ required: true })}
                        disabled={lunes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.lmint && (
                        <p style={{ color: "red" }}>{errors.lmint.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="lmaxt"
                        ref={register({ required: true })}
                        disabled={lunes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.lmaxt && (
                        <p style={{ color: "red" }}>{errors.lmaxt.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setLunes(true)}>Excluir</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row style={{ padding: 10 }}>
            <Col>
              {/*<input
                type="checkbox"
                checked={martes}
                onChange={() => setMartes(!martes)}
              />*/}
              Martes
            </Col>
            {martes ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setMartes(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario Mañana
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="mminm"
                        ref={register({ required: true })}
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.mminm && (
                        <p style={{ color: "red" }}>{errors.mminm.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="mmaxm"
                        ref={register({ required: true })}
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.mmaxm && (
                        <p style={{ color: "red" }}>{errors.mmaxm.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col>
                  Horario Tarde
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="mmint"
                        ref={register({ required: true })}
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.mmint && (
                        <p style={{ color: "red" }}>{errors.mmint.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="mmaxt"
                        ref={register({ required: true })}
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.mmaxt && (
                        <p style={{ color: "red" }}>{errors.mmaxt.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setMartes(true)}>Excluir</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>Miércoles</Col>
            {miercoles ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setMiercoles(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario Mañana
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="xminm"
                        ref={register({ required: true })}
                        disabled={miercoles}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.xminm && (
                        <p style={{ color: "red" }}>{errors.xminm.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="xmaxm"
                        ref={register({ required: true })}
                        disabled={miercoles}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.xmaxm && (
                        <p style={{ color: "red" }}>{errors.xmaxm.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col>
                  Horario Tarde
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="xmint"
                        ref={register({ required: true })}
                        disabled={miercoles}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.xmint && (
                        <p style={{ color: "red" }}>{errors.xmint.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="xmaxt"
                        ref={register({ required: true })}
                        disabled={miercoles}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.xmaxt && (
                        <p style={{ color: "red" }}>{errors.xmaxt.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setMiercoles(true)}>Excluir</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row style={{ padding: 10 }}>
            <Col>Jueves</Col>
            {jueves ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setJueves(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario Mañana
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="jminm"
                        ref={register({ required: true })}
                        disabled={jueves}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.jminm && (
                        <p style={{ color: "red" }}>{errors.jminm.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="jmaxm"
                        ref={register({ required: true })}
                        disabled={jueves}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.jmaxm && (
                        <p style={{ color: "red" }}>{errors.jmaxm.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col>
                  Horario Tarde
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="jmint"
                        ref={register({ required: true })}
                        disabled={jueves}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.jmint && (
                        <p style={{ color: "red" }}>{errors.jmint.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="jmaxt"
                        ref={register({ required: true })}
                        disabled={jueves}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.jmaxt && (
                        <p style={{ color: "red" }}>{errors.jmaxt.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setJueves(true)}>Excluir</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>Viernes</Col>
            {martes ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setViernes(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario Mañana
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="vminm"
                        ref={register({ required: true })}
                        disabled={viernes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.vminm && (
                        <p style={{ color: "red" }}>{errors.vminm.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="vmaxm"
                        ref={register({ required: true })}
                        disabled={viernes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.vmaxm && (
                        <p style={{ color: "red" }}>{errors.vmaxm.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col>
                  Horario Tarde
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="vmint"
                        ref={register({ required: true })}
                        disabled={viernes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.vmint && (
                        <p style={{ color: "red" }}>{errors.vmint.message}</p>
                      )}
                    </Col>
                    <Col>
                      Hora máx:
                      <select
                        name="vmaxt"
                        ref={register({ required: true })}
                        disabled={viernes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return <option value={hour}>{hour}</option>;
                        })}
                      </select>
                      {errors.vmaxt && (
                        <p style={{ color: "red" }}>{errors.vmaxt.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setViernes(true)}>Excluir</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
        </React.Fragment>
      )}

      {sameHour === "1" && (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>
              <div>Lunes a Viernes</div>
            </Col>
            <Col>
              Horario Mañana
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="lvminm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lvminm && (
                    <p style={{ color: "red" }}>{errors.lvminm.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="lvmaxm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lvmaxm && (
                    <p style={{ color: "red" }}>{errors.lvmaxm.message}</p>
                  )}
                </Col>
              </Row>
            </Col>

            <Col>
              Horario Tarde
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="lvmint"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lvmint && (
                    <p style={{ color: "red" }}>{errors.lvmint.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="lvmaxt"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.lvmaxt && (
                    <p style={{ color: "red" }}>{errors.lvmaxt.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      )}
      {sameHour === "2" && (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>
              <div>Lunes a Domingo</div>
            </Col>
            <Col>
              Horario Mañana
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="ldminm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.ldminm && (
                    <p style={{ color: "red" }}>{errors.ldminm.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="ldmaxm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.ldmaxm && (
                    <p style={{ color: "red" }}>{errors.ldmaxm.message}</p>
                  )}
                </Col>
              </Row>
            </Col>

            <Col>
              Horario Tarde
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="ldmint"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.ldmint && (
                    <p style={{ color: "red" }}>{errors.ldmint.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="ldmaxt"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.ldmaxt && (
                    <p style={{ color: "red" }}>{errors.ldmaxt.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      )}
      {sameHour !== "2" && sabado ? (
        <React.Fragment>
          <Col>Deshabilitado</Col>
          <Col>
            <Button onClick={() => setMartes(false)}>Incluir</Button>
          </Col>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Row style={{ padding: 10 }}>
            <Col>Sábado</Col>
            <Col>
              Horario Mañana
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="sminm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.sminm && (
                    <p style={{ color: "red" }}>{errors.sminm.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="smaxm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.smaxm && (
                    <p style={{ color: "red" }}>{errors.smaxm.message}</p>
                  )}
                </Col>
              </Row>
            </Col>

            <Col>
              Horario Tarde
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="smint"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.smint && (
                    <p style={{ color: "red" }}>{errors.smint.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="smaxt"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.smaxt && (
                    <p style={{ color: "red" }}>{errors.smaxt.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <Button onClick={() => setSabado(true)}>Excluir</Button>
            </Col>
          </Row>
        </React.Fragment>
      )}

      {sameHour !== "2" && domingo ? (
        <React.Fragment>
          <Col>Deshabilitado</Col>
          <Col>
            <Button onClick={() => setMartes(false)}>Incluir</Button>
          </Col>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>
              {/*<input
                type="checkbox"
                checked={domingo}
                onChange={() => setDomingo(!domingo)}
              />*/}
              Domingo
            </Col>
            <Col>
              Horario Mañana
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="dminm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.dminm && (
                    <p style={{ color: "red" }}>{errors.dminm.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="dmaxm"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.dmaxm && (
                    <p style={{ color: "red" }}>{errors.dmaxm.message}</p>
                  )}
                </Col>
              </Row>
            </Col>

            <Col>
              Horario Tarde
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="dmint"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.dmint && (
                    <p style={{ color: "red" }}>{errors.dmint.message}</p>
                  )}
                </Col>
                <Col>
                  Hora máx:
                  <select
                    name="dmaxt"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour}>{hour}</option>;
                    })}
                  </select>
                  {errors.dmaxt && (
                    <p style={{ color: "red" }}>{errors.dmaxt.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <Button onClick={() => setMartes(true)}>Excluir</Button>
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
