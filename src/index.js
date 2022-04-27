import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import "antd/dist/antd.less";
import "./Common/css/index.css";
// import 'animate.css';
// import 'antd'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router-dom";
import { TransactionsProvider } from "./context/TransactionContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TransactionsProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </TransactionsProvider>

    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
