import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_REQUEST,
  VENDOR_CREATE_RESET,
  VENDOR_CREATE_SUCCESS,
  VENDOR_DELETE_FAIL,
  VENDOR_DELETE_REQUEST,
  VENDOR_DELETE_SUCCESS,
  VENDOR_EDIT_FAIL,
  VENDOR_EDIT_REQUEST,
  VENDOR_EDIT_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_UPDATE_FAIL,
  VENDOR_UPDATE_REQUEST,
  VENDOR_UPDATE_RESET,
  VENDOR_UPDATE_SUCCESS,
} from "../Constants/VendorConstants";

// ALL VENDORS
export const vendorListReducer = (state = { vendors: [] }, action) => {
  switch (action.type) {
    case VENDOR_LIST_REQUEST:
      return { loading: true, vendors: [] };
    case VENDOR_LIST_SUCCESS:
      return { loading: false, vendors: action.payload };
    case VENDOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE VENDOR
export const vendorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_DELETE_REQUEST:
      return { loading: true };
    case VENDOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VENDOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE VENDOR
export const vendorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_CREATE_REQUEST:
      return { loading: true };
    case VENDOR_CREATE_SUCCESS:
      return { loading: false, success: true, vendor: action.payload };
    case VENDOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT VENDOR
export const vendorEditReducer = (
  state = { vendor: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VENDOR_EDIT_REQUEST:
      return { ...state, loading: true };
    case VENDOR_EDIT_SUCCESS:
      return { loading: false, vendor: action.payload };
    case VENDOR_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE VENDOR
export const vendorUpdateReducer = (state = { vendor: {} }, action) => {
  switch (action.type) {
    case VENDOR_UPDATE_REQUEST:
      return { loading: true };
    case VENDOR_UPDATE_SUCCESS:
      return { loading: false, success: true, vendor: action.payload };
    case VENDOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_UPDATE_RESET:
      return { vendor: {} };
    default:
      return state;
  }
};
