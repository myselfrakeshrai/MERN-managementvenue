import axios from "axios";
import {
  GIFT_CREATE_REVIEW_FAIL,
  GIFT_CREATE_REVIEW_REQUEST,
  GIFT_CREATE_REVIEW_SUCCESS,
  GIFT_DETAILS_FAIL,
  GIFT_DETAILS_REQUEST,
  GIFT_DETAILS_SUCCESS,
  GIFT_LIST_FAIL,
  GIFT_LIST_REQUEST,
  GIFT_LIST_SUCCESS,
} from "../Constants/GiftConstants";
import { logout } from "./userActions";

// GIFT LIST
export const listGift =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: GIFT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/gifts?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: GIFT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GIFT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE GIFT
export const listGiftDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GIFT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/gifts/${id}`);
    dispatch({ type: GIFT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GIFT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GIFT REVIEW CREATE
export const createGiftReview =
  (giftId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: GIFT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/gifts/${giftId}/review`, review, config);
      dispatch({ type: GIFT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: GIFT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
