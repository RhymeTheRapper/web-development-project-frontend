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
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { setAssignments, deleteAssignment } from "./reducer";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
export default function Assignments() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const handleDeleteClick = (assignmentId: string) => {
    setDeleteId(assignmentId);
    setShowModal(true);
  };
  const handleDeleteConfirm = async () => {
    await assignmentsClient.deleteAssignment(deleteId);
    dispatch(deleteAssignment(deleteId));
    setDeleteId("");
    setShowModal(false);
  };

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div id="wd-assignments">
      {currentUser.role === "FACULTY" && (
        <>
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments/new`}
            id="wd-add-assignment"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <BsPlusLg
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Link>
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
        </>
      )}
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
                <li
                  key={assignment._id}
                  className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center"
                >
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
                  {currentUser.role === "FACULTY" && (
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(assignment._id)}
                    />
                  )}
                </li>
              ))}
          </ul>
        </li>
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
