import { useState, useEffect } from 'react';
import { fetchingData, URLS } from '../../api/fetchingData';
import { Link } from "react-router-dom";
import { BsList, BsSearch, BsHouseFill, BsJoystick } from 'react-icons/bs';
import logo from '../../assets/logo.png';

const Header = ({todosLosJuegos, setPag, setStr, params, setParams, input, setInput}) => {

    const [hamburguer, setHamburguer] = useState(false);
    const [plataformas, setplataformas] = useState(null);
    const [generos, setGeneros] = useState(null);

    useEffect(() => {
        fetchingData(setplataformas, URLS.plataformas);
        fetchingData(setGeneros, URLS.generos);
    }, []);

    const filtrarPorGenero = (slug,name) => {
        setParams({...params, genre:slug, idPlat: null, search:null, tags:null})
        setPag(1);
        setStr(`Juegos de ${name}`);
        setHamburguer(false);
    }

    const filtrarPorPlataforma = (idPlat,name) => {
        setParams({...params, idPlat: idPlat, genre: null, search:null, tags:null});
        setPag(1);
        setStr(`Juegos de ${name}`);
        setHamburguer(false);
    }

    const filtrarPorInput = jue => {
        setParams({...params, search:input, idPlat:null, genre:null, tags:null})
        setPag(1);
        setStr(`Juegos de ${jue}`);
        setInput('')
    }

    const handleForm = e => {
        e.preventDefault();
        filtrarPorInput(input);
    }

    return (
        <header className='header'>
            <BsList size={48} className='header_hamburguer' onClick={() => setHamburguer(!hamburguer)} />

            <form className='header_form' onSubmit={handleForm}>
                <div>
                    <input type="text" placeholder="Busca un videojuego..." value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button type='submit'>
                        <span></span>
                        <BsSearch className='search-icon' />
                    </button>
                </div>
            </form>

            <a className='header_logo' href='https://rawg.io/apidocs#why-rawg-api' target='_blank'>
                <img src={logo} alt="Logo del sitio" className='' />
            </a>

            <nav className={`header_nav`} style={hamburguer ? { transform: 'translateX(0)' } : { transform: 'translate(-100%)' }} >
                
                <div className='header_nav_div'>
                    <Link to={'/'} onClick={() => setHamburguer(false)}><div className='header_nav_div_inicio'><BsHouseFill className='iconos' /><p>Inicio</p></div></Link>
                    <Link to={'/allgames'} onClick={todosLosJuegos} onMouseUp={() => setHamburguer(false)}><div className='header_nav_div_all' ><BsJoystick className='iconos' /><p>Todos los juegos</p></div></Link>
                </div>

                <section>
                    <p>Plataformas</p>
                    <div className='header_nav_plataformas'>
                        {
                            plataformas && plataformas.results.map(plat => {
                                    return (
                                    <Link key={plat.name} to={`/allgames`}  onClick={() => filtrarPorPlataforma(plat.id,plat.name)}><div><img src={plat.platforms[0].image_background} alt={`Imagen de ${plat.name}`}/><p>{plat.name}</p></div></Link>
                                )
                            })
                        }
                    </div>
                </section>

                <section>
                    <p>Generos</p>
                    <div className='header_nav_plataformas'>
                        {
                            generos && generos.results.map(gen => {
                                return (
                                    <Link to={`/allgames`} key={gen.slug}><div onClick={() => filtrarPorGenero(gen.slug,gen.name)} ><img src={gen.image_background} alt={`Imagen de ${gen.name}`} /><p>{gen.name}</p></div></Link>
                                )
                            })
                        }
                    </div>
                </section>

            </nav>
            
        </header>
    )
}

export default Header