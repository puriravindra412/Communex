import { combineReducers } from 'redux';
import themeReducer from './reducers/theme';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/PostReducer'
const rootReducer = combineReducers({
  theme: themeReducer,
  authReducer:authReducer,
  postReducer:postReducer

});

export default rootReducer;