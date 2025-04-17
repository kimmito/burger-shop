import React from "react";
import PropTypes from 'prop-types';

const Login = (props) => {
    return(
        <div className="login-container">
            <nav className="login">
                <h2>Авторизация</h2>
                <p>Войдите при помощи Github</p>
                <button className="github" onClick={() =>{
                    props.authenticate()
                }}>Войти</button>
                <button className="notAuth">Продолжить в режиме просмотра без авторизации</button>
            </nav>
        </div>
    )
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;