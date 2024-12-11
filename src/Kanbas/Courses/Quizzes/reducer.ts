import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description: string;
  type: "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
  point: number;
  status: "Published" | "Unpublished";
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  shuffleAnswer: "Yes" | "No";
  timeLimit: number;
  multipleAttempts: "Yes" | "No";
  howManyAttempts: number;
  showCorrectAnswers: "Immediately" | "After Deadline" | "Never";
  accessCode: string;
  oneQuestionAtATime: "Yes" | "No";
  webcamRequired: "Yes" | "No";
  lockQuestionsAfterAnswering: "Yes" | "No";
  due: string;
  available: string;
  dueDate: string;
  availableDate: string;
  untilDate: string;
}

const initialState = {
  quizzes: [] as Quiz[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: Quiz = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        type: quiz.type || "Graded Quiz",
        point: quiz.point || 100,
        status: quiz.status || "Unpublished",
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswer: quiz.shuffleAnswer || "Yes",
        timeLimit: quiz.timeLimit || 30,
        multipleAttempts: quiz.multipleAttempts || "No",
        howManyAttempts: quiz.howManyAttempts || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "Immediately",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime || "Yes",
        webcamRequired: quiz.webcamRequired || "No",
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || "Yes",
        due: quiz.due,
        available: quiz.available,
        dueDate: quiz.dueDate,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q) => (q._id === quiz._id ? quiz : q));
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz._id === quizId ? { ...quiz, published: !quiz.published } : quiz
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes, togglePublish } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
