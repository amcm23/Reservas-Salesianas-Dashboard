import axios from "axios";

export function fetchHoursBySpaceId(id, done = () => {}) {
  axios
    .get(
      ` https://reservas.rota.salesianas.com/public/horarios.php/horarios/${id}`
    )
    .then(res => {
      done(res.data);
      console.log("horarios del espacio ", id, " --->", res.data);
    });
}
