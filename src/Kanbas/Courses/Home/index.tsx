import { useSelector } from "react-redux";
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      {currentUser.role === "FACULTY" && (
      <div className="d-none d-md-block">
        <CourseStatus />
        </div>
      )}
    </div>
  );
}
