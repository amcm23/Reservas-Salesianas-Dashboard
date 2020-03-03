import axios from "axios";

export function fetchHoursBySpaceId(id, done = () => {}) {
  axios
    .get(
      `https://reservas.rota.salesianas.com/public/horarios.php/horarios/${id}`
    )
    .then(res => {
      done(res.data);
      console.log("horarios del espacio ", id, " --->", res.data);
    });
}

export function createHour(data, done = () => {}) {
  axios({
    method: "post",
    url: `https://reservas.rota.salesianas.com/public/horarios.php/horarios/post`,
    data: data
  }).then(res => {
    done(res.data);
    console.log("horarios del espacio ", data.id, " --->", res.data);
  });
}

export function deleteHour(data, done = () => {}) {
  axios({
    method: "post",
    url: `https://reservas.rota.salesianas.com/public/horarios.php/horarios/delete`,
    data: data
  }).then(res => {
    done(res.data);
    console.log("horarios del espacio ", data.id, " --->", res.data);
  });
}

export function activeHour(data, done = () => {}) {
  axios({
    method: "post",
    url: `https://reservas.rota.salesianas.com/public/horarios.php/horarios/habilitar`,
    data: data
  }).then(res => {
    done(res.data);
    console.log("horarios del espacio ", data.id, " --->", res.data);
  });
}
