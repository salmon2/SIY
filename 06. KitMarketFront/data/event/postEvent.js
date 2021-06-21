import {
  ADD_POST_REQUEST,
  CANCEL_JOIN_REQUEST,
  DELETE_POST_REQUEST,
  JOIN_POST_REQUEST,
  UPDATE_JOIN_REQUEST,
  PERMIT_JOIN_REQUEST,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_POST_REQUEST,
  CLOSE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  SEARCH_POSTS_TITLE_REQUEST,
  SEARCH_POSTS_USERNAME_REQUEST,
  LOAD_PARTICIPATING_POST_REQUEST,
} from '../eventName/postEventName';

export const loadMainPostsRequest = (data) => {
  return {
    type: LOAD_MAIN_POSTS_REQUEST,
    data,
  };
};

export const loadPostRequest = (data) => {
  return {
    type: LOAD_POST_REQUEST,
    data,
  };
};

export const addPostRequest = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const joinPostRequest = (data) => {
  return {
    type: JOIN_POST_REQUEST,
    data,
  };
};

export const cancelJoinRequest = (data) => {
  return {
    type: CANCEL_JOIN_REQUEST,
    data,
  };
};

export const updateJoinRequest = (data) => {
  return {
    type: UPDATE_JOIN_REQUEST,
    data,
  };
};

export const permitJoinRequest = (data) => {
  return {
    type: PERMIT_JOIN_REQUEST,
    data,
  };
};

export const loadCreatedPostsRequest = (data) => {
  return {
    type: LOAD_CREATED_POSTS_REQUEST,
    data,
  };
};

export const loadParticipatingPostsRequest = (data) => {
  return {
    type: LOAD_PARTICIPATING_POSTS_REQUEST,
    data,
  };
};

export const loadApplicatedPostsRequest = (data) => {
  return {
    type: LOAD_APPLICATED_POSTS_REQUEST,
    data,
  };
};

export const deletePostRequest = (data) => {
  return {
    type: DELETE_POST_REQUEST,
    data,
  };
};

export const updatePostRequest = (data) => {
  return {
    type: UPDATE_POST_REQUEST,
    data,
  };
};

export const closePostRequest = (data) => {
  return {
    type: CLOSE_POST_REQUEST,
    data,
  };
};

export const searchPostsTitleRequest = (data) => {
  return {
    type: SEARCH_POSTS_TITLE_REQUEST,
    data,
  };
};

export const searchPostsUsernameRequest = (data) => {
  return {
    type: SEARCH_POSTS_USERNAME_REQUEST,
    data,
  };
};

export const loadParticipatingPostRequest = (data) => {
  return {
    type: LOAD_PARTICIPATING_POST_REQUEST,
    data,
  };
};
