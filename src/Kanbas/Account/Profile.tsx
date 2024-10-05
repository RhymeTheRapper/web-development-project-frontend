import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <input
        id="wd-username"
        placeholder="username"
        value="alice"
        className="form-control mb-2"
      />
      <input
        id="wd-password"
        placeholder="password"
        value="123"
        className="form-control mb-2"
        type="password"
      />
      <input
        id="wd-firstname"
        placeholder="First Name"
        value="Alice"
        className="form-control mb-2"
      />
      <input
        id="wd-lastname"
        placeholder="Last Name"
        value="Wonderland"
        className="form-control mb-2"
      />
      <input
        id="wd-dob"
        value="2000-01-01"
        className="form-control mb-2"
        type="date"
      />
      <input
        id="wd-email"
        value="alice@wonderland"
        className="form-control mb-2"
        type="email"
      />
      <select id="wd-role" className="form-select mb-2">
        <option selected value="USER">
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link id="wd-signout-link" to="/Kanbas/Account/Signin" className="btn btn-danger w-100">
        Sign Out
      </Link>
    </div>
  );
}