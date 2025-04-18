import React from "react";
import PropTypes from 'prop-types';
import { auth, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "../../firebase";
import Login from "./Login";

class SignIn extends React.Component {
    static propTypes = {
        authHandler: PropTypes.func,
        authenticate: PropTypes.func,
    }

    state = {
        user: null,
    };

    componentDidMount() {
        this.unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }


    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    authHandler = async (authData) => {
        const {email} = authData.user;
        this.setState({user: email});
    };

    authenticate = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then(this.authHandler)
    }

    render(){
        if (!this.state.user){
            return <Login changeGuestStatus={this.props.changeGuestStatus} isGuest={this.props.isGuest} authenticate={this.authenticate}/>
        }
        return this.props.children;
    }
}

export default SignIn;