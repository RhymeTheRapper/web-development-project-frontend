import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "/Users/rhymedochtermann/2024/fall/webdev/kanbas-react-web-app/src/Kanbas/Database";
const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (
      state,
      { payload }: PayloadAction<{ courseId: string; userId: string }>
    ) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        course: payload.courseId,
        user: payload.userId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => m._id !== enrollmentId
      );
    },
  },
});
export const { addEnrollment, deleteEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
