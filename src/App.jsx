import { useState, useEffect } from "react";
import Header from "./component/Header"
import Listadogastos from "./component/ListadoGastos";
import Modal from "./component/Modal";
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './component/Filtros'


function App() {
  //Aqui se ponen los estados que se usan en mas de un componenete
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [validPresupuesto, setValidPresupuesto] = useState(false);
  //Madre para el modal
  const [modal, setModal] = useState(false);
  const [animarM, setAnimarM] = useState(false);
  //Madre para cuando si te acepte un gasto del modal
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  //Este es el estado que se usa para mostrar en el modal el gasto que se va a utilizar
  const [gastoEditar, setGastoEditar] = useState({});
  //Este es el estado para el filtro
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //Este effect es para escuchar al de editar
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)


      //Una mamada para tema de animacion
      setTimeout(() => {
        setAnimarM(true)
      }, 200)
    }
  }, [gastoEditar]);

  //Este va a correr cuanbdo presupuesto cambie y es el que se usara para guardar en el localstoraje
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  //Este otro es para que no se vea en la pantalla el usefec
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setValidPresupuesto(true)
    }
  }, []);

  //Este otro tambien es para guardar las cosas pero ahora de los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  //Este efec es para el filtro
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    //Una mamada para tema de animacion
    setTimeout(() => {
      setAnimarM(true)
    }, 200)
  }

  //Esta madre es para generer un id aleatorio que no es importante cuando tengamos la base de datos
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const guardarGastos = (gasto) => {
    //Aqui se crea una condicional que para cuando se guarde el gasto editado se guarde en el mismo y no genere uno nuevo
    if (gasto.id) {
      //Gasto modificado
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      //Nuevo gasto 
      gasto.id = generarId()
      //Este es para dar la fecha exacta 
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    //Esta madre es para que cuando se guarden los cambios de cierre el modal
    setAnimarM(false)
    setTimeout(() => {
      setModal(false)
    }, 500)

  }
  //Esto es para eliminar con el slider 
  const eliminarGastos = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }


  return (
    //Condicional muy importante a la hora de poner modales junto con la clase de los estilos fijar
    <div className={modal ? 'fijar' : ''}>
      {/* Aqui es como que chupa los datos del estado para depositarlos en otra parte */}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validPresupuesto={validPresupuesto}
        setValidPresupuesto={setValidPresupuesto}
      />

      {validPresupuesto ? (
        <>
          {/* Este cacho es para empexar el listado de los gastos */}
          <main>
            {/* <Filtros filtro={filtro} setFiltro={setFiltro} /> */}
            <Listadogastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGastos={eliminarGastos} gastosFiltrados={gastosFiltrados} filtro={filtro} />
          </main>
          
          <footer>
            <p> &copy;Anuar Hernandez</p>
          </footer>

          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
        </>
      ) : null}

      {/* Este es el cacho de codigo que muestra el modal */}
      {modal && <Modal setModal={setModal} animarM={animarM} setAnimarM={setAnimarM} guardarGastos={guardarGastos} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar} />}


    </div>
  )
}

export default App
