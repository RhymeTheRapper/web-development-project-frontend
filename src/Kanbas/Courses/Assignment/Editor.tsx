export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <strong style={{ fontSize: "18px" }}>Assignment Name</strong>
      </label>
      <br />
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-points">Points</label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
            </select>
            <td>
              <label>Online Entry Options</label>
              <br />
              <input type="checkbox" name="check-text" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input type="checkbox" name="check-url" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-media"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="check-annotations"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="check-file-upload"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-due-date"> Due: </label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <input type="date" id="wd-due-date" value="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-available-from"> Available from: </label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <input type="date" id="wd-available-from" value="2024-05-06" />
          </td>
          <td
            align="right"
            valign="top"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <label htmlFor="wd-available-until"> Until: </label>
          </td>
          <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <input type="date" id="wd-available-until" value="2024-05-20" />
          </td>
        </tr>
      </table>
      <hr />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
