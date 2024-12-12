import { useParams } from "react-router";
import * as db from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import EditorNav from "./EditorNav";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
};

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    point: 0,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
  });
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] =
    useState(false);
  const [editorState, setEditorState] = useState(() => {
    if (quiz.description) {
      let contentState = ContentState.createFromText(quiz.description);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        const foundQuiz = quizzes.find((q: any) => q._id === qid);
        if (foundQuiz) {
          setQuiz(foundQuiz);
          // Initialize editor state with found quiz description
          if (foundQuiz.description) {
            const contentState = ContentState.createFromText(
              foundQuiz.description
            );
            setEditorState(EditorState.createWithContent(contentState));
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading quiz:", error);
        setLoading(false);
      }
    };

    if (cid && qid !== "new") {
      loadQuiz();
    } else {
      setLoading(false);
    }
  }, [cid, qid]);

  const onSave = async (publish: boolean = false) => {
    if (!cid) return;
    const isEditing = qid !== "new";

    const newQuiz = {
      ...quiz,
      course: cid,
      published: publish,
      title: quiz.title,
      description: quiz.description,
      points: quiz.point,
      quizType: quiz.quizType,
      assignmentGroup: quiz.assignmentGroup,
      shuffleAnswers: shuffleAnswers,
      timeLimit: timeLimit,
      multipleAttempts: multipleAttempts,
      showCorrectAnswers: showCorrectAnswers,
      accessCode: accessCode,
      oneQuestionAtATime: oneQuestionAtATime,
      webcamRequired: webcamRequired,
      lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
      due_date: quiz.dueDate,
      available_date: quiz.availableDate,
      until_date: quiz.untilDate,
    };

    try {
      if (isEditing) {
        await quizzesClient.updateQuiz(newQuiz);
        dispatch(updateQuiz(newQuiz));
      } else {
        const createdQuiz = await coursesClient.createQuizForCourse(
          cid,
          newQuiz
        );
        dispatch(addQuiz(createdQuiz));
      }

      // If publishing or canceling, go to quiz list
      if (publish) {
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        // If just saving, stay on the details page
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <EditorNav />
      <div id="wd-add-quiz-dialog">
        <>
          <div className="mb-3">
            <label htmlFor="wd-name">
              <strong style={{ fontSize: "18px" }}> Quiz Name</strong>
            </label>
            <input
              id="wd-name"
              className="form-control mt-2"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />

            <label htmlFor="wd-description" className="mt-3">
              <strong style={{ fontSize: "18px" }}> Description</strong>
            </label>
            <div className="border rounded">
              <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                placeholder="Enter quiz description..."
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "list",
                    "textAlign",
                    "link",
                    "emoji",
                    "history",
                  ],
                  inline: {
                    options: ["bold", "italic", "underline", "strikethrough"],
                  },
                }}
                editorStyle={{
                  padding: "0 1rem",
                  minHeight: "200px",
                }}
                editorState={editorState}
                onEditorStateChange={(newState) => {
                  setEditorState(newState);
                  setQuiz({
                    ...quiz,
                    description: newState.getCurrentContent().getPlainText(),
                  });
                }}
              />
            </div>
          </div>

          {/* Quiz Type */}
          <div className="row mb-3">
            <div className="col-3">
              <label>Quiz Type</label>
            </div>
            <div className="col-9">
              <select
                className="form-select"
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </select>
            </div>
          </div>

          {/* Assignment Group */}
          <div className="row mb-3">
            <div className="col-3">
              <label>Assignment Group</label>
            </div>
            <div className="col-9">
              <select
                className="form-select"
                value={quiz.assignmentGroup}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>
          </div>

          {/* Options */}
          <div className="row mb-3">
            <div className="col-3">
              <label>Options</label>
            </div>
            <div className="col-9 border rounded p-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="shuffle-answers"
                  checked={shuffleAnswers}
                  onChange={(e) => setShuffleAnswers(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="shuffle-answers">
                  Shuffle Answers
                </label>
              </div>

              <div className="d-flex align-items-center mt-2">
                <div className="form-check me-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="time-limit"
                    checked={timeLimit > 0}
                    onChange={(e) => setTimeLimit(e.target.checked ? 20 : 0)}
                  />
                  <label className="form-check-label" htmlFor="time-limit">
                    Time Limit
                  </label>
                </div>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "80px" }}
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                />
                <span className="ms-2">Minutes</span>
              </div>
              <div className="d-flex align-items-center mt-2">
                <div className="form-check me-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="multiple-attempts"
                    checked={multipleAttempts > 1}
                    onChange={(e) =>
                      setMultipleAttempts(e.target.checked ? 2 : 1)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="multiple-attempts"
                  >
                    Multiple Attempts
                  </label>
                </div>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "80px" }}
                  value={multipleAttempts}
                  onChange={(e) => setMultipleAttempts(Number(e.target.value))}
                />
                <span className="ms-2">Attempts</span>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="show-correct-answers"
                  checked={showCorrectAnswers}
                  onChange={(e) => setShowCorrectAnswers(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="show-correct-answers"
                >
                  Show Correct Answers
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="access-code">Access Code</label>
                <input
                  id="access-code"
                  className="form-control"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                />
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="one-question-at-a-time"
                  checked={oneQuestionAtATime}
                  onChange={(e) => setOneQuestionAtATime(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="one-question-at-a-time"
                >
                  One Question at a Time
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="webcam-required"
                  checked={webcamRequired}
                  onChange={(e) => setWebcamRequired(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="webcam-required">
                  Webcam Required
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="lock-questions"
                  checked={lockQuestionsAfterAnswering}
                  onChange={(e) =>
                    setLockQuestionsAfterAnswering(e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="lock-questions">
                  Lock Questions After Answering
                </label>
              </div>
            </div>
          </div>

          {/* Due Date, Available Date, Until Date */}
          <div className="row mb-3">
            <div className="col-3">
              <label>Due Date</label>
            </div>
            <div className="col-9">
              <input
                type="date"
                className="form-control"
                value={formatDate(quiz.dueDate)}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">
              <label>Available Date</label>
            </div>
            <div className="col-9">
              <input
                type="date"
                className="form-control"
                value={formatDate(quiz.availableDate)}
                onChange={(e) =>
                  setQuiz({ ...quiz, availableDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">
              <label>Until Date</label>
            </div>
            <div className="col-9">
              <input
                type="date"
                className="form-control"
                value={formatDate(quiz.untilDate)}
                onChange={(e) =>
                  setQuiz({ ...quiz, untilDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="text-end mt-3">
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes`}
              className="btn btn-secondary me-2"
            >
              Cancel
            </Link>
            <button
              className="btn btn-primary me-2"
              onClick={() => onSave(false)}
            >
              Save
            </button>
            <button className="btn btn-success" onClick={() => onSave(true)}>
              Save & Publish
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
