import Controlpresupuesto from "./ControlPresupuesto";
import Nuevopresupuesto from "./NuevoPresupuesto";


//Aqui es para depositarlos se meten en el parentesis de la funcion esas son las props
const Header = ({ presupuesto, setPresupuesto, validPresupuesto, setValidPresupuesto, gastos, setGastos }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {/* Si el presupuesto es valido entonces vas a retornar un parrafo ?=entonces :=else */}
            {validPresupuesto ? (
                <Controlpresupuesto
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setGastos={setGastos}
                setValidPresupuesto={setValidPresupuesto}
                validPresupuesto={validPresupuesto}
                />
            ) : (
                /* Aqui es como que chupa los datos del estado para depositarlos en otra parte */
                < Nuevopresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setValidPresupuesto={setValidPresupuesto}
                />

            )}


        </header>
    );
}

export default Header;
