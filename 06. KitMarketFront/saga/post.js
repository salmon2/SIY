import axios from 'axios';

import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { backURL } from '../config/config';
import {
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  JOIN_POST_REQUEST,
  JOIN_POST_SUCCESS,
  JOIN_POST_FAILURE,
  CANCEL_JOIN_REQUEST,
  CANCEL_JOIN_SUCCESS,
  CANCEL_JOIN_FAILURE,
  UPDATE_JOIN_REQUEST,
  UPDATE_JOIN_SUCCESS,
  UPDATE_JOIN_FAILURE,
  PERMIT_JOIN_REQUEST,
  PERMIT_JOIN_SUCCESS,
  PERMIT_JOIN_FAILURE,
  LOAD_CREATED_POSTS_REQUEST,
  LOAD_CREATED_POSTS_SUCCESS,
  LOAD_CREATED_POSTS_FAILURE,
  LOAD_PARTICIPATING_POSTS_REQUEST,
  LOAD_PARTICIPATING_POSTS_SUCCESS,
  LOAD_PARTICIPATING_POSTS_FAILURE,
  LOAD_APPLICATED_POSTS_REQUEST,
  LOAD_APPLICATED_POSTS_SUCCESS,
  LOAD_APPLICATED_POSTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
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

const defaultURL = backURL + '/post-service';

const {
  dummyPosts,
  applicatedPosts,
  createdPosts,
  dummyPost,
  participatingPosts,
} = require('../data/dummy/postDummy');

function loadPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/${data.category}?status=${data.status}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

const loadDummyPosts = (data) => {
  for (let p of dummyPosts) {
    if (p.currentPage === data.page) {
      return p;
    }
  }
};
//됨
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    console.log(action.data, 'loadPostsssssssssssss');
    // const result = { data: loadDummyPosts(action.data) };
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}
//됨
function loadPostAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/${data.category}/all?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadPost(action) {
  try {
    console.log(action.data, 'load posttttttt');
    const result = yield call(loadPostAPI, action.data);
    // const result = dummyPost;
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      error,
    });
  }
}

//저장 카테고리별로 되도록 바꾸기
function addPostAPI(data) {
  return axios({
    method: 'POST',
    url: `${defaultURL}/api/${data.category}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data,
  });
}

function* addPost(action) {
  try {
    yield call(addPostAPI, action.data);
    console.log(action.data, 'adddddddddd');
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error,
    });
  }
}

function joinPostAPI(data) {
  return axios({
    method: 'POST',
    url: `${defaultURL}/api/app/join?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username, content: data.content },
  });
}

// 됨
function* joinPost(action) {
  console.log(action.data, 'joinnnnnnnnnnn');
  try {
    yield call(joinPostAPI, action.data);
    yield put({
      type: JOIN_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: JOIN_POST_FAILURE,
      error,
    });
  }
}

function cancelJoinAPI(data) {
  return axios({
    method: 'DELETE',
    url: `${defaultURL}/api/app/cancle?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username },
  });
}

//됨
function* cancelJoin(action) {
  try {
    console.log(action.data, 'cancelllllllll');
    yield call(cancelJoinAPI, action.data);
    yield put({
      type: CANCEL_JOIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: CANCEL_JOIN_FAILURE,
      error,
    });
  }
}

function updateJoinAPI(data) {
  return axios({
    method: 'PUT',
    url: `${defaultURL}/api/app/update?postId=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { username: data.username, content: data.content },
  });
}

function* updateJoin(action) {
  try {
    console.log(action.data, 'update join');
    yield call(updateJoinAPI, action.data);
    yield put({
      type: UPDATE_JOIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UPDATE_JOIN_FAILURE,
      error,
    });
  }
}

function permitJoinAPI(data) {
  return axios({
    method: 'POST',
    url: `${defaultURL}/api/app/permit`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: { appIds: data.appIds, hostName: data.hostName },
  });
}

function* permitJoin(action) {
  try {
    console.log(action.data, 'permitttttttttttttt');
    yield call(permitJoinAPI, action.data);
    yield put({
      type: PERMIT_JOIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: PERMIT_JOIN_FAILURE,
      error,
    });
  }
}

function loadCreatedPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/my?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadCreatedPosts(action) {
  try {
    console.log(action.data, 'my postsssssss');
    // const result = createdPosts;
    const result = yield call(loadCreatedPostsAPI, action.data);
    yield put({
      type: LOAD_CREATED_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_CREATED_POSTS_FAILURE,
      error,
    });
  }
}

function loadParticipatingPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/participant?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
//됨
function* loadParticipatingPosts(action) {
  try {
    console.log(action.data, 'participating postsssss');
    // const result = participatingPosts;
    const result = yield call(loadParticipatingPostsAPI, action.data);
    yield put({
      type: LOAD_PARTICIPATING_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PARTICIPATING_POSTS_FAILURE,
      error,
    });
  }
}

function loadApplicatedPostsAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/application?username=${data.username}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}
// 신청중인 모임들
//됨
function* loadApplicatedPosts(action) {
  try {
    console.log(action.data, 'applicated postssssss');
    const result = yield call(loadApplicatedPostsAPI, action.data);
    // const result = applicatedPosts;
    yield put({
      type: LOAD_APPLICATED_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_APPLICATED_POSTS_FAILURE,
      error,
    });
  }
}

function deletePostAPI(data) {
  return axios({
    method: 'DELETE',
    url: `${defaultURL}/api/post?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* deletePost(action) {
  try {
    console.log(action.data, 'deleteeeeeee');
    yield call(deletePostAPI, action.data);
    yield put({
      type: DELETE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: DELETE_POST_FAILURE,
      error,
    });
  }
}

function updatePostAPI(data) {
  return axios({
    method: 'PUT',
    url: `${defaultURL}/api/${data.data.category}?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    data: data.data,
  });
}

function* updatePost(action) {
  try {
    console.log(action.data, 'updateeee');
    yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UPDATE_POST_FAILURE,
      error,
    });
  }
}

function closePostAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/closed?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* closePost(action) {
  try {
    console.log(action.data, 'closeee');
    yield call(closePostAPI, action.data);
    yield put({
      type: CLOSE_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: CLOSE_POST_FAILURE,
      error,
    });
  }
}

function searchPostsTitleAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/search/title?key=${encodeURIComponent(
      data.search
    )}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* searchPostsTitle(action) {
  try {
    console.log(action.data, 'searchhhhhhhhhhhhhhhhtitle');
    const result = yield call(searchPostsTitleAPI, action.data);
    // const result = { data: loadDummyPosts(action.data) };
    yield put({
      type: SEARCH_POSTS_TITLE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SEARCH_POSTS_TITLE_FAILURE,
      error,
    });
  }
}

function searchPostsUsernameAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/post/search/username?key=${encodeURIComponent(
      data.search
    )}&offset=${data.page}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* searchPostsUsername(action) {
  try {
    console.log(action.data, 'searchhhhhhhhhhhhhhhhusername');
    const result = yield call(searchPostsUsernameAPI, action.data);
    // const result = { data: loadDummyPosts(action.data) };
    yield put({
      type: SEARCH_POSTS_USERNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SEARCH_POSTS_USERNAME_FAILURE,
      error,
    });
  }
}

function loadParticipatingPostAPI(data) {
  return axios({
    method: 'GET',
    url: `${defaultURL}/api/${data.category}/participanting?id=${data.id}`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  });
}

function* loadParticipatingPost(action) {
  try {
    //const result = yield call(loadParticipatingPostAPI, action.data);
    console.log(action.data);
    const result = { data: loadDummyPosts(action.data) };
    yield put({
      type: LOAD_PARTICIPATING_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_PARTICIPATING_POST_FAILURE,
      error,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchJoinPost() {
  yield takeLatest(JOIN_POST_REQUEST, joinPost);
}

function* watchCancelJoin() {
  yield takeLatest(CANCEL_JOIN_REQUEST, cancelJoin);
}

function* watchUpdateJoin() {
  yield takeLatest(UPDATE_JOIN_REQUEST, updateJoin);
}

function* watchPermitJoin() {
  yield takeLatest(PERMIT_JOIN_REQUEST, permitJoin);
}

function* watchLoadCreatePosts() {
  yield takeLatest(LOAD_CREATED_POSTS_REQUEST, loadCreatedPosts);
}

function* watchLoadParticipatingPosts() {
  yield takeLatest(LOAD_PARTICIPATING_POSTS_REQUEST, loadParticipatingPosts);
}

function* watchLoadApplicatedPosts() {
  yield takeLatest(LOAD_APPLICATED_POSTS_REQUEST, loadApplicatedPosts);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchClosePost() {
  yield takeLatest(CLOSE_POST_REQUEST, closePost);
}

function* watchSearchPostsTitle() {
  yield takeLatest(SEARCH_POSTS_TITLE_REQUEST, searchPostsTitle);
}

function* watchSearchPostsUsername() {
  yield takeLatest(SEARCH_POSTS_USERNAME_REQUEST, searchPostsUsername);
}

function* watchLoadParticipatingPost() {
  yield takeLatest(LOAD_PARTICIPATING_POST_REQUEST, loadParticipatingPost);
}

export default function* chattingSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchJoinPost),
    fork(watchCancelJoin),
    fork(watchUpdateJoin),
    fork(watchPermitJoin),
    fork(watchLoadCreatePosts),
    fork(watchLoadParticipatingPosts),
    fork(watchLoadApplicatedPosts),
    fork(watchDeletePost),
    fork(watchUpdatePost),
    fork(watchClosePost),
    fork(watchSearchPostsTitle),
    fork(watchSearchPostsUsername),
    fork(watchLoadParticipatingPost),
  ]);
}
