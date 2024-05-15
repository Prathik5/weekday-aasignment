import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobData: [],
  filteredJobData: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobData: (state, action) => {
      state.jobData = action.payload;
    },
    setFilteredJobData: (state, action) => {
      state.filteredJobData = action.payload;
    },
  },
});

export const { setJobData, setFilteredJobData } = jobSlice.actions;

export default jobSlice.reducer;
