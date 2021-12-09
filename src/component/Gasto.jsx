import React from 'react';

//Aqui importamos lo que instyalamos para el slider
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css'

//Importes de las imagenes
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

//Se crea un diccionario de los iconos para que se asocien con sus correspondientes componentes
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

//Esto es para que aoarezca los gastos que se guardan
const Gasto = ({ gasto, setGastoEditar, eliminarGastos }) => {

    //Aqui es para que la fecha salga toda wapa
    const formatearFecha = fecha => {
        const fechaNueva = new Date(fecha)
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }

        return fechaNueva.toLocaleDateString('es-ES', opciones)
    }
    //Esto de hace para estaece ahorrando en poner el gasto.varoable y solo mandarlo a llamar por la variable
    const { categoria, nombre, cantidad, id, fecha } = gasto

    //Estas funciones son las necesarias para que haga la animacion de deslizarse
    const leadingActions = () => {
        return (
            <LeadingActions>
                {/* Este es para que llene los lo del estado de editar con los de gastos y es tan dinamico que automaticamnete lo hace con el que es de cada id */}
                <SwipeAction onClick={() => setGastoEditar(gasto)}>
                    Editar
                </SwipeAction>
            </LeadingActions>
        )

    }
    //Los parentesis en vez de llave significan el return y ps te lo ahorras
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => eliminarGastos(id)}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )




    return (
        //Estas madres son para las animaciones de los sliders de izquierda a derecha
        <SwipeableList>
            <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <div className="gasto sombra" >
                    <div className="contenido-gasto" >
                        {/* Asi con esto y el objeto nos ahorramos de estar poniendo condicionales para que muestre la imagen dependiendo de su categoria */}
                        <img src={diccionarioIconos[categoria]} alt="Imagen de la categoria" />
                        <div className="descripcion-gasto" >
                            <p className="categoria" >{categoria}</p> {/*Aqui estan los ejemplos*/}
                            <p className="nombre-gasto" >{nombre}</p>
                            <p className="fecha-gasto" >Agregado el: <span>{formatearFecha(fecha)}</span></p>
                        </div>
                    </div>
                    <p className="cantidad-gasto" >${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default Gasto;
