import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [cardArray, setCardArray] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
      setCardArray(() => data.results.slice(0, 12));
    })
    .catch(error => console.error(error))
  }, []);

  function changeArray() {
    shuffleArray(cardArray);
  }

  function createCard(cardArray) {
    return cardArray.map((data) => (
      <>
      <div id={data.id} className="card"><img src={data.image} onClick={() => changeArray}></img><p className="card-name">{data.name}</p></div>
      </>
    ))
  }

  function shuffleArray(array) {
    let tempArray = array;
    for (var i = tempArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
        setCardArray(() => tempArray);
    }
}

  return (
    <>
    <header>Memory Game</header>
      <div className="score-main">
        <div className="current-score">Current Score: 10</div>
        <div className="highest-score">Highest Score: 12</div>
      </div>
    <section className="grid-main">
      {createCard(cardArray)}
    </section>
    </>
  )
}

export default App
