import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
// Call action
import { status, sort } from './redux/actions';
// Call Reducer
import myReducer from './redux/reducers';

//import css
import "bootstrap/dist/css/bootstrap.min.css";

import RouterComponent from "./containers/App/router";
import * as serviceWorker from "./serviceWorker";

// Create History
const hist = createBrowserHistory();

// Create store
const store = createStore(myReducer);

console.log(store);
store.dispatch(status());

console.log("TOOGLE_STATUS : ", store.getState());
store.dispatch(
   sort({
      by: "name",
      value: -1,
   })
);

console.log("SORT : ", store.getState());

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter history={hist}>
            <RouterComponent />
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
