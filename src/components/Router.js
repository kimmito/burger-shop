import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Landing from './Landing'
import NotFound from './NotFound'
import App from './App'

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/restaurant/:restaurantId/*" element={<App/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
