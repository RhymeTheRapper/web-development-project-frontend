import { useParams } from "react-router";
import * as db from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
export default function QuizDetails() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  let quiz = quizzes.find((quiz: any) => quiz._id === aid) ?? {
    title: "",
    description: "",
    points: 0,
    due_date: "",
    available_date: "",
    until_date: "",
  };

  const [quizTitle, setQuizTitle] = useState(quiz.title);
  const [quizDescription, setQuizDescription] = useState(quiz.description);
  const [quizPoints, setQuizPoints] = useState(quiz.points);
  const [quizDueDate, setQuizDueDate] = useState(quiz.due_date);
  const [quizAvailableDate, setQuizAvailableDate] = useState(
    quiz.available_date
  );
  const [quizUntilDate, setQuizUntilDate] = useState(quiz.until_date);

  const onSave = async () => {
    if (!cid) return;
    const isEditing = aid !== "new";

    const newQuiz = {
      _id: isEditing
        ? aid
        : "Q" + cid?.charAt(cid.length - 1) + quizzes.length.toString(),
      course: cid,
      title: quizTitle,
      description: quizDescription,
      points: quizPoints,
      due_date: quizDueDate,
      due:
        new Date(quizDueDate).toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) + " at 11:59pm",
      available_date: quizAvailableDate,
      available:
        new Date(quizAvailableDate).toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) + " at 11:59pm",
      until_date: quizUntilDate,
    };
    if (isEditing) {
      await quizzesClient.updateQuiz(newQuiz);
      dispatch(updateQuiz(newQuiz));
      console.log("Updated quiz", newQuiz);
    } else {
      const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
      dispatch(addQuiz(quiz));
    }

    navigate("/Kanbas/Courses/" + cid + "/Quizzes");
  };

  return (
    <div id="wd-add-quiz-dialog" className="container">
      <>
        <div className="mb-3">
          <label htmlFor="wd-name">
            <strong style={{ fontSize: "18px" }}> Quiz Name</strong>
          </label>
          <input
            id="wd-name"
            className="form-control mt-2"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <textarea
            id="wd-description"
            className="mt-2 form-control"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </div>
        <div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-points">Points</label>
            </div>
            <div className="col">
              <input
                type="number"
                id="wd-points"
                className="form-control"
                value={quizPoints}
                onChange={(e) => setQuizPoints(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-group">Quiz Group</label>
            </div>
            <div className="col">
              <select id="wd-group" className="form-select">
                <option value="QUIZZES">QUIZZES</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </div>
            <div className="col">
              <select id="wd-display-grade-as" className="form-select">
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </div>
            <div className="col rounded border border-gray p-4">
              <div className="col text-start">
                <select id="wd-submission-type" className="form-select">
                  <option value="ONLINE">Online</option>
                </select>
                <label className="form-label mt-3">
                  <strong>Online Entry Options</strong>
                </label>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-text"
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-url"
                    id="wd-website-url"
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-media"
                    id="wd-media-recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-annotations"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
                    Student Annotation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-file-upload"
                    id="wd-file-upload"
                  />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-assign">Assign</label>
            </div>
            <div className="col rounded border border-gray p-4">
              <div className="col text-start">
                <label className="form-label" htmlFor="wd-assign-to">
                  <strong>Assign To</strong>
                </label>
                <div className="col-md-12">
                  <input
                    id="wd-assign-to"
                    className="form-control"
                    value="Everyone"
                  />
                </div>
                <label className="form-label mt-3" htmlFor="wd-due-date">
                  <strong>Due</strong>
                </label>
                <div className="col-md-12">
                  <input
                    type="date"
                    id="wd-due-date"
                    className="form-control"
                    onChange={(e) => setQuizDueDate(e.target.value)}
                    value={quizDueDate}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label
                      className="form-label mt-3"
                      htmlFor="wd-available-from"
                    >
                      <strong>Available From:</strong>
                    </label>
                    <input
                      type="date"
                      id="wd-available-from"
                      className="form-control"
                      onChange={(e) => setQuizAvailableDate(e.target.value)}
                      value={quizAvailableDate}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label mt-3"
                      htmlFor="wd-available-until"
                    >
                      <strong>Until:</strong>
                    </label>
                    <input
                      type="date"
                      id="wd-available-until"
                      className="form-control"
                      onChange={(e) => setQuizUntilDate(e.target.value)}
                      value={quizUntilDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-end">
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes`}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button className="btn btn-danger" onClick={() => onSave()}>
              Save
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
