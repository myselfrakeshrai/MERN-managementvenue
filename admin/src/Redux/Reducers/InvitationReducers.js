import {
  INVITATION_CREATE_FAIL,
  INVITATION_CREATE_REQUEST,
  INVITATION_CREATE_RESET,
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
  INVITATION_UPDATE_RESET,
  INVITATION_UPDATE_SUCCESS,
} from "../Constants/InvitationConstants";

// ALL INVITATIONS
export const invitationListReducer = (state = { invitations: [] }, action) => {
  switch (action.type) {
    case INVITATION_LIST_REQUEST:
      return { loading: true, invitations: [] };
    case INVITATION_LIST_SUCCESS:
      return { loading: false, invitations: action.payload };
    case INVITATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE INVITATION
export const invitationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITATION_DELETE_REQUEST:
      return { loading: true };
    case INVITATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INVITATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE INVITATION
export const invitationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITATION_CREATE_REQUEST:
      return { loading: true };
    case INVITATION_CREATE_SUCCESS:
      return { loading: false, success: true, invitation: action.payload };
    case INVITATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INVITATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT INVITATION
export const invitationEditReducer = (
  state = { invitation: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case INVITATION_EDIT_REQUEST:
      return { ...state, loading: true };
    case INVITATION_EDIT_SUCCESS:
      return { loading: false, invitation: action.payload };
    case INVITATION_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE INVITATION
export const invitationUpdateReducer = (state = { invitation: {} }, action) => {
  switch (action.type) {
    case INVITATION_UPDATE_REQUEST:
      return { loading: true };
    case INVITATION_UPDATE_SUCCESS:
      return { loading: false, success: true, invitation: action.payload };
    case INVITATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INVITATION_UPDATE_RESET:
      return { invitation: {} };
    default:
      return state;
  }
};
