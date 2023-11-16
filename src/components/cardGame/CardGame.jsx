import { cambiarFormatoFecha } from '../../utils/cambiarFecha';
import { BsFillStarFill} from 'react-icons/bs';
import nouser from '../../assets/nouser.png';

const CardGame = ({bg_img,name,rat,genres,rel}) => {
    return (
        <article className='cardGame-container'>

            <img src={bg_img || nouser} alt={`Imagen de ${name}`} loading='lazy'/>

            <div className='juego_text'>
                <p>{name}</p>
                <span><BsFillStarFill className='star' />{rat}</span>
                <ul>
                    {
                        genres && genres.map(genero => {
                            return (
                                <li key={genero.name}>{genero.name}</li>
                            )
                        })
                    }
                </ul>
                <span>{cambiarFormatoFecha(rel)}</span>
            </div>
            
        </article>
    )
}

export default CardGame