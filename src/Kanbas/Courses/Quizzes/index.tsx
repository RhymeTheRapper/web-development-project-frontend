import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";
import {
  MdAssignmentAdd,
  MdOutlineAssessment,
  MdOutlineAssignment,
} from "react-icons/md";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEllipsisV, FaCheck, FaBan } from "react-icons/fa";
import { setQuizzes, deleteQuiz, togglePublish } from "./reducer";
import { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import QuizControlButtons from "./QuizControlButtons";
import * as questionsClient from "./Questions/client";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [quizQuestionCounts, setQuizQuestionCounts] = useState<{
    [key: string]: number;
  }>({});

  const handleDeleteClick = (quizId: string) => {
    setDeleteId(quizId);
    setShowModal(true);
  };
  const handleDeleteConfirm = async () => {
    await quizzesClient.deleteQuiz(deleteId);
    dispatch(deleteQuiz(deleteId));
    setDeleteId("");
    setShowModal(false);
  };

  const fetchQuizQuestions = async (quizId: string) => {
    try {
      const questions = await questionsClient.fetchQuestions(quizId);
      return questions.length;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return 0;
    }
  };
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));

    // Fetch question counts for each quiz
    const questionCounts: { [key: string]: number } = {};
    for (const quiz of quizzes) {
      const count = await fetchQuizQuestions(quiz._id);
      questionCounts[quiz._id] = count;
    }
    setQuizQuestionCounts(questionCounts);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const getQuizStatus = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    if (currentDate < availableDate) {
      return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    } else if (currentDate > untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };
  const sortQuizzes = (quizzes: any[]) => {
    return [...quizzes].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "availableDate":
          return (
            new Date(a.availableDate).getTime() -
            new Date(b.availableDate).getTime()
          );
        default:
          return a.title.localeCompare(b.title);
      }
    });
  };
  const handlePublishToggle = (quiz: any) => {
    try {
      // Just update Redux store - no API call needed
      dispatch(togglePublish(quiz._id));
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };
  return (
    <div id="wd-new-quizzes">
      {currentUser.role === "FACULTY" && (
        <>
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/new`}
            id="wd-add-quiz"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <BsPlusLg
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Link>
        </>
      )}
      <div className="search-container">
        <HiMagnifyingGlass className="search-icon" />
        <input
          id="wd-search-quiz"
          placeholder="Search for Quiz"
          className="search-input"
        />
      </div>
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 c">
          <div className="wd-quizzes-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <strong>QUIZZES</strong>
            <QuizControlButtons />
          </div>
          {quizzes.filter((quiz: any) => quiz.course === cid).length === 0 ? (
            <div className="alert">
              No quizzes available. Click the "+ Quiz" button to create a new
              quiz.
            </div>
          ) : (
            <ul
              className="wd-quiz-list list-group rounded-0"
              style={{ borderLeft: "3px solid green" }}
            >
              {sortQuizzes(
                quizzes.filter((quiz: any) => quiz.course === cid)
              ).map((quiz: any) => (
                <li
                  key={quiz._id}
                  className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center"
                >
                  <BsGripVertical className="me-2" />
                  <MdOutlineAssignment
                    className="me-2 fs-3"
                    style={{ color: "green" }}
                  />
                  <div className="flex-grow-1">
                    <Link
                      className="wd-quiz-link"
                      to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <strong>{quiz.title}</strong>
                    </Link>
                    <div>
                      <span>
                        <strong>{getQuizStatus(quiz)}</strong> |{" "}
                      </span>
                      <span>
                        <strong>Due </strong>
                        {quiz.due} |{" "}
                      </span>
                      <span>{quiz.point} pts | </span>
                      <span>{quizQuestionCounts[quiz._id] || 0} Questions</span>
                    </div>
                  </div>
                  {currentUser.role === "FACULTY" ? (
                    <FaCheck
                      className="me-2"
                      onClick={() => handlePublishToggle(quiz)}
                      style={{
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "50%",
                        backgroundColor: quiz.published ? "#198754" : "#98D8B9",
                        color: "white",
                      }}
                    />
                  ) : (
                    <FaCheck
                      className="me-2"
                      style={{
                        padding: "4px",
                        borderRadius: "50%",
                        backgroundColor: quiz.published ? "#198754" : "#98D8B9",
                        color: "white",
                      }}
                    />
                  )}
                  {currentUser.role === "FACULTY" && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id={`quiz-${quiz._id}-dropdown`}
                        style={{ color: "black" }}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteClick(quiz._id)}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handlePublishToggle(quiz)}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setSortBy("title")}>
                          Sort by Name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy("dueDate")}>
                          Sort by Due Date
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSortBy("availableDate")}
                        >
                          Sort by Available Date
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
