import {
  REVIEW_SET_DATA,
  REVIEW_SET_DURATION,
  REVIEW_SET_LANGUAGE,
  REVIEW_SET_ID,
  REVIEW_SET_CONTENT,
  REVIEW_SET_TYPE,
  REVIEW_FAILED,
} from "@/redux/constants/reviewConstants";
import { defaultLanguage } from "../../locales";

const initialState = {
  reviewData: {
    _id: null,
    content: null,
    type: "text",
  },
  duration: null,
  language: defaultLanguage,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REVIEW_SET_DATA:
      return {
        ...state,
        reviewData: {
          ...state.reviewData,
          ...(payload ? payload.reviewData : null),
        },
        duration: payload ? payload.duration : null,
        language: payload ? payload.language : defaultLanguage,
      };
    case REVIEW_SET_DURATION:
      return {
        ...state,
        duration: payload ? payload.duration : null,
      };
    case REVIEW_SET_LANGUAGE:
      return {
        ...state,
        language: payload ? payload.language : null,
      };
    case REVIEW_SET_TYPE:
      return {
        ...state,
        reviewData: {
          ...state.reviewData,
          type: payload ? payload : "text", // Default to "text" if no type is provided
        },
      };
    case REVIEW_SET_ID: {
      return {
        ...state,
        reviewData: {
          ...state.reviewData,
          _id: payload ? payload : null,
        },
      };
    }
    case REVIEW_SET_CONTENT:
      return {
        ...state,
        reviewData: {
          ...state.reviewData,
          content: payload ? payload : null,
        },
      };
    case REVIEW_FAILED:
      console.log("Review failed:", payload);
      return {
        ...state,
        error: payload ? payload : null,
      };
    default:
      return state;
  }
};
export default reviewReducer;
