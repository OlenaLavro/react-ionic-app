import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import db from "../../firebaseConfig";

interface initState {
  loading?: boolean;
  hasErrors?: boolean;
  specialists?: any;
}

const initialState: initState = {};
initialState.hasErrors = false;
initialState.loading = false;
initialState.specialists = {};

// A slice for specialists with our 3 reducers
const splecialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    getSpecialists: (state) => {
      state.loading = true;
    },
    getSpecialistsSuccess: (state, { payload }) => {
      state.specialists = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getSpecialistsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getSpecialists, getSpecialistsSuccess, getSpecialistsFailure } =
  splecialistsSlice.actions;

export const specialistsSelector = (state: RootState) => state.specialists;
// The reducer
export default splecialistsSlice.reducer;

// Asynchronous thunk action
export function fetchSpecialistsInfo() {
  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(getSpecialists());

    try {
      const response = db.collection("specialists");
      const data: any = await response.get();

      dispatch(
        getSpecialistsSuccess(JSON.parse(JSON.stringify(data.docs[0].data())))
      );
    } catch (error) {
      dispatch(getSpecialistsFailure());
    }
  };
}
