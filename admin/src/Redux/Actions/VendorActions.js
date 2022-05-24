import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_REQUEST,
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
  VENDOR_UPDATE_SUCCESS,
} from "../Constants/VendorConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listVendors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VENDOR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/vendors/all`, config);

    dispatch({ type: VENDOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE VENDOR
export const deleteVendor = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VENDOR_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/vendors/${id}`, config);

    dispatch({ type: VENDOR_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VENDOR_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE VENDOR
export const createVendor =
  (name, price, description, image, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: VENDOR_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/vendors/`,
        { name, price, description, image, countInStock },
        config
      );

      dispatch({ type: VENDOR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: VENDOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT VENDOR
export const editVendor = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_EDIT_REQUEST });
    const { data } = await axios.get(`/api/vendors/${id}`);
    dispatch({ type: VENDOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VENDOR_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE VENDOR
export const updateVendor = (vendor) => async (dispatch, getState) => {
  try {
    dispatch({ type: VENDOR_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/vendors/${vendor._id}`,
      vendor,
      config
    );

    dispatch({ type: VENDOR_UPDATE_SUCCESS, payload: data });
    dispatch({ type: VENDOR_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VENDOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
