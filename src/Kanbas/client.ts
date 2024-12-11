import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const deleteEnrollment = async (enrollmentId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return response.data;
};
export const allEnrollments = async () => {
  const response = await axios.get(ENROLLMENTS_API);
  return response.data;
};
