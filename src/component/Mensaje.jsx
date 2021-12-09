
const Mensaje = ({children, tipo}) => {
    return (
        //Componentes que pasa diferentes tipos sepa la madre pa que es 
        <div className={`alerta ${tipo}`}>{children}
            
        </div>
    );
}

export default Mensaje;
