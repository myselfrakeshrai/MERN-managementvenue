import {
  INVITATION_CREATE_FAIL,
  INVITATION_CREATE_REQUEST,
  INVITATION_CREATE_SUCCESS,
  INVITATION_DELETE_FAIL,
  INVITATION_DELETE_REQUEST,
  INVITATION_DELETE_SUCCESS,
  INVITATION_EDIT_FAIL,
  INVITATION_EDIT_REQUEST,
  INVITATION_EDIT_SUCCESS,
  INVITATION_LIST_FAIL,
  INVITATION_LIST_REQUEST,
  INVITATION_LIST_SUCCESS,
  INVITATION_UPDATE_FAIL,
  INVITATION_UPDATE_REQUEST,
  INVITATION_UPDATE_SUCCESS,
} from "../Constants/InvitationConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listInvitations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVITATION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/invitations/all`, config);

    dispatch({ type: INVITATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVITATION_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE INVITATION
export const deleteInvitation = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVITATION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/invitations/${id}`, config);

    dispatch({ type: INVITATION_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVITATION_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE INVITATION
export const createInvitation =
  (name, price, description, image, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: INVITATION_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/invitations/`,
        { name, price, description, image, countInStock },
        config
      );

      dispatch({ type: INVITATION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVITATION_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT INVITATION
export const editInvitation = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVITATION_EDIT_REQUEST });
    const { data } = await axios.get(`/api/invitations/${id}`);
    dispatch({ type: INVITATION_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVITATION_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE INVITATION
export const updateInvitation = (invitation) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVITATION_UPDATE_REQUEST });

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
      `/api/invitations/${invitation._id}`,
      invitation,
      config
    );

    dispatch({ type: INVITATION_UPDATE_SUCCESS, payload: data });
    dispatch({ type: INVITATION_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVITATION_UPDATE_FAIL,
      payload: message,
    });
  }
};
