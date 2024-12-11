import { useLocation } from "react-router";

export default function EditorNav() {
  const { pathname } = useLocation();
  return (
    <div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            href="#/details"
            className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#/questions"
            className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}
          >
            Questions
          </a>
        </li>
      </ul>
    </div>
  );
}
