import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import store, {persistor} from './../redux/store/configureStore'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
      <PersistGate loading = {null} persistor = {persistor}>
  <React.StrictMode>
      <BrowserRouter>
    <App />
      </BrowserRouter>
  </React.StrictMode>
        </PersistGate>
    </Provider>
)
