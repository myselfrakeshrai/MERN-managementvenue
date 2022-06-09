import axios from "axios";
import {
  VENDOR_CREATE_REVIEW_FAIL,
  VENDOR_CREATE_REVIEW_REQUEST,
  VENDOR_CREATE_REVIEW_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
} from "../Constants/VendorConstants";
import { logout } from "./userActions";

// VENDOR LIST
export const listVendor =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: VENDOR_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/vendors?`
      );
      dispatch({ type: VENDOR_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VENDOR_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE VENDOR
export const listVendorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/vendors/${id}`);
    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// VENDOR REVIEW CREATE
export const createVendorReview =
  (vendorId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: VENDOR_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/vendors/${vendorId}/review`, review, config);
      dispatch({ type: VENDOR_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: VENDOR_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
