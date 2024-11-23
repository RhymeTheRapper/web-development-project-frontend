import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment } from "./reducer";
import * as enrollmentClient from "./client";
import * as courseClient from "./Courses/client";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  onDeleteEnrollment,
  enrollUser,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  onDeleteEnrollment: (courseId: any) => void;
  enrollUser: (courseId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrollmentState, setEnrollmentState] = useState("");
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  let enrolledCourses = courses;
  const [allCourses, setAllCourses] = useState([] as any);
  const [enrollments, setEnrollments] = useState([] as any);
  const dispatch = useDispatch();

  const handleEnrollmentClick = () => {
    setEnrollmentOpen(true);
    if (enrollmentState === "") {
      fetchAllCourses();
      setEnrollmentState("all");
    }
    if (enrollmentState === "all") {
      setEnrollmentState("enrolled");
    }
    if (enrollmentState === "enrolled") {
      setEnrollmentState("");
      setEnrollmentOpen(false);
    }
  };

  const fetchAllCourses = async () => {
    const allCourseList = await courseClient.fetchAllCourses();
    setAllCourses(allCourseList);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <div className="d-flex column">
        <h2 id="wd-dashboard-published" className="flex-grow-1">
          Courses (
          {currentUser.role === "STUDENT" && enrollmentState === "all"
            ? allCourses.length
            : enrolledCourses.length}
          )
        </h2>
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary"
            onClick={() => handleEnrollmentClick()}
          >
            Enrollments
          </button>
        )}
      </div>
      <hr />
      {currentUser.role === "STUDENT" && enrollmentOpen ? (
        <>
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {(enrollmentState === "all" ? allCourses : enrolledCourses).map(
                (course: any) => (
                  <>
                    <div
                      className="wd-dashboard-course col"
                      style={{ width: "300px" }}
                    >
                      <div className="card rounded-3 overflow-hidden">
                        {enrolledCourses
                          .map((course) => course._id)
                          .includes(course._id) ? (
                          <Link
                            to={`/Kanbas/Courses/${course._id}/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                          >
                            <img src={course.jpg} width="100%" height={160} />
                          </Link>
                        ) : (
                          <Link
                            to={`/Kanbas/Dashboard`}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                          >
                            <img src={course.jpg} width="100%" height={160} />
                          </Link>
                        )}
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            {course.name}
                          </h5>
                          <p
                            className="wd-dashboard-course-title card-text overflow-y-hidden"
                            style={{ maxHeight: 100 }}
                          >
                            {course.description}
                          </p>
                          {enrolledCourses
                            .map((course) => course._id)
                            .includes(course._id) ? (
                            <Link
                              to={`/Kanbas/Courses/${course._id}/Home`}
                              className="btn btn-primary"
                            >
                              Go
                            </Link>
                          ) : (
                            <Link
                              to={`/Kanbas/Dashboard`}
                              className="btn btn-primary"
                            >
                              Go
                            </Link>
                          )}
                          {enrolledCourses
                            .map((course) => course._id)
                            .includes(course._id) ? (
                            <button
                              className="btn btn-danger ms-1 align-content-center"
                              onClick={() => onDeleteEnrollment(course._id)}
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success ms-1 align-content-center"
                              onClick={() => {
                                enrollUser(course._id);
                              }}
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {enrolledCourses.map((course: any) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src={course.jpg} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary"> Go </button>
                      {currentUser.role === "FACULTY" && (
                        <>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning float-end ms-1 align-content-center"
                          >
                            Edit
                          </button>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
