import { Navigate, Route, Routes } from "react-router-dom";
import EditorNav from "./EditorNav";
import Details from "./Details";
import Questions from "./Questions/index";
import { Provider } from "react-redux";

export default function QuizEditor() {
  return (
    <div>
      <EditorNav />
      <Routes>
        <Route path="/" element={<Navigate to="details" />} />
        <Route path="details" element={<Details />} />
        <Route path="questions" element={<Questions />} />
      </Routes>
    </div>
  );
}
