import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Question, TrueFalseQuestion } from "./types";

interface TrueFalseProps {
  points: number;
  onSave: (question: Question) => void;
  initialQuestion?: TrueFalseQuestion;
}

export default function TrueFalse({
  points,
  onSave,
  initialQuestion,
}: TrueFalseProps) {
  const [question, setQuestion] = useState<TrueFalseQuestion>(
    () =>
      initialQuestion || {
        quiz: "",
        type: "True/False",
        title: "",
        points: points,
        correctAnswer: false,
      }
  );

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const loadQuestion = () => {
      if (initialQuestion) {
        setQuestion(initialQuestion);
        if (initialQuestion.description) {
          const contentState = ContentState.createFromText(
            initialQuestion.description
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
    };

    loadQuestion();
  }, [initialQuestion?._id]);

  const handleUpdateQuestion = () => {
    onSave(question);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <select className="form-select w-25" defaultValue="True/False">
          <option>True/False</option>
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
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Correct Answer:</label>
        <div className="mt-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="true-option"
              checked={question.correctAnswer === true}
              onChange={() => setQuestion({ ...question, correctAnswer: true })}
            />
            <label className="form-check-label" htmlFor="true-option">
              True
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="false-option"
              checked={question.correctAnswer === false}
              onChange={() =>
                setQuestion({ ...question, correctAnswer: false })
              }
            />
            <label className="form-check-label" htmlFor="false-option">
              False
            </label>
          </div>
        </div>
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
