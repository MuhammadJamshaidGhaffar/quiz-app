
import React from 'react';
import './App.css';
import background from "./background.jpg";
import QuestionPanel from './QuestionPanel';

function App() {

  return (
    <div className="App" style={{backgroundImage:`url(${background})`}}>
      <div className="wrapper">

      <h1>React Quiz</h1>
      <p className="score">Score : 0</p>
      <QuestionPanel/>
      </div>
    </div>
  );
}

export default App;
