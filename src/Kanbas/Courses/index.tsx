import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignment";
import AssignmentEditor from "./Assignment/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client";
import Quizzes from "./Quizzes";
import Questions from "./Quizzes/Questions";
import QuizResults from "./Quizzes/Questions/ResultsPage";
import QuestionsEditor from "./Quizzes/QuestionsEditor";
import QuizEditor from "./Quizzes/Editor"
import Details from "./Quizzes/Details";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid!);
    setUsers(users);
  };

  useEffect(() => {
    if (cid) {
      fetchUsers();
    }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/take" element={<Questions />} />
            <Route path="Quizzes/:qid/results" element={<QuizResults />} />
            <Route path="Quizzes/:qid/detailsEditor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/questionsEditor" element={<QuestionsEditor />} />
            <Route path="Quizzes/:qid/details" element={<Details />} />
            <Route path="Quizzes/:qid/preview" element={<Questions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
