import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";

// Synchronous store creation for SSR compatibility
const createAppStore = (preloadedState = {}) => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.prepend(thunk), //.concat(logger),
    });

    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

// Async store creation for client-side with data fetching
const createAppStoreAsync = async (preloadedState = {}) => {
  try {
    const store = createAppStore(preloadedState);

    // Add any async initialization logic here if needed
    // For example, dispatching actions to fetch initial data

    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
export { createAppStoreAsync };
