import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastComponent = () => {
  return <ToastContainer autoClose={3000} closeButton={true}></ToastContainer>;
};

export default ToastComponent;
