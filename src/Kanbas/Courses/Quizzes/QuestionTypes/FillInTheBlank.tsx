import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaTrash } from "react-icons/fa";
import { Question, FillInBlankQuestion } from "./types";

interface FillInTheBlankProps {
  points: number;
  onSave: (question: Question) => void;
  initialQuestion?: FillInBlankQuestion;
}

export default function FillInTheBlank({
  points,
  onSave,
  initialQuestion,
}: FillInTheBlankProps) {
  const [question, setQuestion] = useState<FillInBlankQuestion>(
    () =>
      initialQuestion || {
        quiz: "",
        type: "Fill in the Blank",
        title: "",
        points: points,
        correctAnswers: [""],
      }
  );

  const [editorState, setEditorState] = useState(() => {
    if (initialQuestion?.description) {
      const contentState = ContentState.createFromText(
        initialQuestion.description
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion);
      if (initialQuestion.description) {
        const contentState = ContentState.createFromText(
          initialQuestion.description
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [initialQuestion?._id]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...question.correctAnswers];
    newAnswers[index] = value.trim();
    setQuestion({ ...question, correctAnswers: newAnswers });
  };

  const addAnswer = () => {
    if (question.correctAnswers.length < 10) {
      setQuestion({
        ...question,
        correctAnswers: [...question.correctAnswers, ""],
      });
    }
  };

  const removeAnswer = (index: number) => {
    if (question.correctAnswers.length > 1) {
      setQuestion({
        ...question,
        correctAnswers: question.correctAnswers.filter((_, i) => i !== index),
      });
    }
  };

  const handleUpdateQuestion = () => {
    onSave(question);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <select className="form-select w-25" defaultValue="Fill in the Blank">
          <option>Fill in the Blank</option>
        </select>
        <div>
          pts:{" "}
          <input
            type="number"
            className="form-control d-inline w-auto"
            value={points}
            onChange={(e) =>
              setQuestion({
                ...question,
                points: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Question Title:</label>
        <input
          type="text"
          className="form-control mb-2"
          value={question.title}
          onChange={(e) =>
            setQuestion({
              ...question,
              title: e.target.value,
            })
          }
          placeholder="Enter question title"
        />

        <label>Question Description:</label>
        <div className="border rounded">
          <Editor
            editorState={editorState}
            onEditorStateChange={(newState) => {
              setEditorState(newState);
              setQuestion({
                ...question,
                description: newState.getCurrentContent().getPlainText(),
              });
            }}
            toolbar={{
              options: ["inline", "list"],
              inline: { options: ["bold", "italic", "underline"] },
            }}
            placeholder="Type your question here. Use _____ to indicate the blank."
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Possible Correct Answers:</label>
        {question.correctAnswers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
            />
            {question.correctAnswers.length > 1 && (
              <button
                className="btn btn-link text-danger"
                onClick={() => removeAnswer(index)}
                title="Remove this answer"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button className="btn btn-link text-danger" onClick={addAnswer}>
          + Add Another Answer
        </button>
      </div>

      <div className="text-end">
        <button
          className="btn btn-secondary me-2"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleUpdateQuestion}>
          Update Question
        </button>
      </div>
    </div>
  );
}
