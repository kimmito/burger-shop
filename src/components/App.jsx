import React from "react";
import { withRouter } from "../utils/withRouter";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers"
import Burger from "./Burger";
import { database, ref, onValue, set, off } from "../firebase";

class App extends React.Component{
    state={
        burgers: {},
        order: {},
    };

    componentDidMount() {
        const { restaurantId } = this.props.params;
        const burgersRef = ref(database, `${restaurantId}/burgers`);
        
        if (this.unsubscribe) {
          this.unsubscribe();
        }
          
        this.unsubscribe = onValue(burgersRef, (snapshot) => {
          const data = snapshot.val();
          this.setState({ burgers: data || {} });
        });
    }


    componentWillUnmount() {
      if (this.unsubscribe && typeof this.unsubscribe === 'function') {
        this.unsubscribe();
      }
      this.unsubscribe = null;
    }

    writeBurgersToDatabase = () => {
        const { restaurantId } = this.props.params;
        const burgersRef = ref(database, `${restaurantId}/burgers`);
        set(burgersRef, this.state.burgers);
      };

    loadSampleBurgers = () => {
        const burgers = sampleBurgers;
        this.setState({burgers}, () => {
            this.writeBurgersToDatabase();});
    }

    addToOrder = (key) => {
        const order = this.state.order;
        order[key] = order[key] + 1 || 1; 
        this.setState({order});
    }

    addBurger = (burger) => {
        const burgers = {...this.state.burgers}
        burgers[`burger${Date.now()}`] = burger;
        this.setState({burgers},  () => {
            this.writeBurgersToDatabase();
          });
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

export default withRouter(App);