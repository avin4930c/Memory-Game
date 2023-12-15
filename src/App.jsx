import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [cardArray, setCardArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  let [score, setScore] = useState(0);
  let [highScore, setHighScore] = useState(0);
  let [gridColor, setGridColor] = useState("green");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
      setCardArray(() => data.results.slice(0, 12));
    })
    .catch(error => console.error(error))
  }, []);

  function changeArray(id) {
    if (!(currentArray.includes(id))) {
      setCurrentArray((arr) => [...arr, id]);
      setGridColor("green"); //to change right back after trigerring else condition(to click twice)
      setScore(score => score += 1);
      shuffleArray(cardArray);
      
    }
    else {
      setCurrentArray([]);
      setGridColor("red");
      setTimeout(() => setGridColor("green"), 1000);
      setHighScore(prevScore => prevScore > score ? prevScore : score);
      setScore(0);
    }
  }
  useEffect(() => {console.log(currentArray)}, [currentArray]);

  function createCard(cardArray) {
    return cardArray.map((data) => (
      <>
      <div id={data.id} className="card" onClick={() => changeArray(data.id)}><img src={data.image}></img><p className="card-name">{data.name}</p></div>
      </>
    ))
  }

  function shuffleArray(array) {
    let tempArray = [...array];
    for (var i = tempArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
    }
    setCardArray(tempArray);
}

  return (
    <>
    <header>Memory Game</header>
      <div className="score-main">
        <div className="current-score">Current Score: {score}</div>
        <div className="highest-score">Highest Score: {highScore}</div>
      </div>
    <section className="grid-main" style={{backgroundColor: gridColor}}>
      {createCard(cardArray)}
    </section>
    </>
  )
}

export default App
