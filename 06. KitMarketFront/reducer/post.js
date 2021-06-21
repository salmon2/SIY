import produce from 'immer';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  CANCEL_JOIN_FAILURE,
  CANCEL_JOIN_REQUEST,
  CANCEL_JOIN_SUCCESS,
  UPDATE_JOIN_REQUEST,
  UPDATE_JOIN_SUCCESS,
  UPDATE_JOIN_FAILURE,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  JOIN_POST_FAILURE,
  JOIN_POST_REQUEST,
  JOIN_POST_SUCCESS,
  PERMIT_JOIN_REQUEST,
  PERMIT_JOIN_SUCCESS,
  PERMIT_JOIN_FAILURE,
  LOAD_APPLICATED_POSTS_FAILURE,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_APPLICATED_POSTS_SUCCESS,
  LOAD_CREATED_POSTS_FAILURE,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_PARTICIPATING_POSTS_FAILURE,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  CLOSE_POST_REQUEST,
  CLOSE_POST_SUCCESS,
  CLOSE_POST_FAILURE,
  SEARCH_POSTS_TITLE_REQUEST,
  SEARCH_POSTS_TITLE_SUCCESS,
  SEARCH_POSTS_TITLE_FAILURE,
  SEARCH_POSTS_USERNAME_REQUEST,
  SEARCH_POSTS_USERNAME_SUCCESS,
  SEARCH_POSTS_USERNAME_FAILURE,
  LOAD_PARTICIPATING_POST_REQUEST,
  LOAD_PARTICIPATING_POST_SUCCESS,
  LOAD_PARTICIPATING_POST_FAILURE,
} from '../data/eventName/postEventName';

const initialState = {
  isLoadingPosts: false,
  isLoadedPosts: false,
  isLoadingPost: false,
  isLoadedPost: false,
  singlePost: {
    createdAt: '',
    deadLine: '',
    applications: [],
    participants: [],
  },
  meta: {},
  mainPosts: [],
  isPosting: false,
  isPosted: false,
  isJoiningPost: false,
  isJoinedPost: false,
  isCancellingJoin: false,
  isCancelledJoin: false,
  isUpdatingJoin: false,
  isUpdatedJoin: false,
  isPermittingJoin: false,
  isPermittedJoin: false,
  createdPosts: {
    data: [],
  },
  participatingPosts: {
    data: [],
  },
  applicatedPosts: {
    data: [],
  },
  isDeletingPost: false,
  isDeletedPost: false,
  isUpdatingPost: false,
  isUpdatedPost: false,
  isClosingPost: false,
  isClosedPost: false,
  error: '',
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAIN_POSTS_REQUEST:
        console.log('qwerqwerqwer');
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_MAIN_POSTS_SUCCESS:
        console.log('zxcvzxcvzxcv');
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.mainPosts = action.data.data;
        draft.meta.size = action.data.size;
        draft.meta.currentPage = action.data.currentPage;
        draft.meta.maxPage = action.data.maxPage;
        break;

      case LOAD_MAIN_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.isLoadingPost = true;
        draft.isLoadedPost = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.isLoadingPost = false;
        draft.isLoadedPost = true;
        draft.singlePost = action.data;
        break;

      case LOAD_POST_FAILURE:
        draft.isLoadingPost = false;
        draft.isLoadedPost = false;
        draft.error = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.isPosting = true;
        draft.isPosted = false;
        draft.error = '';
        break;

      case ADD_POST_SUCCESS:
        draft.isPosting = false;
        draft.isPosted = true;
        draft.error = '';
        break;

      case ADD_POST_FAILURE:
        draft.isPosting = false;
        draft.isPosted = false;
        draft.error = action.error;
        break;

      case JOIN_POST_REQUEST:
        draft.isJoiningPost = true;
        draft.isJoinedPost = false;
        draft.error = '';
        break;

      case JOIN_POST_SUCCESS:
        draft.isJoiningPost = false;
        draft.isJoinedPost = true;
        draft.error = '';
        break;

      case JOIN_POST_FAILURE:
        draft.isJoiningPost = false;
        draft.isJoinedPost = false;
        draft.error = action.error;
        break;

      case CANCEL_JOIN_REQUEST:
        draft.isCancellingJoin = true;
        draft.isCancelledJoin = false;
        draft.error = '';
        break;

      case CANCEL_JOIN_SUCCESS:
        draft.isCancellingJoin = false;
        draft.isCancelledJoin = true;
        draft.isJoinedPost = false;
        draft.singlePost.applications.pop();
        draft.error = '';
        break;

      case CANCEL_JOIN_FAILURE:
        draft.isCancellingJoin = false;
        draft.isCancelledJoin = false;
        draft.error = action.error;
        break;

      case UPDATE_JOIN_REQUEST:
        draft.isUpdatingJoin = true;
        draft.isUpdatedJoin = false;
        draft.error = '';
        break;

      case UPDATE_JOIN_SUCCESS:
        draft.isUpdatingJoin = false;
        draft.isUpdatedJoin = true;
        draft.error = '';
        break;

      case UPDATE_JOIN_FAILURE:
        draft.isUpdatingJoin = false;
        draft.isUpdatedJoin = false;
        draft.erro = action.error;
        break;

      case PERMIT_JOIN_REQUEST:
        draft.isPermittingJoin = true;
        draft.isPermittedJoin = false;
        draft.error = '';
        break;

      case PERMIT_JOIN_SUCCESS:
        draft.isPermittingJoin = false;
        draft.isPermittedJoin = true;
        draft.error = '';
        break;

      case PERMIT_JOIN_FAILURE:
        draft.isPermittingJoin = false;
        draft.isPermittedJoin = false;
        draft.error = action.error;
        break;

      case LOAD_CREATED_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_CREATED_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.createdPosts = action.data;
        draft.error = '';
        break;

      case LOAD_CREATED_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_PARTICIPATING_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.participatingPosts = action.data;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case LOAD_APPLICATED_POSTS_REQUEST:
        draft.isLoadingPosts = true;
        draft.isLoadedPosts = false;
        draft.error = '';
        break;

      case LOAD_APPLICATED_POSTS_SUCCESS:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = true;
        draft.applicatedPosts = action.data;
        draft.error = '';
        break;

      case LOAD_APPLICATED_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.isLoadedPosts = false;
        draft.error = action.error;
        break;

      case DELETE_POST_REQUEST:
        draft.isDeletingPost = true;
        draft.isDeletedPost = false;
        draft.error = '';
        break;

      case DELETE_POST_SUCCESS:
        draft.isDeletingPost = false;
        draft.isDeletedPost = true;
        draft.error = '';
        break;

      case DELETE_POST_FAILURE:
        draft.isDeletingPost = false;
        draft.isDeletedPost = false;
        draft.error = action.error;
        break;

      case UPDATE_POST_REQUEST:
        draft.isUpdatingPost = true;
        draft.isUpdatedPost = false;
        draft.error = '';
        break;

      case UPDATE_POST_SUCCESS:
        draft.isUpdatingPost = false;
        draft.isUpdatedPost = true;
        draft.error = '';
        break;

      case UPDATE_POST_FAILURE:
        draft.isUpdatingPost = false;
        draft.isUpdatedPost = false;
        draft.error = action.error;
        break;

      case CLOSE_POST_REQUEST:
        draft.isClosingPost = true;
        draft.isClosedPost = false;
        draft.error = '';
        break;

      case CLOSE_POST_SUCCESS:
        draft.isClosingPost = false;
        draft.isClosedPost = true;
        draft.error = '';
        break;

      case CLOSE_POST_FAILURE:
        draft.isClosingPost = false;
        draft.isClosedPost = false;
        draft.error = action.error;
        break;

      case SEARCH_POSTS_TITLE_REQUEST:
        draft.isSearchingPost = true;
        draft.isSearchedPost = false;
        draft.error = '';
        break;

      case SEARCH_POSTS_TITLE_SUCCESS:
        draft.isSearchingPost = false;
        draft.isSearchedPost = true;
        draft.mainPosts = action.data.data;
        draft.meta.size = action.data.size;
        draft.meta.currentPage = action.data.currentPage;
        draft.meta.maxPage = action.data.maxPage;
        draft.error = '';
        break;

      case SEARCH_POSTS_TITLE_FAILURE:
        draft.isSearchingPost = false;
        draft.isSearchedPost = false;
        draft.error = action.error;
        break;

      case SEARCH_POSTS_USERNAME_REQUEST:
        draft.isSearchingPost = true;
        draft.isSearchedPost = false;
        draft.error = '';
        break;

      case SEARCH_POSTS_USERNAME_SUCCESS:
        draft.isSearchingPost = false;
        draft.isSearchedPost = true;
        draft.mainPosts = action.data.data;
        draft.meta.size = action.data.size;
        draft.meta.currentPage = action.data.currentPage;
        draft.meta.maxPage = action.data.maxPage;
        draft.error = '';
        break;

      case SEARCH_POSTS_USERNAME_FAILURE:
        draft.isSearchingPost = false;
        draft.isSearchedPost = false;
        draft.error = action.error;
        break;

      case LOAD_PARTICIPATING_POST_REQUEST:
        draft.isLoadingPost = true;
        draft.isLoadedPost = false;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POST_SUCCESS:
        draft.isLoadingPost = false;
        draft.isLoadedPost = true;
        draft.singlePost = action.data;
        draft.error = '';
        break;

      case LOAD_PARTICIPATING_POST_FAILURE:
        draft.isLoadingPost = false;
        draft.isLoadedPost = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
