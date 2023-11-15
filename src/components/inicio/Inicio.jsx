import { BiJoystick } from 'react-icons/bi';
import fondo from '../../assets/fondo.jpg';
import { Link } from 'react-router-dom';

const Inicio = ({todosLosJuegos}) => {

    return (
        <main className="main_inicio" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${fondo})` }}>

            <section className='main_inicio_presentacion'>
                <span>Busca tu juego favorito</span>
                <h2>El mejor lugar para encontrar tus juegos</h2>
                <p> En nuestro sitio ofrecemos los datos de una amplía gama de videojuegos de todos
                    los generos y plataformas. +50.000 videojuegos con los datos completos acerca del mismo
                    como: fecha de lanzamiento, descripción, enlaces a tiendas donde comprar y mucho más.
                    Brindamos también varios filtros para que encuentres por distintos tipos y facilitarte
                    la busqueda.
                </p>
                <Link to='/allgames'><button onClick={todosLosJuegos}><BiJoystick className='icon-mando' />Ver ahora</button></Link>
            </section>
            
        </main>
    )
}

export default Inicio