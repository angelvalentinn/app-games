import { fetchingData, URLS } from '../../api/fetchingData';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { BsFillStarFill, BsFillNutFill, BsFillBookmarksFill, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';
import Loader from '../../components/loader/Loader'
import nouser from '../../assets/nouser.png'
import CardGame from '../cardGame/CardGame';

const DetailJuego = ({ setParams, setStr }) => {

    const { id } = useParams();
    const [vermas, setVermas] = useState(false);
    const [juego, setJuego] = useState(null);
    const [store, setStore] = useState({});
    const [logros, setLogros] = useState(null);
    const [creadores, setCreadores] = useState(null);
    const [mismaSerie, setMismaSerie] = useState(null);
    const [imagenes, setImagenes] = useState(null);

    useEffect(() => {
        fetchingData(setStore, URLS.juegoStore(id));
        fetchingData(setLogros, URLS.juegoLogros(id));
        fetchingData(setCreadores, URLS.juegoCreadores(id));
        fetchingData(setMismaSerie, URLS.juegoMismaSerie(id));
        fetchingData(setImagenes, URLS.juegoImagenes(id));
    }, []);

    useEffect(() => {
        fetchingData(setJuego, URLS.juegoDetail(id));
    }, [id])

    const actualizarLogros = url => fetchingData(setLogros, url);

    const toRight = cont_str => {
        const cont = document.querySelector(`.${cont_str}`);
        cont.style.scrollBehavior = 'smooth';
        cont.scrollLeft += 100;
    }

    const toLeft = cont_str => {
        const cont = document.querySelector(`.${cont_str}`);
        cont.style.scrollBehavior = 'smooth';
        cont.scrollLeft -= 100;
    }

    const fetchearTags = (slug, name) => {
        setParams({
            idPlat: null,
            genre: null,
            ord: null,
            anio: null,
            search: null,
            tags: slug
        })
        setStr(`Juegos de ${name}`);
    }

    return (
        <>
            {!juego ? <main className='main-loader'><Loader /></main> :

                <main className='detail'>

                    <>
                        <section className='detail_presentation' style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,1) 8%,rgba(0,0,0,0.3)),url(${juego.background_image})` }}>
                            <h2>{juego.name}</h2>

                            <div className='detail_presentation_text'>
                                <span><BsFillStarFill className='text-icon star' />Rating: <p>{juego.rating}</p></span>
                                <span><GoClockFill className='text-icon' />Lanzamiento: <p>{juego.released}</p></span>
                                <div className='flex-icon'>
                                    <span><FiMonitor className='text-icon icon-monitor' />Plataformas</span>
                                    <ul>
                                        {
                                            juego.platforms.map((plat, i) => {
                                                return (
                                                    <li key={plat.name}>{plat.platform.name}{juego.platforms.length - 1 != i && ','}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='flex-icon'>
                                    <span><BsFillNutFill className='text-icon ' />Desarrolladores</span>
                                    <ul>
                                        {
                                            juego.developers.map((dev, i) => {
                                                return (
                                                    <li key={dev.name}>{dev.name}{juego.developers.length - 1 != i && ','}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='flex-icon'>
                                    <span><BsFillBookmarksFill className='text-icon ' />Géneros</span>
                                    <ul>
                                        {
                                            juego.genres.map((gen, i) => {
                                                return (
                                                    <li key={gen.name}>{gen.name}{juego.genres.length - 1 != i && ','}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                        </section>

                        <section className='detail_presentation_text_2'>

                            <article className='article-1'>

                                <div className='puntuacion'>
                                    <h5>Puntuación</h5>
                                    <button>{juego.metacritic || '?'}</button>
                                </div>

                                <ul>
                                    <h5>Calificaciones</h5>
                                    {
                                        juego.ratings.map(rat => {
                                            return (
                                                <div key={rat.title}><li>{rat.title}:</li><span>%{rat.percent}</span></div>
                                            )
                                        })
                                    }
                                </ul>

                                <article className='article-2'>

                                    <div className='publicadores'>
                                        <h5>Publicadores</h5>
                                        <ul>
                                            {
                                                juego.publishers.map((pub, i) => {
                                                    return (
                                                        <li key={pub.name}>{pub.name}{juego.publishers.length - 1 != i && ','} </li>
                                                    )
                                                })
                                            }
                                            {
                                                juego.publishers.length == 0 && <li>?</li>
                                            }
                                        </ul>
                                    </div>

                                </article>

                            </article>

                            <div className='group-1'>
                                <article className='description' >

                                    <h4>Descripción</h4>

                                    <p dangerouslySetInnerHTML={{ __html: juego.description || '?' }} style={vermas ? { height: 'auto' } : { height: '100px' }}>
                                    </p>

                                    <button className='vermas' onClick={() => setVermas(!vermas)}>{!vermas ? 'Ver más' : 'Mostrar menos'}</button>

                                </article>

                                <article className='comprar' >

                                    <h5>Donde comprar</h5>

                                    <ul>
                                        {
                                            juego.stores.map((sto) => {
                                                const url = store && store.results && store.results.find(item => item.store_id == sto.store.id)?.url;
                                                return (
                                                    <a target='_blank' href={url} key={sto.store.name}><li key={sto.store.name}>{sto.store.name}</li></a>
                                                )
                                            })
                                        }
                                        {
                                            juego.stores.length == 0 && <li style={{ cursor: 'auto' }}>?</li>
                                        }
                                    </ul>

                                </article>
                            </div>

                            <div className='group-2'>
                                <article className='sitioweb'>
                                    <h3>Sitio web</h3>
                                    <a href={juego.website} target='_blank'>{juego.website || '?'}</a>
                                </article>

                                <article className='tags'>
                                    <h6>Tags</h6>
                                    <ul>
                                        {
                                            juego.tags.map(tag => {
                                                return (
                                                    <Link to='/allgames'><li onClick={() => fetchearTags(tag.slug, tag.name)} key={tag.name}>{tag.name}</li></Link>
                                                )
                                            })
                                        }
                                        {
                                            juego.tags.length == 0 && <li>?</li>
                                        }
                                    </ul>
                                </article>
                            </div>

                            <article className='logros'>
                                <h6>Logros</h6>
                                <ul>
                                    {
                                        logros && logros?.results.map((logro) => {
                                            return (
                                                <div key={logro.name}>
                                                    <img src={logro.image} alt={logro.name} />
                                                    <div className='texts'>
                                                        <li>{logro.name}</li>
                                                        <p>{logro.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        logros?.results.length == 0 && <li>?</li>
                                    }
                                </ul>

                                {logros?.results.length != 0 && <div className='cambiar'>
                                    <span onClick={() => logros && logros.previous && actualizarLogros(logros.previous)} style={logros && !logros.previous ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowLeft />Ant</span>
                                    <span onClick={() => logros && logros.next && actualizarLogros(logros.next)} style={logros && !logros.next ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowRight />Sig</span>
                                </div>}
                            </article>

                            <article className='requerimientos'>
                                <div>
                                    <h6>Requerimientos mínimos para PC</h6>
                                    <p style={vermas ? { height: 'auto' } : { maxHeight: '100px' }}>{juego.platforms.find(plat => plat.platform.name == 'PC')?.requirements.minimum || '?'}</p>
                                    <button className='vermas' onClick={() => setVermas(!vermas)}>{!vermas ? 'Ver más' : 'Mostrar menos'}</button>
                                </div>

                                <div>
                                    <h6>Requerimientos recomendados</h6>
                                    <p>{juego.platforms.find(plat => plat.platform.name == 'PC')?.requirements?.recommended || '?'}</p>
                                </div>
                            </article>

                        </section>

                        <section className='creadores'>

                            <article className='imagenes'>
                                <h6>Imágenes</h6>
                                <picture className='imagenes-container'>
                                    {
                                        imagenes && imagenes.results.map(img => {
                                            return (
                                                <img src={img.image}></img>
                                            )
                                        })
                                    }
                                </picture>
                                {imagenes?.results.length != 0 &&
                                    <>
                                        <BsArrowLeft onClick={() => toLeft('imagenes-container')} className='arrowLeft' />
                                        <BsArrowRight onClick={() => toRight('imagenes-container')} className='arrowRight' />

                                        <div className='change'>
                                            <span onClick={() => imagenes && creadores.previous && fetchingData(setImagenes, imagenes.previous)} style={imagenes && !imagenes.previous ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowLeft />Ant pág</span>
                                            <span onClick={() => imagenes && creadores.next && fetchingData(setImagenes, imagenes.next)} style={imagenes && !imagenes.next ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowRight />Sig pág</span>
                                        </div>
                                    </>
                                }
                            </article>

                            <article className='article-creadores'>
                                <h6>Creadores</h6>
                                <ul className='creadores-ul'>
                                    {
                                        creadores && creadores?.results.length == 0 ? 'No se encontraron' : creadores?.results.map(cre => {
                                            return (
                                                <div key={cre.name} style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.4) ,rgba(0,0,0,.5)),url(${cre.image_background})` }}>

                                                    <li>{cre.name}</li>
                                                    <img src={cre.image ? cre.image : nouser} alt={cre.name} />
                                                    <ul className='position'>
                                                        {
                                                            cre.positions.map(pos => {
                                                                return (
                                                                    <li key={pos.name}>{pos.name}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                    <ul className='conocido-por'>
                                                        {
                                                            cre.games.map(gam => {
                                                                return (
                                                                    <li key={gam.name}>{gam.name}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                                {creadores?.results.length != 0 &&
                                    <>
                                        <BsArrowLeft onClick={() => toLeft('creadores-ul')} className='arrowLeft' />
                                        <BsArrowRight onClick={() => toRight('creadores-ul')} className='arrowRight' />

                                        <div className='change'>
                                            <span onClick={() => creadores && creadores.previous && fetchingData(setCreadores, creadores.previous)} style={creadores && !creadores.previous ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowLeft />Ant pág</span>
                                            <span onClick={() => creadores && creadores.next && fetchingData(setCreadores, creadores.next)} style={creadores && !creadores.next ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowRight />Sig pág</span>
                                        </div>
                                    </>
                                }
                            </article>

                            <article className='misma-serie'>
                                <h6>Juegos de la misma serie</h6>
                                <div className='container-misma-serie'>
                                    {
                                        mismaSerie && mismaSerie?.results.length == 0 ? 'No se encontraron' : mismaSerie?.results.map(juego => {
                                            return (
                                                <Link to={`/detailJuego/${juego.id}`} key={juego.name} onClick={() => windowToScroll(0, 0)}>
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
                                {mismaSerie?.results.length != 0 &&
                                    <>
                                        <BsArrowLeft onClick={() => toLeft('container-misma-serie')} className='arrowLeft' />
                                        <BsArrowRight onClick={() => toRight('container-misma-serie')} className='arrowRight' />
                                        <div className='change'>
                                            <span onClick={() => mismaSerie && mismaSerie.previous && fetchingData(setMismaSerie, mismaSerie.previous)} style={mismaSerie && !mismaSerie.previous ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }}><BsArrowLeft />Ant pág</span>
                                            <span onClick={() => mismaSerie && mismaSerie.next && fetchingData(setMismaSerie, mismaSerie.next)} style={mismaSerie && !mismaSerie.next ? { opacity: '.1', cursor: 'auto' } : { opacity: '1' }} ><BsArrowRight />Sig pág</span>
                                        </div>
                                    </>
                                }
                            </article>

                        </section>
                    </>

                </main>
            }

        </>
    )
}

export default DetailJuego