import React,{useState, useEffect} from 'react'
import './App.css';
import SelectOpciones from './components/SelectOpciones';
import axios from 'axios'
import ListOfDrinks from './components/ListOfDrinks'
import Spinner from './components/Spinner'

function App() {

  const [state, setState] = useState({
    fetching: false,
    options: [],
    
  })  

  const {fetching, options } = state; 

  const [categoriaSeleccionada , setCategoria] = useState("");

  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  

  useEffect(()  => {

      if(!categoriaSeleccionada){
 
      const cargarCategorias  = async () => {

         setState({...state, fetching: true})
         const respuesta = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)

      
          const {drinks} = respuesta.data
          const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
          setCategoria(lastSearch)
          let opc = [];
          drinks.map(drink => opc.push(drink.strCategory) );

          setState({...state, options: opc, fetching: false})
      }
      cargarCategorias();
      }else {
        
          const cargarResultados = async () =>{
         
          const resultado = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoriaSeleccionada}`)
          console.log('resultado')
          console.log(resultado.data.drinks)
          setResultadoBusqueda(resultado.data.drinks)
      
        }

        cargarResultados()
      }

      //eslint-disable-next-line
  }, [categoriaSeleccionada])

  const dejarUnaOpcion = () =>{

    if(categoriaSeleccionada){
     
      const op = [categoriaSeleccionada] 
      setState({...state, options: op})
      
    }
    
  }

  const borrarBusqueda = () =>{
    setCategoria("")
    setResultadoBusqueda("")
    localStorage.removeItem('lastSearch');
  }
  
  return (

    <div className="App bg-gradient-danger">
      <div className="container col-6 pt-4 mt-3"> 
      <h1>EJERCICIO DATCOM</h1>
      {!fetching ? 
         <div>

          <SelectOpciones
            opciones={options}
            initialValue={categoriaSeleccionada}
            setCategoria={setCategoria} 
            />
   
           <div className="d-flex pt-3 align-items-start">
   
             <button
             className="btn btn-primary mr-2"
             onClick={()=>setState({...state, options: []})}
             >Quitar opciones</button>
             <button
             className="btn btn-warning mr-2"
             onClick={dejarUnaOpcion}
             >Dejar como unica opcion</button>
   
             <button
             className="btn btn-danger"
             onClick={borrarBusqueda}
             >
             Borrar Busqueda </button>
           </div>
   
         </div>
      : <Spinner/> } 
     


      </div>
      
      
      {resultadoBusqueda
      ? 
        <div className="mt-4">
        <ListOfDrinks drinks={resultadoBusqueda}/>
        </div>
    
      : null}
    </div>
  );
}

export default App;

