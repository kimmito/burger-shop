import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers"
import Burger from "./Burger";

class App extends React.Component{
    state={
        burgers: {},
        order: {},
    }

    loadSampleBurgers = () => {
        const burgers = sampleBurgers;
        this.setState({burgers});
    }

    addToOrder = (key) => {
        const order = this.state.order;
        order[key] = order[key] + 1 || 1; 
        this.setState({order});
    }

    addBurger = (burger) => {
        const burgers = {...this.state.burgers}
        burgers[`burger${Date.now()}`] = burger;
        this.setState({burgers});
    }

    render(){
        return(
            
            <div className="burger-paradise">
                <div className="menu">
                    <Header title="Very Hot Burgers"/>
                    <ul className="burgers">
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger key={key} index={key} addToOrder={this.addToOrder} details={this.state.burgers[key]}/>
                        })}
                    </ul>
                </div>
                <Order burgers={this.state.burgers} order={this.state.order}/>
                <MenuAdmin addBurger={this.addBurger} loadSampleBurgers={this.loadSampleBurgers}/>
            </div>
        )
    }
}

export default App;