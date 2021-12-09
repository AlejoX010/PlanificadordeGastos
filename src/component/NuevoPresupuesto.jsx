import { useState } from "react";
import Mensaje from "./Mensaje";



const Nuevopresupuesto = ({ presupuesto, setPresupuesto, setValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('');

    //Aqui se hara para validad el presupuesto para ver si no hay letras o cantidad menor a 0
    const handlePresupuesto = (e) => {
        e.preventDefault();//Para que haga el evento

        //Aqui se pone una condicional para que acepte puro numero
        if (!presupuesto || presupuesto < 0) {
            setMensaje('Presupuesto no valido');
            return
        }
        //Aqui es para si cuando mete un presupuesto erroneo y luego mete uno valido no hay necesidad de recargar la pagina 
        setMensaje('')
        setValidPresupuesto(true)



    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            {/* El onSumit es para que cuando se interactue con el type sumbmid haga lo que esta entre parentesis */}
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input className="nuevo-presupuesto" type="number" placeholder='Cantidad'
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />
                {/* Todo esto es pa que te salga un mensaje de que no es valido */}
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <footer>
                <p> &copy;Anuar Hernandez</p>
            </footer>
            </form>

        
        </div>
    );
}

export default Nuevopresupuesto;
