import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Controlpresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, validPresupuesto, setValidPresupuesto }) => {

    //Este es el estado para lo de disponible y gastadp
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    //Este es el estado de la grafica
    const [porcentaje, setPorcentaje] = useState(0);

    //Cada que gastos cambie va a estar corriendo este effec
    useEffect(() => {
        //Esta madre hace que funcione y automaticamente te lo suma
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        //Este calcula lo disponible que hay
        const totalDisponible = presupuesto - totalGastado
        //Calcular el porcentaje gastado para la grafica
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        //Este es para que imprima el total en el apartado de gastos y se este constantemente actualixando el estado de gasto y del disponible
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos]);

    const formatoDinero = (cantidad) => {
        //Este es la forma para darle estilos a una cantidad para que se vea bonito aca si de numero
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    //Esta madre es la que resetea todo 
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar el Planificador de Gastos?')
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setValidPresupuesto(false)

        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">

            {/* Esta parte del codigo es lo que hace la grafica */}
            <div>
                <CircularProgressbar value={porcentaje} styles={buildStyles({ trailColor: '#F5F5F5', pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6', textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6' })} text={porcentaje + '% Gastado'} />
            </div>

            <div className="contenido-presupuesto">
                <button className='reset-app' type='button' onClick={handleResetApp}>Resetear App</button>
                {/* Aqui es para que salga lo del presupuesto heredandolo */}
                <p><span>Presupuesto: </span>{formatoDinero(presupuesto)}</p>
                <p className={disponible < 0 ? 'negativo' : ''}><span>Disponible: </span>{formatoDinero(disponible)}</p>
                <p><span>Gastado: </span>{formatoDinero(gastado)}</p>


            </div>

        </div>
    );
}

export default Controlpresupuesto;
