import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

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

// Quiz Taking & Submission
export const startQuizAttempt = async (quizId: string, userId: string) => {
  const { data } = await axios.post(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers`
  );
  return data;
};

export const updateQuizAnswer = async (
  quizId: string,
  userId: string,
  answer: {
    questionId: string;
    answer: string;
    isCorrect?: boolean;
    pointsEarned?: number;
  }
) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers/update`,
    {
      updateAnswer: answer,
    }
  );
  return data;
};

export const finishQuizAttempt = async (quizId: string, userId: string) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/user/${userId}/answers/finished`
  );
  return data;
};
