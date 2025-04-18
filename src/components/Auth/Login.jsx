import React from "react";
import PropTypes from 'prop-types';

const Login = (props) => {
    if (props.isGuest){
        return(
            <div className="guest-auth">
                <button className="github guest-button" onClick={() =>{
                props.authenticate()
            }}>Войти</button>
            </div>

        )
    } 
    else return(
        <div className="login-container">
            <nav className="login">
                <h2>Авторизация</h2>
                <p>Войдите при помощи Github для доступа к Администрированию</p>
                <button className="github" onClick={() =>{
                    props.authenticate()
                }}>Войти</button>
                <button className="notAuth" onClick={() =>{
                    props.changeGuestStatus()
                }}>Продолжить в режиме просмотра без авторизации</button>
            </nav>
        </div>
    )
    
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;