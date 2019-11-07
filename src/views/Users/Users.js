import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Container, Button } from 'reactstrap'
import axios from 'axios'


export default function Users() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`https://reservas.rota.salesianas.com/usuarios.php/usuarios`)
    .then(res => {
      setUsers(res.data.data)
    })
  }, [])

  function typeFormatter(cell, row) {
      return (
        <span>
        {
          row.ADMIN === 1 ?
           "Administrador"
           :
           "Usuario"
        }
        </span>
      );
  }

  function optionsFormatter(cell, row) {
    return (
      <Button>Editar</Button>
    );
}

  const columns = [{
    dataField: 'ID',
    text: 'ID'
  }, {
    dataField: 'DNI',
    text: 'DNI'
  }, {
    dataField: 'NOMBRE',
    text: 'Nombre'
  }, {
    dataField: 'P_APELLIDO',
    text: '1er Apellido'
  }, {
    dataField: 'S_APELLIDO',
    text: '2º Apellido'
  }, {
    dataField: 'DIRECCION',
    text: 'Dirección'
  }, {
    dataField: 'EMAIL',
    text: 'Email'
  }, {
    dataField: 'TELEFONO',
    text: 'Teléfono'
  }, {
    dataField: 'ADMIN',
    text: 'Tipo',
    formatter: typeFormatter
  }, {
    dataField: '',
    text: 'Opciones',
    formatter: optionsFormatter
  }];

  return (
    <Container>
      <BootstrapTable keyField='id' data={ users } columns={ columns } responsive />
    </Container>
  )

}