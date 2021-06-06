import { combineReducers } from "redux";

import specialistsReducer from "./specialists";

const rootReducer = combineReducers({
  specialists: specialistsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
