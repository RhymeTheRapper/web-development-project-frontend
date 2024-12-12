import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state, { payload: question }) => {
            const newQuestion: any = {
                _id: question._id,
                quiz: question.quiz,
                type: question.type,
                title: question.title,
                points: question.points,
                description: question.description,
                options: question.options, // multiple choice
                correctAnswers: question.correctAnswers, // fill the blanks
                correctAnswer: question.correctAnswer, //true or false

            };
            state.questions = [...state.questions, newQuestion] as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter((m: any) => m._id !== questionId);
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((m: any) =>
                m._id === question._id ? question : m
            ) as any;
        },
        editQuestion: (state, { payload: QuestionId }) => {
            state.questions = state.questions.map((m: any) =>
                m._id === QuestionId ? { ...m, editing: true } : m
            ) as any;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
    },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions } =
    questionsSlice.actions;
export default questionsSlice.reducer;
