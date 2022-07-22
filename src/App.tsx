import React, { useEffect, useState } from "react";
import "./App.css";
import background from "./background.jpg";
import QuestionPanel from "./QuestionPanel";

import { Difficulty, Questions, State } from "./myTypes";

function App() {
  const [questionNo, updateQuestionNo] = useState(0);
  const [state, updateState] = useState(State.start);
  const [questions, updateQuestions] = useState<Questions[]>([]);
  //---------- fetching data from api ------------
  useEffect(() => {
    async function getData(difficulty: Difficulty, amount: number) {
      let endPoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
      updateState(State.fetching);
      console.log("fetching questions from API");
      let questionsData: Questions[] = (await (await fetch(endPoint)).json())
        .results;
      console.log("successfully fetched questions from API");
      console.log(questionsData);
      updateQuestions(questionsData);
      updateState(State.continue);
    }
    if (state == State.newGame) {
      getData(Difficulty.EASY, 10);
    }
  });

  function showPanel() {
    if (state == State.fetching) {
      return <p className="loading">Loading Questions ...</p>;
    } else if (state == State.continue) {
      return (
        <>
          <p className="score">Score : 0</p>
          <QuestionPanel />
        </>
      );
    } else if (state == State.start) {
      return (
        <button
          className="start-btn"
          onClick={() => {
            updateState(State.newGame);
          }}
        >
          Start
        </button>
      );
    }
  }
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="wrapper">
        <h1>React Quiz</h1>
        {showPanel()}
      </div>
    </div>
  );
}

export default App;
