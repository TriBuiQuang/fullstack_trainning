import {combineReducers} from 'redux';

import status from './status'; //reducer status
import sort from './sort'; // reducer sort

const myReducer = combineReducers({
   status,
   sort
});

export default myReducer;
