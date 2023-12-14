import { useState } from 'react'
import './App.css'

let cardArray = {};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function createCard({i, imgUrl, imgName}) {
  return(
    <>
    <div id={i} className="card"><img src={imgUrl}></img><p className="card-name">{imgName}</p></div>
    </>
  )
}

function App() {

  return (
    <>
    </>
  )
}

export default App
