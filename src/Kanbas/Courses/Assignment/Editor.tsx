import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments;
  return (
    <div id="wd-assignments-editor" className="container">
      {assignment
        .filter((assignment: any) => assignment._id === aid)
        .map((assignment: any) => (
          <>
            <div className="mb-3">
              <label htmlFor="wd-name">
                <strong style={{ fontSize: "18px" }}> Assignment Name</strong>
              </label>
              <input
                id="wd-name"
                className="form-control mt-2"
                value={assignment.title}
              />
              <textarea id="wd-description" className="mt-2 form-control">
                {assignment.description}
              </textarea>
            </div>
            <div>
              <div className="row mb-3 text-end">
                <div className="col">
                  <label htmlFor="wd-points">Points</label>
                </div>
                <div className="col">
                  <input
                    id="wd-points"
                    className="form-control"
                    value={assignment.points}
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
                      <label
                        className="form-check-label"
                        htmlFor="wd-text-entry"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="wd-website-url"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="wd-file-upload"
                      >
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
                        value={assignment.due_date}
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
                          value={assignment.available_date}
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
                          value={assignment.until_date}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary">
                  Cancel
                </Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">
                  Save
                </Link>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
