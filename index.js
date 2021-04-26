const { createStore, combineReducers, applyMiddleware } = require('redux');
const logger = require('redux-logger').default;

//create initial values
const initialLaptops = {
  numOfLaptops: 100,
};
const initialMobiles = {
  numOfMobiles: 200,
};

//create actiontypes
const buyLaptops = () => {
  return {
    type: 'BUY_LAPTOP',
  };
};
const buyMobiles = () => {
  return {
    type: 'BUY_MOBILES',
  };
};

// create multiple reducers
const laptopReducer = (state = initialLaptops, action) => {
  switch (action.type) {
    case 'BUY_LAPTOP':
      return {
        numOfLaptops: state.numOfLaptops - 1,
      };
    default:
      return state;
  }
};
const mobileReducer = (state = initialMobiles, action) => {
  switch (action.type) {
    case 'BUY_MOBILES':
      return {
        numOfMobiles: state.numOfMobiles - 1,
      };
    default:
      return state;
  }
};
//combine reducers
const rootReducer = combineReducers({
  laptops: laptopReducer,
  mobiles: mobileReducer,
});
//create global store reducer and pass root reducer
const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store);
// subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch function
store.dispatch(buyLaptops());
store.dispatch(buyLaptops());
store.dispatch(buyLaptops());
store.dispatch(buyLaptops());
store.dispatch(buyLaptops());
store.dispatch(buyMobiles());
store.dispatch(buyMobiles());
store.dispatch(buyMobiles());

// redux - logger
/* 
1.first install redux logger  -  npm install redux-logger
2.Import redux-logger  const logger = require("redux-logger").default
3.import applymiddleware from redux
4.pass applymiddleware as a second parametre in createstore and logger as a arguement
*/
