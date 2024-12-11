import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const fetchQuestions = async (quiz: any) => {
  const { data } = await axios.get(`${QUESTIONS_API}/${quiz}`);
  return data;
};

export const deleteQuestion = async (question: any) => {
  // create new database collection for questions maybe
  const response = await axios.delete(`${QUESTIONS_API}/${question._id}`);
  return response.data;
};
export const createQuestion = async (question: any) => {
  const { data } = await axios.post(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axios.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return data;
};
