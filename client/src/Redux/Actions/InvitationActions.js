import axios from "axios";
import {
  INVITATION_CREATE_REVIEW_FAIL,
  INVITATION_CREATE_REVIEW_REQUEST,
  INVITATION_CREATE_REVIEW_SUCCESS,
  INVITATION_DETAILS_FAIL,
  INVITATION_DETAILS_REQUEST,
  INVITATION_DETAILS_SUCCESS,
  INVITATION_LIST_FAIL,
  INVITATION_LIST_REQUEST,
  INVITATION_LIST_SUCCESS,
} from "../Constants/InvitationConstants";
import { logout } from "./userActions";

// INVITATION LIST
export const listInvitation =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: INVITATION_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/invitations?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: INVITATION_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: INVITATION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE INVITATION
export const listInvitationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVITATION_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/invitations/${id}`);
    dispatch({ type: INVITATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INVITATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// INVITATION REVIEW CREATE
export const createInvitationReview =
  (invitationId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: INVITATION_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/invitations/${invitationId}/review`, review, config);
      dispatch({ type: INVITATION_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVITATION_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
