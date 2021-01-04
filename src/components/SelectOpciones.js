import React, { useState } from 'react';


const SelectOpciones = ({opciones = [], fetching, initialValue, setCategoria}) => {
    
    // funcion que setea la caetegoria y guarda el valor en localstorage
    const cambiarCategoria = (e) =>{
        setCategoria(e.target.value)
        localStorage.setItem("lastSearch",JSON.stringify(e.target.value))
      
        
    }

    // si hay una o ninguna opcion mosramos el select en disabled
    if(opciones.length <= 1)  {
        return <select className="form-control" disabled
            >
            <option>Seleccionar</option>
            {opciones.map(opcion => (
            <option value={opcion} key={opcion} selected>
            {opcion}
            </option>))}
        </select>
    }

    
    // si hay mas de una opcion mostramos el select normalmente
     return( 
        
         <select 
         className="form-control"
         onChange={cambiarCategoria} 
         >
        <option>Seleccionar</option>
        
        { // iteracion que marca como selected si existe la prop de initial value en las opciones del select
        opciones.map(opcion => (
            opcion === initialValue
            
            ? <option value={opcion} key={opcion} selected> {opcion}</option>

            : <option value={opcion} key={opcion}> {opcion}</option>     
            ))}

        </select>
        
     );
}
 
export default SelectOpciones;