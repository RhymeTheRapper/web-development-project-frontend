import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assignments: [],
};

// { "_id": "A303", "title": "Systems Engineering Exam", "course": "RS103", "available": "May 14 at 12:00am", "due": "May 21 at 11:59pm", "points": 100, "description": "This is a dummy description for Systems Engineering Exam.", "due_date":"2024-05-21", "available_date":"2024-05-14", "until_date":"2024-05-21" }
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        available: assignment.available,
        due: assignment.due,
        points: assignment.points,
        description: assignment.description,
        due_date: assignment.due_date,
        available_date: assignment.available_date,
        until_date: assignment.until_date,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignment._id ? assignment : m
      ) as any;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
