/* SECCIÓN DE IMPORT */

// - De React
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
// - Nuestros
// - Sass
import '../styles/App.scss';
// - Imágenes

/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [dataList, setDataList] = useState([])
  const [inputPhrase, setInputPhrase] = useState('');
  const [inputCharacter, setInputCharacter] = useState('');
  const [addPhrase, setAddPhrase] = useState({
    quote: '',
    character: ''
  })

  /* EFECTOS (día 5) */
  useEffect(() => {
    callToApi().then(response => {
      console.log(response);
      setDataList(response)
    })
  }, [inputPhrase, inputCharacter])

  /* FUNCIONES HANDLER */
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleInputPhrase = (ev) => {
    setInputPhrase(ev.target.value);
  };

  const handleInputCharacter = (ev) => {
    setInputCharacter(ev.target.value);
  }

  const handleInputAdd = (ev) => {
    setAddPhrase({ ...addPhrase, [ev.target.id]: ev.target.value })
  }

  const handleClick = () => {
    setDataList([...dataList, addPhrase])
    setAddPhrase({
      quote: "",
      character: ""
    })
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderPhrases = () => {
    return (dataList
      .filter(eachPhrase => eachPhrase.quote.toLocaleLowerCase().includes(inputPhrase.toLocaleLowerCase()))
      .filter(eachPhrase => {
        if (inputCharacter === 'All') {
          return eachPhrase.character
        } else {
          return eachPhrase.character.includes(inputCharacter)
        }
      })
      .map((eachPhrase, index) => <li key={index}>
        <p>{eachPhrase.quote}</p>
        <p>{eachPhrase.character}</p>
      </li>)
    )
  }
  /* HTML */
  return <div className="App">
    <header className="header">
      <h1 className='header__title'>Phrases of Friends</h1>
    </header>
    <main className="main">
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchPhrase"> Filter by phrase:
          <input type="text" id="searchPhrase" name="searchPhrase" placeholder="Ex: smelly cat" onChange={handleInputPhrase} value={inputPhrase} />
        </label>
        <label htmlFor="searchName"> Filter by character:
          <select name="searchName" id="searchName" onChange={handleInputCharacter} value={inputCharacter}>
            <option value="All"> All characters</option>
            <option value="Ross">Ross</option>
            <option value="Rachel">Rachel</option>
            <option value="Chandler">Chandler</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
          </select>
        </label>
      </form>
      <ul>{renderPhrases()}</ul>
      <form onSubmit={handleSubmit}>
        <h2>Add a new phrase</h2>
        <label htmlFor="quote"> Phrase:
          <input type="text" id="quote" name="quote" value={addPhrase.quote} onChange={handleInputAdd} />
        </label>
        <label htmlFor="character"> Character:
          <input type="text" id="character" name="character" value={addPhrase.character} onChange={handleInputAdd} />
        </label>
        <input type="button" value="Click to add" onClick={handleClick} />
      </form>
    </main>
  </div>;
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
