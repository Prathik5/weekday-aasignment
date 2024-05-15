import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobRole: "ALL",
  location: "ALL",
  minExperience: 0,
  minSalary: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setJobRole: (state, action) => {
      state.jobRole = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setMinExperience: (state, action) => {
      state.minExperience = action.payload;
    },
    setMinSalary: (state, action) => {
      state.minSalary = action.payload;
    },
  },
});

export const { setJobRole, setLocation, setMinExperience, setMinSalary } =
  filterSlice.actions;

export default filterSlice.reducer;
