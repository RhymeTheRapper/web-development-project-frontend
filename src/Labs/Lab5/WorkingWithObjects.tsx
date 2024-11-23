import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
    const [module, setModule] = useState({
        id: 1,
        name: "NodeJS",
        description: "Create a NodeJS server with ExpressJS",
        course: "231",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <input
        className="form-control w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-4"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        type="number"
        className="form-control w-75 mb-2"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary mb-4"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <br />
      <input
        type="checkbox"
        className="mb-2"
        id="wd-assignment-completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <br />
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary mb-4"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <h4>Modifying Modules</h4>
      <input
        className="form-control w-20 mb-2"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Name
      </a>
      <input
        className="form-control w-20 mb-2"
        id="wd-module-name"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Description
      </a>
      <hr />
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Retrieving Modules</h4>
      <a
        id="wd-retrieve-modules"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />
      <h4>Retrieving Modules Names</h4>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/name`}
      >
        Get Name
      </a>
      <hr />
    </div>
  );
}
