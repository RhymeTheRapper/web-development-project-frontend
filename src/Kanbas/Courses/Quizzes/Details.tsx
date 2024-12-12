import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as coursesClient from "../../Courses/client";
export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState(
    {
      _id: "",
      title: "",
      description: "",
      point: 0,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      type: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswer: true,
      timeLimit: 20,
      multipleAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
    }
  );

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        const foundQuiz = quizzes.find((q: any) => q._id === qid);
        if (foundQuiz) {
          setQuiz(foundQuiz);
        }

      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };
    loadQuiz();
  }, [cid, qid]);

  if (currentUser.role !== "FACULTY") {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">{quiz.title}</h1>
        <div className="d-flex justify-content-center">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`} className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{quiz.title}</h1>
      <div className="d-flex justify-content-center mb-4">
        <div>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`} className="btn btn-secondary me-2">
            Preview
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/detailsEditor`} className="btn btn-secondary">
            <FaPencilAlt className="me-1" />
            Edit
          </Link>
        </div>
      </div>

      <table className="table table-borderless">
        <tbody>
          {[
            { label: "Quiz Type", value: quiz.type },
            { label: "Points", value: quiz.point },
            { label: "Assignment Group", value: quiz.assignmentGroup },
            { label: "Shuffle Answers", value: quiz.shuffleAnswer ? "Yes" : "No" },
            { label: "Time Limit", value: `${quiz.timeLimit} Minutes` },
            { label: "Multiple Attempts", value: quiz.multipleAttempts ? "Yes" : "No" },
            { label: "View Responses", value: "Always" },
            { label: "Show Correct Answers", value: quiz.showCorrectAnswers ? "Yes" : "No" },
            { label: "One Question at a Time", value: quiz.oneQuestionAtATime ? "Yes" : "No" },
            { label: "Webcam Required", value: quiz.webcamRequired ? "Yes" : "No" },
            { label: "Lock Questions After Answering", value: quiz.lockQuestionsAfterAnswering ? "Yes" : "No" }
          ].map((item, index) => (
            <tr key={index}>
              <th style={{ textAlign: 'right', paddingRight: '20px', width: '200px' }}>
                {item.label}
              </th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date(quiz.dueDate).toLocaleDateString() || "N/A"}</td>
              <td>Everyone</td>
              <td>{new Date(quiz.availableDate).toLocaleDateString() || "N/A"}</td>
              <td>{new Date(quiz.untilDate).toLocaleDateString() || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
