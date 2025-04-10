import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Router from './components/Router';
import './css/style.css';

const app = ReactDOMClient.createRoot(document.getElementById("root"));

app.render(<Router />);