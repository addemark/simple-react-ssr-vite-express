import { combineReducers } from "redux";

import reviewReducer from "@/redux/reducers/review.js";

const rootReducer = combineReducers({
  review: reviewReducer,
});

export default rootReducer;
