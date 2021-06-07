import { combineReducers } from "redux";

//here we need two reducers

//the first for specialists info
import specialistsReducer from "./specialists";

//and  the second for fetching data about last appointment
import initialDateReducer from "./initialDate";

//the entry point for reducers
const rootReducer = combineReducers({
  specialists: specialistsReducer,
  initialDate: initialDateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
