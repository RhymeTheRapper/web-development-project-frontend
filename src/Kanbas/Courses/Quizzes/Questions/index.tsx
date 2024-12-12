import { useEffect } from "react";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, setQuestions } from "./reducer";
import QuestionEditor from "./QuestionEditor";
export default function Questions(quiz: any) {

  const dispatch = useDispatch();
  const quizId = quiz._id
  const { questions } = useSelector((state: any) => state.questionsReducer);

  //fetch questions 
  const fetchQuestions = async () => {
    const questions = await client.fetchQuestions(quizId as string);
    dispatch(setQuestions(questions));
    console.log("questions", questions);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const createQuestion = async () => {
    const newQuestion = { quiz: quiz, type: "Multiple Choice" }
    const question = await client.createQuestion(newQuestion);
    dispatch(addQuestion(question));
  }

  return (
    <div id="wd-quiz-questions">
      <button className="btn btn-primary float-end" id="add-new-question-click"
        onClick={createQuestion}>
        New Question
      </button>
      <hr />
      {questions.map((question: any) => {
        <div>
          <QuestionEditor />
        </div>
      })}
    </div>
  )
}