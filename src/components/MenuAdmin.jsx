import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from "prop-types";

class MenuAdmin extends React.Component{

    static propTypes = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
    }

    render(){
        return(
            <div className="menu-admin">
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