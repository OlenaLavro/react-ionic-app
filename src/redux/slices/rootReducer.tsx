import { combineReducers } from "redux";

import specialistsReducer from "./specialists";
import initialDateReducer from "./initialDate";

const rootReducer = combineReducers({
  specialists: specialistsReducer,
  initialDate: initialDateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
