import React,{useState, useEffect} from 'react'
import './App.css';
import SelectOpciones from './components/SelectOpciones';
import axios from 'axios'
import ListOfDrinks from './components/ListOfDrinks'
import Spinner from './components/Spinner'

function App() {


  // Estado inicial, fetching para saber cuando esta cargando, y las opciones
  const [state, setState] = useState({
    fetching: false,
    options: [],
    
  })  

  const {fetching, options } = state; 

  // Categoria seleccionada para pasar como prop de initial value 
  // Se recupera la ultima categoria buscada desde local storage 
  const [categoriaSeleccionada , setCategoria] = useState("");


  // resultado de la api
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  

  useEffect(()  => {

      // si no hay una categoria seleccionada seteamos las categorias desde la API
      if(!categoriaSeleccionada){
 
      const cargarCategorias  = async () => {

         setState({...state, fetching: true})
         // consultar la api
          const respuesta = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
    
          const {drinks} = respuesta.data

          // en el caso de existir, se guarda la ultima busqueda en el state
          const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
          setCategoria(lastSearch)

          // guardamos las categorias de la respuesta de la api
          let opc = [];
          drinks.map(drink => opc.push(drink.strCategory) );

          setState({...state, options: opc, fetching: false})
      }

      cargarCategorias();


      }else {

          // funcion que setea los resultados de la busqueda por esa categoria
          const cargarResultados = async () =>{
         
          const resultado = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoriaSeleccionada}`)
          
          setResultadoBusqueda(resultado.data.drinks)
      
          }

        cargarResultados()
      }

      //eslint-disable-next-line
  }, [categoriaSeleccionada])


  // Funcion que deja como unica opcion del select a la categoria seleccionada
  const dejarUnaOpcion = () =>{

    if(categoriaSeleccionada){
     
      const op = [categoriaSeleccionada] 
      setState({...state, options: op})
      
    }
    
  }


  // funcion que borra la busqueda realizada
  const borrarBusqueda = () =>{
    setCategoria("")
    setResultadoBusqueda("")
    localStorage.removeItem('lastSearch');
  }
  
  return (

    <div className="App bg-gradient-danger">
      <div className="container col-6 pt-4 mt-3"> 
      <h1>EJERCICIO DATCOM</h1>
      {!fetching
      
      
        ? <div>
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
      ? <div className="mt-4">
        <ListOfDrinks drinks={resultadoBusqueda}/>
        </div>
    
      : null}
    </div>
  );
}


export default App;