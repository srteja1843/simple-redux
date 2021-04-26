const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

//create initial values
const initialState = {
  users: [],
  error: '',
  isLoading: false,
};
//create actiontypes
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
const fetchUsersSuccess = (data) => {
  return {
    type: FETCH_USERS_SUCCESS,
    data: data,
  };
};
const fetchUsersFail = (error) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  };
};

// create multiple reducers

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return { isLoading: false, users: action.data, error: '' };
    case FETCH_USERS_FAIL:
      return { isLoading: false, users: [], error: action.error };
    default:
      return state;
  }
};

// to call all the above functions create a async function

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        let users = response.data;
        dispatch(fetchUsersSuccess(users.map((users) => users.id)));
      })
      .catch((error) => {
        dispatch(fetchUsersFail(error));
      });
  };
};

// create a store
const store = createStore(usersReducer, applyMiddleware(thunk));
// subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});
//dispatch a action
store.dispatch(fetchUsers());
