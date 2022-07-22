import React from "react";
import { Question, State } from "./myTypes";

type propsT = {
  questionNo: number;
  updateQuestionNo: any;
  totalQuestions: number;
  score: number;
  updateScore: any;
  question: Question;
  selectedOption: number;
  updateSelectedOption: any;
  updateState: any;
};

const QuestionPanel: React.FC<propsT> = (props) => {
  return (
    <div>
      <div className="question-panel">
        <p className="question-no">
          Question: {props.questionNo + 1}/{props.totalQuestions}
        </p>
        <p className="question">{props.question.question}</p>
        {/*----------------- rendering option ---------------------- */}
        {props.question.answers.map((elm, index) => {
          // ---- if option not selected
          if (props.selectedOption === -1) {
            return (
              <button
                className="option"
                key={index}
                onClick={(event) => {
                  console.log("clicked on option");
                  props.updateSelectedOption(index);
                  if (props.question.correct_option === index)
                    props.updateScore(props.score + 1);
                  if (props.questionNo + 1 === props.totalQuestions) {
                    props.updateState(State.end);
                  }
                }}
              >
                {elm}
              </button>
            );
          }
          //----- if current rendering option is our selected option
          else if (index === props.selectedOption) {
            return (
              <button
                className={
                  props.selectedOption === props.question.correct_option
                    ? "correct-option"
                    : "incorrect-option"
                }
                key={index}
              >
                {elm}
              </button>
            );
          }
          //--------- if current rendering option is not our selected option
          else {
            return (
              <button
                className={
                  index === props.question.correct_option
                    ? "correct-option"
                    : "option"
                }
                key={index}
              >
                {elm}
              </button>
            );
          }
        })}
      </div>
      {
        //------ if option selected and question is not last then display next question btn
        props.questionNo + 1 !== props.totalQuestions &&
        props.selectedOption !== -1 ? (
          <button
            className="next-question-btn"
            onClick={() => {
              props.updateQuestionNo(props.questionNo + 1);
              props.updateSelectedOption(-1);
            }}
          >
            Next Question
          </button>
        ) : (
          ""
        )
      }
    </div>
  );
};

export default QuestionPanel;
