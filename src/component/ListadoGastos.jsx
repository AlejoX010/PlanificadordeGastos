import { useState } from 'react';
import Gasto from './Gasto';


const Listadogastos = ({ gastos, setGastoEditar, eliminarGastos, filtro, gastosFiltrados }) => {
    return (
        <div className="listado-gastos contenedor" >
            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos'}</h2>

            {
                filtro ? (gastosFiltrados.map((gasto) => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGastos={eliminarGastos}
                    />
                ))):(gastos.map((gasto) => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGastos={eliminarGastos}
                    />
                )))}

         

        </div>
    );
}

export default Listadogastos;
