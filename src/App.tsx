import React, { useEffect, useState } from "react";
import "./App.css";
import background from "./background.jpg";
import QuestionPanel from "./QuestionPanel";

import { Difficulty, Question, State } from "./myTypes";

const totalQuestions = 10;

function App() {
  const [questionNo, updateQuestionNo] = useState(0);
  const [state, updateState] = useState(State.start);
  const [score, updateScore] = useState(0);
  const [questions, updateQuestions] = useState<Question[]>([]);
  const [selectedOption, updateSelectedOption] = useState(-1);
  //-------- utility functions ---------------
  function startNewGame() {
    updateQuestionNo(0);
    updateState(State.newGame);
    updateScore(0);
    updateSelectedOption(-1);
  }
  //---------- fetching data from api ------------
  useEffect(() => {
    async function getData(difficulty: Difficulty, amount: number) {
      let endPoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
      updateState(State.fetching);
      console.log("fetching questions from API");
      let questionsData: Question[] = (await (await fetch(endPoint)).json())
        .results;
      console.log("successfully fetched questions from API");
      console.log(questionsData);
      questionsData.map((elm) => randomizeAnswers(elm));
      console.log("Sorted Array");
      console.log(questionsData);
      //----- updating variables ------
      updateQuestions(questionsData);
      updateState(State.continue);
    }
    if (state === State.newGame) {
      getData(Difficulty.EASY, totalQuestions);
    }
  });

  function showPanel() {
    if (state === State.fetching) {
      return <p className="loading">Loading Question ...</p>;
    } else if (state === State.continue || state === State.end) {
      return (
        <>
          {
            //----- checking if game has ended
            state === State.end ? (
              <button
                className="start-btn"
                onClick={() => {
                  startNewGame();
                }}
              >
                Start
              </button>
            ) : (
              ""
            )
          }
          <p className="score">Score : {score}</p>
          <QuestionPanel
            questionNo={questionNo}
            updateQuestionNo={updateQuestionNo}
            totalQuestions={totalQuestions}
            score={score}
            updateScore={updateScore}
            question={questions[questionNo]}
            selectedOption={selectedOption}
            updateSelectedOption={updateSelectedOption}
            updateState={updateState}
          />
        </>
      );
    } else if (state === State.start) {
      return (
        <button
          className="start-btn"
          onClick={() => {
            startNewGame();
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

function randomizeAnswers(question: Question) {
  question.answers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ].sort((a, b) => Math.random() - 0.5);
  question.correct_option = question.answers.indexOf(question.correct_answer);
  return question;
}
