import React, { useState } from 'react';


const SelectOpciones = ({opciones = [], fetching, initialValue, setCategoria}) => {
   
    const cambiarCategoria = (e) =>{
        console.log(e.target.value)
        setCategoria(e.target.value)
        localStorage.setItem("lastSearch",JSON.stringify(e.target.value))
      
        
    }

    
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

    
    
     return( 
        
         <select 
         className="form-control"
         onChange={cambiarCategoria} 
         >
        <option>Seleccionar</option>

        {opciones.map(opcion => (
            opcion === initialValue

            ? <option value={opcion} key={opcion} selected> {opcion}</option>

            : <option value={opcion} key={opcion}> {opcion}</option>     
            ))}

        </select>
        
     );
}
 
export default SelectOpciones;