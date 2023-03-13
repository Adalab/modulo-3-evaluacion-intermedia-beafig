import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import '../styles/App.scss';
import friends from '../images/friends.png'

function App() {
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
      .map((eachPhrase, index) => <li key={index} className="main__list--each">
        <p>{eachPhrase.quote}</p>
        <p>{eachPhrase.character}</p>
      </li>)
    )
  }
  /* HTML */
  return <div className="App">
    <header className="header">
      <h1 className='header__title'>Quotes of</h1>
      <img className='header__img' src={friends} alt="logo sofa friends" />
    </header>
    <main className="main">
      <form onSubmit={handleSubmit} className="main__form">
        <label htmlFor="searchPhrase" className="main__form--label" > Filter by phrase:
          <input type="text" id="searchPhrase" name="searchPhrase" placeholder="Ex: smelly cat" onChange={handleInputPhrase} value={inputPhrase} className="main__form--input" />
        </label>
        <label htmlFor="searchName" className="main__form--label"> Filter by character:
          <select name="searchName" id="searchName" onChange={handleInputCharacter} value={inputCharacter} className="main__form--input">
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
      <ul className='main__list'>{renderPhrases()}</ul>
      <form onSubmit={handleSubmit} className="main__form">
        <h2 className="main__form--title">Add a new phrase</h2>
        <label htmlFor="quote" className="main__form--label"> Phrase:
          <input type="text" id="quote" name="quote" value={addPhrase.quote} onChange={handleInputAdd} className="main__form--input" />
        </label>
        <label htmlFor="character" className="main__form--label"> Character:
          <input type="text" id="character" name="character" value={addPhrase.character} onChange={handleInputAdd} className="main__form--input" />
        </label>
        <input type="button" value="Click to add" onClick={handleClick} className="main__form--btn" />
      </form>
    </main>
  </div>;
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
