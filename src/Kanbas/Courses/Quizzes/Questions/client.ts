import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// Question Management
export const getAllQuestions = async () => {
  const { data } = await axios.get(`${QUESTIONS_API}`);
  return data;
};

export const fetchQuestions = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const createQuestion = async (question: any) => {
  const { data } = await axios.post(`${QUESTIONS_API}`, question);
  return data;
};

export const updateQuestion = async (questionId: string, updates: any) => {
  const { data } = await axios.put(`${QUESTIONS_API}/${questionId}`, updates);
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return data;
};

// Get all answers for a quiz
export const getQuizAnswers = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/answers`);
  return data;
};

// Create a new answer for a quiz
export const createAnswer = async (quizId: string, answer: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}/answers`, answer);
  return data;
};

// Update a user's answer for a quiz
export const updateQuizAnswer = async (
  quizId: string,
  userId: string,
  updateAnswer: {
    questionId: string;
    answer: string;
  }
) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers/update`,
    { updateAnswer }
  );
  return data;
};

// Mark quiz attempt as finished
export const finishQuizAttempt = async (quizId: string, userId: string) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers/finished`
  );
  return data;
};

// Add/Update answer for specific question
export const updateQuestionAnswer = async (
  quizId: string,
  userId: string,
  questionId: string,
  answer: string
) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/user/${userId}/answer`,
    {
      questionId,
      updateAnswer: answer,
    }
  );
  return data;
};

// Get user's answers for a quiz
export const getUserAnswers = async (quizId: string, userId: string) => {
  const { data } = await axios.get(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers`
  );
  return data;
};

// Start new quiz attempt
export const startQuizAttempt = async (quizId: string, userId: string) => {
  const { data } = await axios.post(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers`
  );
  return data;
};
