import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/Store";
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);




