export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export enum State {
  start, //1st time start
  end, //game ended
  continue, //questions continued
  fetching, //fetching questions from api
  newGame, // new game has started --- to prevent multiple fetching
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answers: string[];
  correct_option: number;
};
