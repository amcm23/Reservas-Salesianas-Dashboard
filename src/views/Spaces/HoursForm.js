import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { Row, Col, Button, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { editSpaces, createSpace } from "../../actions/spaces";
import { createHour } from "../../actions/hours";
import ReusableModal from "../../components/ReusableModal";

export default function HoursForm(props) {
  const { space, tipos } = props;
  const [sameHour, setSameHour] = useState("0");
  console.log("space dentro del space form: ", space);
  const [excludeHoursModal, setExcludeHoursModal] = useState(false);
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);
  const [currentDay, setCurrentDay] = useState();
  const [excludedL, setExcludedL] = useState([]);
  const [excludedM, setExcludedM] = useState([]);
  const [excludedX, setExcludedX] = useState([]);
  const [excludedJ, setExcludedJ] = useState([]);
  const [excludedV, setExcludedV] = useState([]);
  const [excludedS, setExcludedS] = useState([]);
  const [excludedD, setExcludedD] = useState([]);
  const [excludedLV, setExcludedLV] = useState([]);
  const [excludedLD, setExcludedLD] = useState([]);

  const hourChecker = data => {
    return (
      (!lunes && parseInt(data.lmin) >= parseInt(data.lmax)) ||
      (!martes && parseInt(data.mmin) >= parseInt(data.mmax)) ||
      (!miercoles && parseInt(data.xmin) >= parseInt(data.xmax)) ||
      (!jueves && parseInt(data.jmin) >= parseInt(data.jmax)) ||
      (!viernes && parseInt(data.vmin) >= parseInt(data.vmax)) ||
      (!sabado && parseInt(data.smin) >= parseInt(data.smax)) ||
      (!domingo && parseInt(data.dmin) >= parseInt(data.dmax)) ||
      parseInt(data.lvmin) >= parseInt(data.lvmax) ||
      parseInt(data.ldmin) >= parseInt(data.ldmax)
    );
  };
  const { register, handleSubmit, errors, setError } = useForm();
  const onSubmit = data => {
    console.log(data, lunes);
    if (!lunes && parseInt(data.lmin) >= parseInt(data.lmax)) {
      setError("lmin", "err", errHoraMinMax);
      setError("lmax", "err", errHoraMaxMin);
    }
    if (!martes && parseInt(data.mmin) >= parseInt(data.mmax)) {
      setError("mmin", "err", errHoraMinMax);
      setError("mmax", "err", errHoraMaxMin);
    }
    if (!miercoles && parseInt(data.xmin) >= parseInt(data.xmax)) {
      setError("xmin", "err", errHoraMinMax);
      setError("xmax", "err", errHoraMaxMin);
    }
    if (!jueves && parseInt(data.jmin) >= parseInt(data.jmax)) {
      setError("jmin", "err", errHoraMinMax);
      setError("jmax", "err", errHoraMaxMin);
    }
    if (!viernes && parseInt(data.vmin) >= parseInt(data.vmax)) {
      setError("vmin", "err", errHoraMinMax);
      setError("vmax", "err", errHoraMaxMin);
    }
    if (!sabado && parseInt(data.smin) >= parseInt(data.smax)) {
      setError("smin", "err", errHoraMinMax);
      setError("smax", "err", errHoraMaxMin);
    }
    if (!domingo && parseInt(data.dmin) >= parseInt(data.dmax)) {
      setError("dmin", "err", errHoraMinMax);
      setError("dmax", "err", errHoraMaxMin);
    }
    if (sameHour === "1" && parseInt(data.lvmin) >= parseInt(data.lvmax)) {
      setError("lvmin", "err", errHoraMinMax);
      setError("lvmax", "err", errHoraMaxMin);
    }
    if (sameHour === "2" && parseInt(data.ldmin) >= parseInt(data.ldmax)) {
      setError("ldmin", "err", errHoraMinMax);
      setError("ldmax", "err", errHoraMaxMin);
    }
    console.log("errors --> ", hourChecker(data));
    if (!hourChecker(data) && space) {
      Swal.fire({
        title: "¿Desea confirmar el horario?",
        text: "Se creará el horario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        cancelButtonColor: ""
      }).then(result => {
        if (result.value) {
          console.log(data);
          if (data.lvmin && data.lvmax) {
            createHour(
              {
                dias: [1, 2, 3, 4, 5],
                espacio: parseInt(space),
                horamin: parseInt(data.lvmin),
                horamax: parseInt(data.lvmax),
                borrado: []
              },
              () => props.fetchHours()
            );
            createHour(
              {
                dias: [6],
                espacio: parseInt(space),
                horamin: parseInt(data.smin),
                horamax: parseInt(data.smax),
                borrado: []
              },
              () => props.fetchHours()
            );
            createHour(
              {
                dias: [7],
                espacio: parseInt(space),
                horamin: parseInt(data.dmin),
                horamax: parseInt(data.dmax),
                borrado: []
              },
              () => props.fetchHours()
            );
          } else if (data.ldmin && data.ldmax) {
            createHour(
              {
                dias: [1, 2, 3, 4, 5, 6, 7],
                espacio: parseInt(space),
                horamin: parseInt(data.ldmin),
                horamax: parseInt(data.ldmax),
                borrado: []
              },
              () => props.fetchHours()
            );
          } else {
            if (data.lmin && data.lmax) {
              console.log("lunes -->", excludedL);
              createHour(
                {
                  dias: [1],
                  espacio: parseInt(space),
                  horamin: parseInt(data.lmin),
                  horamax: parseInt(data.lmax),
                  borrado: [{ dia: 1, horas: excludedL }]
                },
                () => props.fetchHours()
              );
            }
            if (data.mmin && data.mmax) {
              createHour(
                {
                  dias: [2],
                  espacio: parseInt(space),
                  horamin: parseInt(data.mmin),
                  horamax: parseInt(data.mmax),
                  borrado: [{ dia: 2, horas: excludedM }]
                },
                () => props.fetchHours()
              );
            }
            if (data.xmin && data.xmax) {
              createHour(
                {
                  dias: [3],
                  espacio: parseInt(space),
                  horamin: parseInt(data.xmin),
                  horamax: parseInt(data.xmax),
                  borrado: [{ dia: 3, horas: excludedX }]
                },
                () => props.fetchHours()
              );
            }
            if (data.jmin && data.jmax) {
              createHour(
                {
                  dias: [4],
                  espacio: parseInt(space),
                  horamin: parseInt(data.jmin),
                  horamax: parseInt(data.jmax),
                  borrado: [{ dia: 4, horas: excludedJ }]
                },
                () => props.fetchHours()
              );
            }
            if (data.vmin && data.vmax) {
              createHour(
                {
                  dias: [5],
                  espacio: parseInt(space),
                  horamin: parseInt(data.vmin),
                  horamax: parseInt(data.vmax),
                  borrado: [{ dia: 5, horas: excludedV }]
                },
                () => props.fetchHours()
              );
            }
            if (data.smin && data.smax) {
              createHour(
                {
                  dias: [6],
                  espacio: parseInt(space),
                  horamin: parseInt(data.smin),
                  horamax: parseInt(data.smax),
                  borrado: []
                },
                () => props.fetchHours()
              );
            }
            if (data.dmin && data.dmax) {
              createHour(
                {
                  dias: [7],
                  espacio: parseInt(space),
                  horamin: parseInt(data.dmin),
                  horamax: parseInt(data.dmax),
                  borrado: []
                },
                () => props.fetchHours()
              );
            }
          }
        }
      });
    }
  };

  const hoursOptions = [
    { title: "00:00", value: 0 },
    { title: "01:00", value: 1 },
    { title: "02:00", value: 2 },
    { title: "03:00", value: 3 },
    { title: "04:00", value: 4 },
    { title: "05:00", value: 5 },
    { title: "06:00", value: 6 },
    { title: "07:00", value: 7 },
    { title: "08:00", value: 8 },
    { title: "09:00", value: 9 },
    { title: "10:00", value: 10 },
    { title: "11:00", value: 11 },
    { title: "12:00", value: 12 },
    { title: "13:00", value: 13 },
    { title: "14:00", value: 14 },
    { title: "15:00", value: 15 },
    { title: "16:00", value: 16 },
    { title: "17:00", value: 17 },
    { title: "18:00", value: 18 },
    { title: "19:00", value: 19 },
    { title: "20:00", value: 20 },
    { title: "21:00", value: 21 },
    { title: "22:00", value: 22 },
    { title: "23:00", value: 23 }
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

  function handleExcludeHours(day) {
    setExcludeHoursModal(true);
    setCurrentDay(day);
  }
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
                  Horario
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="lmin"
                        ref={register({ required: true })}
                        disabled={lunes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
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
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
                        })}
                      </select>
                      {errors.lmax && (
                        <p style={{ color: "red" }}>{errors.lmax.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setLunes(true)}>
                    Excluir día completo
                  </Button>
                </Col>
               {/* {/*<Col>
                  <Button onClick={() => handleExcludeHours("lunes")}>
                    Horas Excluidas
                  </Button>
               </Col>*/}
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
                  Horario
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="mmin"
                        ref={register({ required: true })}
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
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
                        disabled={martes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
                        })}
                      </select>
                      {errors.mmax && (
                        <p style={{ color: "red" }}>{errors.mmax.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setMartes(true)}>
                    Excluir día completo
                  </Button>
                </Col>
                {/*{/*<Col>
                  <Button onClick={() => handleExcludeHours("martes")}>
                    Horas Excluidas
                  </Button>
                </Col>*/}
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
                  Horario
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="xmin"
                        ref={register({ required: true })}
                        disabled={miercoles}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
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
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
                        })}
                      </select>
                      {errors.xmax && (
                        <p style={{ color: "red" }}>{errors.xmax.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setMiercoles(true)}>
                    Excluir día completo
                  </Button>
                </Col>
                {/*<Col>
                  <Button onClick={() => handleExcludeHours("miercoles")}>
                    Horas Excluidas
                  </Button>
                </Col>*/}
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
                  Horario
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="jmin"
                        ref={register({ required: true })}
                        disabled={jueves}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
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
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
                        })}
                      </select>
                      {errors.jmax && (
                        <p style={{ color: "red" }}>{errors.jmax.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setJueves(true)}>
                    Excluir día completo
                  </Button>
                </Col>
                {/*<Col>
                  <Button onClick={() => handleExcludeHours("jueves")}>
                    Horas Excluidas
                  </Button>
                </Col>*/}
              </React.Fragment>
            )}
          </Row>
          <Row style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
            <Col>Viernes</Col>
            {viernes ? (
              <React.Fragment>
                <Col>Deshabilitado</Col>
                <Col>
                  <Button onClick={() => setViernes(false)}>Incluir</Button>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col>
                  Horario
                  <Row>
                    <Col>
                      Hora min:
                      <select
                        name="vmin"
                        ref={register({ required: true })}
                        disabled={viernes}
                        style={{ marginLeft: 5 }}
                      >
                        {hoursOptions.map(hour => {
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
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
                          return (
                            <option value={hour.value}>{hour.title}</option>
                          );
                        })}
                      </select>
                      {errors.vmax && (
                        <p style={{ color: "red" }}>{errors.vmax.message}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button onClick={() => setViernes(true)}>
                    Excluir día completo
                  </Button>
                </Col>
                {/*<Col>
                  <Button onClick={() => handleExcludeHours("viernes")}>
                    Horas Excluidas
                  </Button>
                </Col>*/}
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
              Horario
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="lvmin"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour.value}>{hour.title}</option>;
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
                      return <option value={hour.value}>{hour.title}</option>;
                    })}
                  </select>
                  {errors.lvmax && (
                    <p style={{ color: "red" }}>{errors.lvmax.message}</p>
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
              Horario
              <Row>
                <Col>
                  Hora min:
                  <select
                    name="ldmin"
                    ref={register({ required: true })}
                    style={{ marginLeft: 5 }}
                  >
                    {hoursOptions.map(hour => {
                      return <option value={hour.value}>{hour.title}</option>;
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
                      return <option value={hour.value}>{hour.title}</option>;
                    })}
                  </select>
                  {errors.ldmax && (
                    <p style={{ color: "red" }}>{errors.ldmax.message}</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      )}
      {sameHour !== "2" ? (
        sameHour !== "2" && sabado ? (
          <Row>
            <Col>
              {/*<input
      type="checkbox"
      checked={domingo}
      onChange={() => setDomingo(!domingo)}
    />*/}
              Sábado
            </Col>
            <Col>Deshabilitado</Col>
            <Col>
              <Button onClick={() => setSabado(false)}>Incluir</Button>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <Row style={{ padding: 10 }}>
              <Col>Sábado</Col>
              <Col>
                Horario
                <Row>
                  <Col>
                    Hora min:
                    <select
                      name="smin"
                      ref={register({ required: true })}
                      style={{ marginLeft: 5 }}
                    >
                      {hoursOptions.map(hour => {
                        return <option value={hour.value}>{hour.title}</option>;
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
                      style={{ marginLeft: 5 }}
                    >
                      {hoursOptions.map(hour => {
                        return <option value={hour.value}>{hour.title}</option>;
                      })}
                    </select>
                    {errors.smax && (
                      <p style={{ color: "red" }}>{errors.smax.message}</p>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Button onClick={() => setSabado(true)}>
                  Excluir día completo
                </Button>
              </Col>
              {/*<Col>
                <Button onClick={() => handleExcludeHours("sabado")}>
                  Horas Excluidas
                </Button>
              </Col>*/}
            </Row>
          </React.Fragment>
        )
      ) : null}
      {sameHour !== "2" ? (
        sameHour !== "2" && domingo ? (
          <Row>
            <Col>
              {/*<input
          type="checkbox"
          checked={domingo}
          onChange={() => setDomingo(!domingo)}
        />*/}
              Domingo
            </Col>
            <Col>Deshabilitado</Col>
            <Col>
              <Button onClick={() => setDomingo(false)}>Incluir</Button>
            </Col>
          </Row>
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
                Horario
                <Row>
                  <Col>
                    Hora min:
                    <select
                      name="dmin"
                      ref={register({ required: true })}
                      style={{ marginLeft: 5 }}
                    >
                      {hoursOptions.map(hour => {
                        return <option value={hour.value}>{hour.title}</option>;
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
                      style={{ marginLeft: 5 }}
                    >
                      {hoursOptions.map(hour => {
                        return <option value={hour.value}>{hour.title}</option>;
                      })}
                    </select>
                    {errors.dmax && (
                      <p style={{ color: "red" }}>{errors.dmax.message}</p>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Button onClick={() => setDomingo(true)}>
                  Excluir día completo
                </Button>
              </Col>
              {/*<Col>
                <Button onClick={() => handleExcludeHours("domingo")}>
                  Horas Excluidas
                </Button>
              </Col>*/}
            </Row>
          </React.Fragment>
        )
      ) : null}
      <Button type="submit" color="primary" style={{ marginTop: "1.5rem" }}>
        Añadir Horario
      </Button>
      <ReusableModal
        modal={excludeHoursModal}
        close={() => setExcludeHoursModal(false)}
        title={"Horas excluídas"}
        content={
          <div>
            <select
              name="lmin"
              ref={register({ required: true })}
              disabled={lunes}
              style={{ marginLeft: 5 }}
              onChange={e => {
                console.log("currentD --> ", currentDay);
                switch (currentDay) {
                  case "lunes":
                    setExcludedL([...excludedL, e.target.value]);
                    console.log(excludedL);
                    break;

                  case "martes":
                    setExcludedM([...excludedM, e.target.value]);
                    break;
                  case "miercoles":
                    setExcludedX([...excludedX, e.target.value]);
                    break;
                  case "jueves":
                    setExcludedJ([...excludedJ, e.target.value]);
                    break;
                  case "viernes":
                    setExcludedV([...excludedV, e.target.value]);
                    break;
                  case "sabado":
                    setExcludedS([...excludedS, e.target.value]);
                    break;
                  case "domingo":
                    setExcludedD([...excludedD, e.target.value]);
                    break;
                  case "lunesviernes":
                    setExcludedLV([...excludedLV, e.target.value]);
                    break;
                  case "lunesdomingo":
                    setExcludedLD([...excludedLD, e.target.value]);
                    break;

                  default:
                    break;
                }
              }}
            >
              {hoursOptions.map(hour => {
                return <option value={hour.value}>{hour.title}</option>;
              })}
            </select>
            {currentDay && currentDay === "lunes"
              ? excludedL.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "martes"
              ? excludedM.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "miercoles"
              ? excludedX.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "jueves"
              ? excludedJ.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "viernes"
              ? excludedV.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "sabado"
              ? excludedS.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "domingo"
              ? excludedD.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "lunesviernes"
              ? excludedLV.map(hour => {
                  return "|" + hour + "|";
                })
              : currentDay === "lunesdomingo" &&
                excludedLD.map(hour => {
                  return "|" + hour + "|";
                })}
          </div>
        }
      />
    </form>
  );
}
