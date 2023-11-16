import { useEffect } from 'react';
import { fetchingData, URLS } from '../../api/fetchingData';
import { BsArrowLeft, BsArrowRight, BsArrowUp } from 'react-icons/bs';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';
import CardGame from '../cardGame/CardGame';

const Main = ({ juegos, setJuegos, pag, setPag, str, params, setParams, todosLosJuegos }) => {

    useEffect(() => { fetchingData(setJuegos, URLS.juegosFiltros(params)) }, [params]);

    const cambiarPag = (url, v) => {
        fetchingData(setJuegos, url);
        setPag(v == '-' && pag > 1 ? pag - 1 : pag + 1);
    }

    const handleUp = () => window.scrollTo(0, 0);

    const filtrarPorAnio = e => {
        setParams({ ...params, anio: e.currentTarget.value })
        setPag(1);
    }

    const filtrarPorPopularidad = e => {
        setParams({ ...params, ord: e.currentTarget.value })
        setPag(1);
    }

    return (
        <>
            {!juegos ? <main className='main-loader'><Loader /></main>
                :
                <main className="main_juegos">

                    <section className="main_juegos_inicio">
                        <div className='main_juegos_inicio_filtro'>

                            <h3>{str}</h3>

                            <div className='selects'>
                                <select name="fechas" id="fechas" onChange={(e) => filtrarPorAnio(e)}>
                                    <option value="">Fecha de lanzamiento</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>

                                </select>

                                <select name="fechas" id="fechas" onChange={(e) => filtrarPorPopularidad(e)}>
                                    <option value="">Ordenar por</option>
                                    <option value="name">Nombre</option>
                                    <option value="-rating">Valoración</option>
                                    <option value="-released">Fecha de estreno</option>
                                    <option value="-updated">Actualizado</option>
                                </select>
                            </div>

                        </div>

                        {juegos.results.length == 0 
                            ? 
                            <section className='sin-resultados'>
                                <h1>No hubo resultados</h1>
                                <button onClick={todosLosJuegos}>Ver todos los juegos</button>
                            </section>
                            :
                            <>
                                <div className='main_juegos_inicio_container'>
                                    {
                                        juegos && juegos.results.map(juego => {
                                            return (
                                                <Link to={`/detailJuego/${juego.id}`} key={juego.name}>
                                                    <CardGame
                                                        bg_img={juego.background_image}
                                                        name={juego.name}
                                                        rat={juego.rating}
                                                        genres={juego.genres}
                                                        rel={juego.released}
                                                    />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>

                                <section className='main_juegos_inicio_pag'>
                                    <span onClick={() => juegos.previous && cambiarPag(juegos.previous, '-')} style={!juegos?.previous ? { opacity: '.2', cursor: 'auto' } : { opacity: '1' }}><BsArrowLeft className='arrow-left' /></span>
                                    <span className='numero-pag'>{pag}</span>
                                    <span onClick={() => juegos.next && cambiarPag(juegos.next, '+')} style={!juegos?.next ? { opacity: '.2', cursor: 'auto' } : { opacity: '1' }}><BsArrowRight className='arrow-right' /></span>
                                </section>
                            </>
                        }
                    </section>

                    <BsArrowUp className='arrow-up' onClick={handleUp} />
                </main>
            }
        </>
    )
}

export default Main