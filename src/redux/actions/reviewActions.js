import * as types from "@/redux/constants/reviewConstants";

export const setReviewDataAction = (review) => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_SET_DATA,
      payload: { ...review },
    });
  } catch (error) {
    dispatch({
      type: types.REVIEW_FAILED,
      payload: error.message,
    });
  }
};

export const setReviewDataIdAction = (reviewId) => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_SET_ID,
      payload: reviewId || "",
    });
  } catch (error) {
    dispatch({
      type: types.REVIEW_SET_ID,
      payload: error.message,
    });
  }
};

export const resetReviewDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_SET_DATA,
      payload: {
        reviewData: {
          type: "text",
          content: undefined,
        },
        duration: 0,
        language: "ro-RO",
      },
    });
  } catch (error) {
    dispatch({
      type: types.REVIEW_SET_DATA,
      payload: error.message,
    });
  }
};
export const setReviewDataContentAction = (content) => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_SET_CONTENT,
      payload: content || "",
    });
  } catch (error) {
    dispatch({
      type: types.REVIEW_SET_CONTENT,
      payload: error.message,
    });
  }
};

export const setReviewDataTypeAction = (type) => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_SET_TYPE,
      payload: type || "",
    });
  } catch (error) {
    dispatch({
      type: types.REVIEW_SET_TYPE,
      payload: error.message,
    });
  }
};
