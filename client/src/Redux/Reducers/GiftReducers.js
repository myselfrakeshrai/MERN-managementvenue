import {
  GIFT_CREATE_REVIEW_FAIL,
  GIFT_CREATE_REVIEW_REQUEST,
  GIFT_CREATE_REVIEW_RESET,
  GIFT_CREATE_REVIEW_SUCCESS,
  GIFT_DETAILS_FAIL,
  GIFT_DETAILS_REQUEST,
  GIFT_DETAILS_SUCCESS,
  GIFT_LIST_FAIL,
  GIFT_LIST_REQUEST,
  GIFT_LIST_SUCCESS,
} from "../Constants/GiftConstants";

// GIFT LIST
export const giftListReducer = (state = { gifts: [] }, action) => {
  switch (action.type) {
    case GIFT_LIST_REQUEST:
      return { loading: true, gifts: [] };
    case GIFT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        gifts: action.payload.gifts,
      };
    case GIFT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE GIFT
export const giftDetailsReducer = (
  state = { gift: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case GIFT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GIFT_DETAILS_SUCCESS:
      return { loading: false, gift: action.payload };
    case GIFT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// GIFT REVIEW CREATE
export const giftCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GIFT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case GIFT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case GIFT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case GIFT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
