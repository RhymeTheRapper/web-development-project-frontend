import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [] as any[],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        course: quiz.course,
        available: quiz.available,
        due: quiz.due,
        description: quiz.description,
        quizType: quiz.quizType,
        points: quiz.points,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        due_date: quiz.due_date,
        available_date: quiz.available_date,
        until_date: quiz.until_date,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((m: any) => m._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quiz._id ? quiz : m
      ) as any;
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
