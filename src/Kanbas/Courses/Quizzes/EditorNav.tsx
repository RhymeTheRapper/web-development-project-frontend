import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";

function EditorNav() {
  const { cid, qid } = useParams();
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/detailsEditor`}
          className={`nav-link ${isActive("/details") ? "active" : ""}`}
        >
          Details
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questionsEditor`}
          className={`nav-link ${isActive("/questions") ? "active" : ""}`}
        >
          Questions
        </Link>
      </li>
    </ul>
  );
}

export default EditorNav;
