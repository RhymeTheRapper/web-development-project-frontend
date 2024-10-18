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
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
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
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment
                    className="me-2 fs-3"
                    style={{ color: "green" }}
                  />
                  <div className="flex-grow-1 ">
                    <Link
                      className="wd-assignment-link"
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <div>
                      <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                      <strong>Not available until</strong>{" "}
                      {assignment.available} |{" "}
                    </div>
                    <div>
                      <strong>Due</strong> {assignment.due} |{" "}
                      {assignment.points} pts
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
