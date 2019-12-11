import axios from "axios";

export function fetchUsers(done = () => {}) {
  axios
    .get(`https://reservas.rota.salesianas.com/public/usuarios.php/usuarios`)
    .then(res => {
      done(res.data);
    });
}
