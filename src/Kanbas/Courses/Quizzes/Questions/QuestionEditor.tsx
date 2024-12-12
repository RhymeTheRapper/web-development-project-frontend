import { useParams } from "react-router";
import MultipleChoice from "./MultipleChoiceEditor";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuestionEditor() {
    const { cid, qid } = useParams();
    const currentQuestion = useSelector((state: any) => state.questionsReducer);

    const updateQuestion = async (question: any) { }
    return (
        <div>
            <div className="float">
                <input className="form-control" id="question-title" />
                <select className="form-control" id="question-type" >
                    <option value="mc">Multiple Choice</option>
                    <option value="true-false">True or False</option>
                    <option value="fill-in-blanks">Fill in the Blanks</option>
                </select>
                <input className="form-control ml-2" id="question-points" />
            </div>
            <MultipleChoice />
            <Link
                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
                className="btn btn-secondary"
            > Cancel </Link>
            <button className="btn btn-danger float-end" id="add-new-question-click"
                onClick={() => saveQuiz(currentQuiz)}>
                UpdateQuestion
            </button>
        </div>

    )
}