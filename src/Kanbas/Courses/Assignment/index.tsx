import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";
import {
  MdAssignmentAdd,
  MdOutlineAssessment,
  MdOutlineAssignment,
} from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <button
        id="wd-add-assignment"
        className="btn btn-lg btn-danger me-1 float-end"
      >
        <BsPlusLg
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Assignment
      </button>
      <button
        id="wd-add-assignment"
        className="btn btn-lg btn-secondary me-1 float-end"
      >
        <BsPlusLg
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Group
      </button>
      <div className="search-container">
        <HiMagnifyingGlass className="search-icon" />
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 c">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <strong>ASSIGNMENTS</strong>
            <AssignmentControlButtons />
          </div>
          <ul
            className="wd-assignment-list list-group rounded-0"
            style={{ borderLeft: "3px solid green" }}
          >
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment
                className="me-2 fs-3"
                style={{ color: "green" }}
              />
              <div className="flex-grow-1 ">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  A1 - ENV + HTML
                </a>
                <div>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 6 at 12:00am |
                </div>
                <div>
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <LessonControlButtons />
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment
                className="me-2 fs-3"
                style={{ color: "green" }}
              />
              <div className="flex-grow-1 ">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/124"
                >
                  A2 - CSS + BOOTSTRAP
                </a>
                <div>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 13 at 12:00am |
                </div>
                <div>
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <LessonControlButtons />
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment
                className="me-2 fs-3"
                style={{ color: "green" }}
              />
              <div className="flex-grow-1 ">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/125"
                >
                  A3 - JAVASCRIPT + REACT
                </a>
                <div>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 20 at 12:00am |
                </div>
                <div>
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
