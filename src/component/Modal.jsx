import { useState, useEffect } from 'react';
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({ setModal, animarM, setAnimarM, guardarGastos, gastoEditar, setGastoEditar }) => {

    //Estado que te arroja el mensaje de que todos los campos son obligatorios en el formulario
    const [mensaje, setMensaje] = useState('');

    //Aqui empezamos con los cambios de estados del formulario 
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    

    //Este se efec para que se muestre el editar en el modal
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [gastoEditar]);

    //Aqui lo pone falso para cerrar el modal
    const cerrarModal = () => {
        setModal(false)
        setAnimarM(false)
        setGastoEditar({})
    }
    //Este es el evento que tendra cuando se mande el boton del formulario...
    const handleSummit = (e) => {
        e.preventDefault()
        //Validar el formulario significa que si lo de adentro el arreglo es igual a '' que retorne el valor
        if (nombre === "" || cantidad === 0 && cantidad === "" || categoria === "") {
            setMensaje('Favor de llenar todos los campos')
            //Una mamada para tema de animacion
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }

        guardarGastos({ nombre, cantidad, categoria, id, fecha })

    }


    return (
        <div className="modal">
            {/* Este es para cerrar el modal */}
            <div className="cerrar-modal">
                <img src={CerrarModal} alt="Cerrar Modal" onClick={cerrarModal} />
            </div>

            {/* Aqui cuidado por que es una super fumada para poderle da una animcion para que aparezca en un segundo ya que tambine cuenta con codigo css que hay que checar */}
            <form onSubmit={handleSummit} className={`formulario ${animarM ? "animar" : ""}`}>

                {/* Aqui de va a poner una condicinal para cuando sea edirae el modal no muestre nuevo gasto si no, editar gasto */}
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {/* Este es el mensaje para cuando no esten los campos llenos  */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input id="nombre" type="text" placeholder="Gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input id="cantidad" type="number" placeholder="Cantidad"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                {/* Aqui de va a poner una condicinal para cuando sea edirae el modal no muestre nuevo gasto si no, editar gasto */}
                <input type="submit" value={gastoEditar.nombre ? 'Aceptar' : 'Añadir Gasto'} />


            </form>

        </div>
    );
}

export default Modal;
