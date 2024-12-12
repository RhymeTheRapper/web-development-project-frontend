import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
export default function QuizDetails() {
  const { cid, aid } = useParams();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  let quiz = quizzes.find((quiz: any) => quiz._id === aid) ?? {
    title: "",
    course: cid,
    description: "",
    type: "Graded Quiz",
    point: "100",
    status: "Unpublished",
    assignmentGroup: "Quizzes",
    shuffleAnswer: "Yes",
    timeLimit: "20",
    multipleAttempts: "No",
    howManyAttempts: "1",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: "",
    availableDate: "",
    untilDate: "",
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{quiz.quizTitle}</h1>
        <div className="float-center">
          <Link to={`/quizzes/${quiz._id}/preview`} className="btn btn-outline-primary me-2">
            Preview
          </Link>
          <Link to={`/quizzes/${quiz._id}/edit`} className="btn btn-outline-primary me-2">
            <FaPencilAlt />
            Edit
          </Link>
        </div>
      </div>
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th className="text-end">Quiz Type</th>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <th className="text-end">Points</th>
            <td>{quiz.quizPoints}</td>
          </tr>
          <tr>
            <th className="text-end">Assignment Group</th>
            <td>{quiz.quizGroup}</td>
          </tr>
          <tr>
            <th className="text-end">Shuffle Answers</th>
            <td>{quiz.shuffleAnswer}</td>
          </tr>
          <tr>
            <th className="text-end">Time Limit</th>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <th className="text-end">Multiple Attempts</th>
            <td>{quiz.multipleAttempts}</td>
          </tr>
          <tr>
            <th className="text-end">Show Correct Answers</th>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <th className="text-end">One Question at a Time</th>
            <td>{quiz.quizOneQuestionAtATime}</td>
          </tr>
          <tr>
            <th className="text-end">Webcam Required</th>
            <td>{quiz.webcamRequired}</td>
          </tr>
          <tr>
            <th className="text-end">Lock Questions After Answering</th>
            <td>{quiz.lockQuestions}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-borderless mt-4">
        <thead>
          <tr className="text-center">
            <th>Due</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <hr />
        <tbody>
          <tr className="text-center">
            <td>{quiz.quizDueDate || "N/A"}</td>
            <td>{quiz.quizAvailableDate || "N/A"}</td>
            <td>{quiz.quizUntilDate || "N/A"}</td>
          </tr>
        </tbody>
        <hr />
      </table>
    </div>
  );
}
