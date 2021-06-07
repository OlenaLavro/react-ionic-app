import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import db from "../../firebaseConfig";

interface initState {
  loading?: boolean;
  hasErrors?: boolean;
  initialDate?: any;
}

const initialState: initState = {};
initialState.hasErrors = false;
initialState.loading = false;
initialState.initialDate = {};

// A slice for specialists with our 3 reducers
const initialDateSlice = createSlice({
  name: "initialDate",
  initialState,
  reducers: {
    getInitialDate: (state) => {
      state.loading = true;
    },
    getInitialDateSuccess: (state, { payload }) => {
      state.initialDate = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getInitialDateFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getInitialDate, getInitialDateSuccess, getInitialDateFailure } =
  initialDateSlice.actions;

export const initialDateSelector = (state: RootState) => state.initialDate;
// The reducer
export default initialDateSlice.reducer;

// Asynchronous thunk action
export function fetchInitialDateInfo() {
  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(getInitialDate());

    try {
      const response = db.collection("appointment");
      const data: any = await response.get();

      dispatch(
        getInitialDateSuccess(JSON.parse(JSON.stringify(data.docs[0].data())))
      );
    } catch (error) {
      dispatch(getInitialDateFailure());
    }
  };
}
