import React from "react";
import { Question } from "./myTypes";

type propsT = {
  questionNo: number;
  updateQuestionNo: any;
  totalQuestions: number;
  score: number;
  updateScore: any;
  question: Question;
  selectedOption: number;
  updateSelectedOption: any;
};

const QuestionPanel: React.FC<propsT> = (props) => {
  function displayOption() {}
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
          if (props.selectedOption == -1) {
            return (
              <button
                className="option"
                key={index}
                onClick={(event) => {
                  props.updateSelectedOption(index);
                  if (props.question.correct_option == index)
                    props.updateScore(props.score + 1);
                }}
              >
                {elm}
              </button>
            );
          }
          //----- if current rendering option is our selected option
          else if (index == props.selectedOption) {
            return (
              <button
                className={
                  props.selectedOption == props.question.correct_option
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
                  index == props.question.correct_option
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
        //------ if option selected then display next question btn
        props.selectedOption != -1 ? (
          <button className="next-question-btn">Next Question</button>
        ) : (
          ""
        )
      }
    </div>
  );
};

export default QuestionPanel;
