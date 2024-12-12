import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Question, MultipleChoiceQuestion } from "./types";

interface MultipleChoiceProps {
  points: number;
  onSave: (question: Question) => void;
  initialQuestion?: MultipleChoiceQuestion;
}

export default function MultipleChoice({
  points,
  onSave,
  initialQuestion,
}: MultipleChoiceProps) {
  const [question, setQuestion] = useState<MultipleChoiceQuestion>(
    () =>
      initialQuestion || {
        quiz: "",
        type: "Multiple Choice",
        title: "",
        points: points,
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      }
  );

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const loadQuestion = () => {
      if (initialQuestion) {
        setQuestion(initialQuestion);
        // Initialize editor state with found question description
        if (initialQuestion.description) {
          const contentState = ContentState.createFromText(
            initialQuestion.description
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
    };

    loadQuestion();
  }, [initialQuestion?._id]); // Only reload when question ID changes

  const handleAnswerChange = (index: number, text: string) => {
    const newOptions = [...question.options];
    newOptions[index].text = text;
    setQuestion({ ...question, options: newOptions });
  };

  const setCorrectAnswer = (index: number) => {
    const newOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setQuestion({ ...question, options: newOptions });
  };

  const addAnswer = () => {
    setQuestion({
      ...question,
      options: [...question.options, { text: "", isCorrect: false }],
    });
  };

  const removeAnswer = (index: number) => {
    setQuestion({
      ...question,
      options: question.options.filter((_, i) => i !== index),
    });
  };

  const handleUpdateQuestion = () => {
    onSave(question);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <select className="form-select w-25" defaultValue="Multiple Choice">
          <option>Multiple Choice</option>
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
            editorStyle={{
              padding: "0 1rem",
              minHeight: "200px",
            }}
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
        <label>Answers:</label>
        {question.options.map((option, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="radio"
              name="correctAnswer"
              className="me-2"
              checked={option.isCorrect}
              onChange={() => setCorrectAnswer(index)}
            />
            <input
              type="text"
              className="form-control me-2"
              value={option.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
            />
            {question.options.length > 2 && (
              <button
                className="btn btn-link text-danger"
                onClick={() => removeAnswer(index)}
              >
                <i className="fas fa-times"></i>
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
