import { Link, useParams } from "react-router-dom";
import EditorNav from "./EditorNav";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import TrueFalse from "./QuestionTypes/TrueFalse";
import FillInTheBlank from "./QuestionTypes/FillInTheBlank";
import { useState, useEffect } from "react";
import { Question } from "./QuestionTypes/types";
import * as questionsClient from "./Questions/client";

export default function QuestionsEditor() {
    const { cid, qid } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const loadQuestions = async () => {
            if (qid) {
                const questions = await questionsClient.fetchQuestions(qid);
                setQuestions(questions);
                const total = questions.reduce(
                    (sum: any, q: { points: any }) => sum + q.points,
                    0
                );
                setTotalPoints(total);
            }
        };
        loadQuestions();
    }, [qid]);

    const addQuestion = (type: Question["type"] = "Multiple Choice") => {
        const baseQuestion = {
            quiz: qid as string,
            title: "",
            points: 4,
        };

        const newQuestion: Question =
            type === "Multiple Choice"
                ? {
                    ...baseQuestion,
                    type: "Multiple Choice",
                    options: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                    ],
                }
                : type === "True/False"
                    ? {
                        ...baseQuestion,
                        type: "True/False",
                        correctAnswer: false,
                    }
                    : {
                        ...baseQuestion,
                        type: "Fill in the Blank",
                        correctAnswers: [""],
                    };

        setQuestions([...questions, newQuestion]);
        setTotalPoints(totalPoints + 4);
    };

    const handleSaveQuestion = async (
        questionId: string | undefined,
        updatedQuestion: Question
    ) => {
        try {
            if (questionId) {
                await questionsClient.updateQuestion(questionId, updatedQuestion);
            } else {
                const newQuestion =
                    await questionsClient.createQuestion(updatedQuestion);
                setQuestions(
                    questions.map((q) => (q._id === questionId ? newQuestion : q))
                );
            }
            const newTotal = questions.reduce((sum, q) => sum + q.points, 0);
            setTotalPoints(newTotal);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    return (
        <div className="container">
            <EditorNav />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Points {totalPoints}</h4>
            </div>

            <div className="mb-4">
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        <i className="fas fa-plus me-2"></i>
                        New Question
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => addQuestion("Multiple Choice")}
                            >
                                Multiple Choice
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => addQuestion("True/False")}
                            >
                                True/False
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => addQuestion("Fill in the Blank")}
                            >
                                Fill in the Blank
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {questions.map((question) => (
                <div
                    key={question._id || Math.random()}
                    className="mb-4 border rounded"
                >
                    {question.type === "Multiple Choice" && (
                        <MultipleChoice
                            points={question.points}
                            initialQuestion={question}
                            onSave={(updatedQuestion) =>
                                handleSaveQuestion(question._id, updatedQuestion)
                            }
                        />
                    )}
                    {question.type === "True/False" && (
                        <TrueFalse
                            points={question.points}
                            initialQuestion={question}
                            onSave={(updatedQuestion) =>
                                handleSaveQuestion(question._id, updatedQuestion)
                            }
                        />
                    )}
                    {question.type === "Fill in the Blank" && (
                        <FillInTheBlank
                            points={question.points}
                            initialQuestion={question}
                            onSave={(updatedQuestion) =>
                                handleSaveQuestion(question._id, updatedQuestion)
                            }
                        />
                    )}
                </div>
            ))}

            <hr />
            <div className="text-end">
                <Link
                    to={`/Kanbas/Courses/${cid}/Quizzes`}
                    className="btn btn-secondary me-2"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
}
