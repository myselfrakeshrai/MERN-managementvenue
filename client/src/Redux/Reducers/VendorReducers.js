import {
  VENDOR_CREATE_REVIEW_FAIL,
  VENDOR_CREATE_REVIEW_REQUEST,
  VENDOR_CREATE_REVIEW_RESET,
  VENDOR_CREATE_REVIEW_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
} from "../Constants/VendorConstants";

// VENDOR LIST
export const vendorListReducer = (state = { vendors: [] }, action) => {
  switch (action.type) {
    case VENDOR_LIST_REQUEST:
      return { loading: true, vendors: [] };
    case VENDOR_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        vendors: action.payload.vendors,
      };
    case VENDOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE VENDOR
export const vendorDetailsReducer = (
  state = { vendor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VENDOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case VENDOR_DETAILS_SUCCESS:
      return { loading: false, vendor: action.payload };
    case VENDOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// VENDOR REVIEW CREATE
export const vendorCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case VENDOR_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case VENDOR_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
