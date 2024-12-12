import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as questionsClient from "./client";

interface Question {
  _id: string;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  title: string;
  points: number;
  description?: string;
  options?: { text: string; isCorrect: boolean }[];
  correctAnswers?: string[];
  correctAnswer?: boolean;
}

interface QuizAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export default function Questions() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [startTime] = useState<Date>(new Date());
  const [quizStarted, setQuizStarted] = useState(false);
  const isPreviewMode = currentUser.role === "FACULTY";

  // Only fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsClient.fetchQuestions(qid as string);
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [qid]);

  const handleStartQuiz = async () => {
    try {
      // Check for existing answers first
      const existingAnswers = await questionsClient.getUserAnswers(qid as string, currentUser._id);

      if (existingAnswers && existingAnswers.finished) {
        // If answers exist and quiz is finished, redirect to results page
        window.location.href = `/Kanbas/Courses/${cid}/Quizzes/${qid}/results`;
        return;
      }

      // If no finished answers exist, proceed with starting/continuing the quiz
      const attemptStatus = await questionsClient.startQuizAttempt(qid as string, currentUser._id);
      if (attemptStatus === false && !isPreviewMode) {
        alert("Cannot start quiz: Either you've reached the maximum number of attempts or the quiz is not currently available.");
        window.location.href = `/Kanbas/Courses/${cid}/Quizzes/${qid}/details`;
        return;
      }

      // If we're in preview mode or attempt was successful, start the quiz
      setQuizStarted(true);

      // If there are existing unfinished answers, load them
      if (existingAnswers && !existingAnswers.finished) {
        setAnswers(existingAnswers.answers || {});
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Error starting quiz. Please try again.");
    }
  };

  const handleAnswerChange = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    try {
      await questionsClient.updateQuizAnswer(qid as string, currentUser._id, {
        questionId: currentQuestion._id,
        answer: answer,
      });

      setAnswers({
        ...answers,
        [currentQuestion._id]: answer,
      });
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      // Mark the quiz as finished
      await questionsClient.finishQuizAttempt(qid as string, currentUser._id);

      // Redirect to results page
      window.location.href = `/Kanbas/Courses/${cid}/Quizzes/${qid}/results`;
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "True/False":
        return (
          <div>
            <div className="mb-3">{question.description}</div>
            <div className="form-check">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="true"
                checked={answers[question._id] === "true"}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="form-check-input"
              />
              <label className="form-check-label">True</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="false"
                checked={answers[question._id] === "false"}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="form-check-input"
              />
              <label className="form-check-label">False</label>
            </div>
          </div>
        );

      case "Multiple Choice":
        return (
          <div>
            <div className="mb-3">{question.description}</div>
            {question.options?.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option.text}
                  checked={answers[question._id] === option.text}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="form-check-input"
                />
                <label className="form-check-label">{option.text}</label>
              </div>
            ))}
          </div>
        );

      case "Fill in the Blank":
        return (
          <div>
            <div className="mb-3">{question.description}</div>
            <input
              type="text"
              value={answers[question._id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="form-control"
              placeholder="Your answer..."
            />
          </div>
        );
    }
  };

  if (!quizStarted) {
    return (
      <div className="text-center mt-4">
        <h2>Ready to {isPreviewMode ? "preview" : "start"} the quiz?</h2>
        {isPreviewMode && (
          <div className="mb-3">
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`} className="btn btn-secondary me-2">
              Edit Quiz
            </Link>
          </div>
        )}
        <Button variant="primary" size="lg" onClick={handleStartQuiz}>
          {isPreviewMode ? "Start Preview" : "Start Quiz"}
        </Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {isPreviewMode && (
        <div className="alert alert-info mb-4">
          <strong>Preview Mode</strong> - This is how students will see the quiz.
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`} className="btn btn-secondary float-end">
            Edit Quiz
          </Link>
        </div>
      )}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Started at: {startTime.toLocaleTimeString()}</span>
              <Button variant="primary" onClick={handleSubmitQuiz}>
                {isPreviewMode ? "Submit Preview" : "Submit Quiz"}
              </Button>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h5>
              <p className="text-muted">
                Points: {questions[currentQuestionIndex].points}
              </p>
              {renderQuestion(questions[currentQuestionIndex])}
              <div className="mt-4 d-flex justify-content-between">
                <Button
                  variant="secondary"
                  disabled={currentQuestionIndex === 0}
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Questions</div>
            <ListGroup variant="flush">
              {questions.map((question, index) => (
                <ListGroup.Item
                  key={question._id}
                  action
                  active={currentQuestionIndex === index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={answers[question._id] ? "bg-light" : ""}
                >
                  Question {index + 1}
                  {answers[question._id] && " ✓"}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}