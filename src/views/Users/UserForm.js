import React from 'react'
import useForm from 'react-hook-form'

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input name="email" defaultValue="" ref={register({ required: true })} placeholder="Email"/>
      {errors.email && <span>Campo obligatorio</span>}

      <input name="contraseña" defaultValue="" ref={register({ required: true })} placeholder="Contraseña"/>
      {errors.contraseña && <span>Campo obligatorio</span>}

      <hr></hr>
    
      <input name="dni" defaultValue="" ref={register({ required: true })} placeholder="DNI"/>
      {errors.dni && <span>Campo obligatorio</span>}

      <input name="nombre" defaultValue="" ref={register({ required: true })} placeholder="Nombre"/>
      {errors.nombre && <span>Campo obligatorio</span>}

      <input name="p_apellido" defaultValue="" ref={register({ required: true })} placeholder="Primer Apellido"/>
      {errors.p_apellido && <span>Campo obligatorio</span>}

      <input name="s_apellido" defaultValue="" ref={register({ required: true })} placeholder="Segundo Apellido"/>
      {errors.s_apellido && <span>Campo obligatorio</span>}

      <input name="direccion" defaultValue="" ref={register({ required: true })} placeholder="Dirección"/>
      {errors.direccion && <span>Campo obligatorio</span>}

      <input name="telefono" defaultValue="" ref={register({ required: true })} placeholder="Teléfono"/>
      {errors.telefono && <span>Campo obligatorio</span>}
      
    
      
      
      <input type="submit" />
    </form>
  )
}