import { useState } from 'react';
import Header from './components/header/Header.jsx';
import MainGames from './components/main/MainGames.jsx';
import Inicio from './components/inicio/Inicio.jsx';
import DetailJuego from './components/detailJuego/DetailJuego.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './app.scss';

function App() {

  const [input, setInput] = useState('');
  const [juegos, setJuegos] = useState(null);
  const [pag, setPag] = useState(1);
  const [str, setStr] = useState('Todos los juegos');
  const [params, setParams] = useState({
    idPlat: null,
    genre: null,
    ord: null,
    anio: null,
    search: null,
    tags: null
  })

  const todosLosJuegos = () => {
    setParams({idPlat: null,
      genre: null,
      ord: null,
      anio: null,
      search: null,
      tags :null
    })
    setStr(`Todos los juegos`);
}

  return (
    <BrowserRouter>

      <Header todosLosJuegos={todosLosJuegos} setPag={setPag} setStr={setStr} params={params} setParams={setParams} input={input} setInput={setInput}/>

      <Routes>
        
        <Route path='/' element={<Inicio todosLosJuegos={todosLosJuegos}/>} />

        <Route path='/allgames' element={<MainGames
          juegos={juegos}
          setJuegos={setJuegos}
          pag={pag} setPag={setPag}
          str={str}
          params={params}
          setParams={setParams}
          todosLosJuegos={todosLosJuegos}
          />
        } 
        />

        <Route path='/detailJuego/:id' element={<DetailJuego setParams={setParams} setStr={setStr} setInput={setInput}/>} />

      </Routes >
      
    </BrowserRouter>
  )
}

export default App
