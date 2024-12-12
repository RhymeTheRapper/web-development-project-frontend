import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as client from "./client";

export default function FillBlanks() {

    const dispatch = useDispatch();
    const currentQuestion = useSelector((state: any) => state.questionsReducer);

    const updateQuestion = async (question: any) => {
        const updatedQuestion = await client.updateQuestion(question._id);
        // dispatch(updateQuestion(updatedQuestion));
    }

    return (
        <div id="fill-blanks-question-type">
            <p>
                Enter your question and multiple answers, then select the one correct answer.
            </p>
            <div>
                <label htmlFor="question">Question</label>
                <textarea className="form-control" id="question"></textarea>
            </div>
            <p>Answers</p>
            <div>
                <label htmlFor="answer-a">Possible Answer</label>
                <input className="form-control" id="answer-a" />
                <label htmlFor="answer-b">Possible Answer</label>
                <input className="form-control" id="answer-b" />
                <label htmlFor="answer-c">Possible Answer</label>
                <input className="form-control" id="answer-c" />
                <label htmlFor="answer-d">Possible Answer</label>
                <input className="form-control" id="answer-d" />
            </div>
        </div>
    );
}
