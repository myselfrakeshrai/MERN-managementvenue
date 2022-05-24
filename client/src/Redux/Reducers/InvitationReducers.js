import {
  INVITATION_CREATE_REVIEW_FAIL,
  INVITATION_CREATE_REVIEW_REQUEST,
  INVITATION_CREATE_REVIEW_RESET,
  INVITATION_CREATE_REVIEW_SUCCESS,
  INVITATION_DETAILS_FAIL,
  INVITATION_DETAILS_REQUEST,
  INVITATION_DETAILS_SUCCESS,
  INVITATION_LIST_FAIL,
  INVITATION_LIST_REQUEST,
  INVITATION_LIST_SUCCESS,
} from "../Constants/InvitationConstants";

// INVITATION LIST
export const invitationListReducer = (state = { invitations: [] }, action) => {
  switch (action.type) {
    case INVITATION_LIST_REQUEST:
      return { loading: true, invitations: [] };
    case INVITATION_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        invitations: action.payload.invitations,
      };
    case INVITATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE INVITATION
export const invitationDetailsReducer = (
  state = { invitation: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case INVITATION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case INVITATION_DETAILS_SUCCESS:
      return { loading: false, invitation: action.payload };
    case INVITATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// INVITATION REVIEW CREATE
export const invitationCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITATION_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case INVITATION_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case INVITATION_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case INVITATION_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
