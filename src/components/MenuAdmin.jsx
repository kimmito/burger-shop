import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from "prop-types";
import {auth, onAuthStateChanged} from "../firebase"

class MenuAdmin extends React.Component{

    static propTypes = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
        handleLogout: PropTypes.func.isRequired,
    }

    state = {
        user: {},
    }

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
        const {email, photoURL} = authData.user;
        this.setState({user: email, photo: photoURL});
    };

    render(){
        const {user, photo} = this.state;
        const avatar = photo ? photo : "/images/avatar.png";
        return(
            <div className="menu-admin">
                { user ? 
                <div className="login-header">
                    <div className="avatar">
                        <img src={avatar} alt={user}/>
                    </div> 
                    <button className="buttonLogout" onClick={this.props.handleLogout}>Выйти</button>
                </div> : null}
                <h2>Управление меню</h2>
                {Object.keys(this.props.burgers).map(key => {
                    return <EditBurgerForm deleteBurger={this.props.deleteBurger} updatedBurger={this.props.updateBurger} index={key} key={key} burger={this.props.burgers[key]} />;
                })}
                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
            </div>
        )
    }
}

export default MenuAdmin;