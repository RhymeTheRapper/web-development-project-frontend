import { useParams } from "react-router";
import * as db from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addAssignment, deleteAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  let assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  ) ?? {
    title: "",
    description: "",
    points: 0,
    due_date: "",
    available_date: "",
    until_date: "",
  };

  const [assignmentName, setAssignmentName] = useState(assignment.title);
  const [assignmentDescription, setAssignmentDescription] = useState(
    assignment.description
  );
  const [assignmentPoints, setAssignmentPoints] = useState(assignment.points);
  const [assignmentDueDate, setAssignmentDueDate] = useState(
    assignment.due_date
  );
  const [assignmentAvailableDate, setAssignmentAvailableDate] = useState(
    assignment.available_date
  );
  const [assignmentUntilDate, setAssignmentUntilDate] = useState(
    assignment.until_date
  );

  const onSave = async () => {
    if (!cid) return;
    const isEditing = aid !== "new";
    const newAssignment = {
      _id: isEditing
        ? aid
        : "A" + cid?.charAt(cid.length - 1) + db.assignments.length.toString(),
      course: cid,
      title: assignmentName,
      description: assignmentDescription,
      points: assignmentPoints,
      due_date: assignmentDueDate,
      due:
        new Date(assignmentDueDate).toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) + " at 11:59pm",
      available_date: assignmentAvailableDate,
      available:
        new Date(assignmentAvailableDate).toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
        }) + " at 11:59pm",
      until_date: assignmentUntilDate,
    };
    if (isEditing) {
      await assignmentsClient.updateAssignment(newAssignment);
      dispatch(updateAssignment(newAssignment));
    } else {
      const assignment = await coursesClient.createAssignmentForCourse(
        cid,
        newAssignment
      );
      dispatch(addAssignment(assignment));
    }

    navigate("/Kanbas/Courses/" + cid + "/Assignments");
  };

  return (
    <div id="wd-add-assignment-dialog" className="container">
      <>
        <div className="mb-3">
          <label htmlFor="wd-name">
            <strong style={{ fontSize: "18px" }}> Assignment Name</strong>
          </label>
          <input
            id="wd-name"
            className="form-control mt-2"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
          <textarea
            id="wd-description"
            className="mt-2 form-control"
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
          />
        </div>
        <div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-points">Points</label>
            </div>
            <div className="col">
              <input
                type="number"
                id="wd-points"
                className="form-control"
                value={assignmentPoints}
                onChange={(e) => setAssignmentPoints(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-group">Assignment Group</label>
            </div>
            <div className="col">
              <select id="wd-group" className="form-select">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </div>
            <div className="col">
              <select id="wd-display-grade-as" className="form-select">
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </div>
            <div className="col rounded border border-gray p-4">
              <div className="col text-start">
                <select id="wd-submission-type" className="form-select">
                  <option value="ONLINE">Online</option>
                </select>
                <label className="form-label mt-3">
                  <strong>Online Entry Options</strong>
                </label>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-text"
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-url"
                    id="wd-website-url"
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-media"
                    id="wd-media-recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-annotations"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
                    Student Annotation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="check-file-upload"
                    id="wd-file-upload"
                  />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 text-end">
            <div className="col">
              <label htmlFor="wd-assign">Assign</label>
            </div>
            <div className="col rounded border border-gray p-4">
              <div className="col text-start">
                <label className="form-label" htmlFor="wd-assign-to">
                  <strong>Assign To</strong>
                </label>
                <div className="col-md-12">
                  <input
                    id="wd-assign-to"
                    className="form-control"
                    value="Everyone"
                  />
                </div>
                <label className="form-label mt-3" htmlFor="wd-due-date">
                  <strong>Due</strong>
                </label>
                <div className="col-md-12">
                  <input
                    type="date"
                    id="wd-due-date"
                    className="form-control"
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                    value={assignmentDueDate}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label
                      className="form-label mt-3"
                      htmlFor="wd-available-from"
                    >
                      <strong>Available From:</strong>
                    </label>
                    <input
                      type="date"
                      id="wd-available-from"
                      className="form-control"
                      onChange={(e) =>
                        setAssignmentAvailableDate(e.target.value)
                      }
                      value={assignmentAvailableDate}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label mt-3"
                      htmlFor="wd-available-until"
                    >
                      <strong>Until:</strong>
                    </label>
                    <input
                      type="date"
                      id="wd-available-until"
                      className="form-control"
                      onChange={(e) => setAssignmentUntilDate(e.target.value)}
                      value={assignmentUntilDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-end">
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button className="btn btn-danger" onClick={() => onSave()}>
              Save
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
