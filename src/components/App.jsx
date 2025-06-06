import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import { database, ref, onValue, set, off, auth, signOut } from "../firebase";
import SignIn from "./Auth/SignIn";

const AppWrapper = () => {
    const params = useParams();
    return <App params={params} />;
};

class App extends React.Component {
    state = {
        burgers: {},
        order: {},
        isGuest: false,
    };

    burgersListener = null;

    componentDidMount() {
        const { restaurantId } = this.props.params;
        const burgersRef = ref(database, `${restaurantId}/burgers`);

        const localStorageRef = localStorage.getItem(restaurantId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.burgersListener = onValue(burgersRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({ burgers: data || {} });
        });
    }

    componentDidUpdate() {
        const { restaurantId } = this.props.params;
        localStorage.setItem(restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        if (this.burgersListener) {
            off(ref(database), this.burgersListener);
        }
    }

    writeBurgersToDatabase = () => {
        const { restaurantId } = this.props.params;
        const burgersRef = ref(database, `${restaurantId}/burgers`);
        set(burgersRef, this.state.burgers);
    };

    updateBurger = (key, updatedBurger) => {
        const burgers = { ...this.state.burgers };
        burgers[key] = updatedBurger;
        this.setState({ burgers });
    };

    loadSampleBurgers = () => {
        const burgers = sampleBurgers;
        this.setState({ burgers }, () => {
            this.writeBurgersToDatabase();
        });
    };

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    addBurger = (burger) => {
        const burgers = { ...this.state.burgers };
        burgers[`burger${Date.now()}`] = burger;
        this.setState({ burgers }, () => {
            this.writeBurgersToDatabase();
        });
    };

    deleteBurger = (key) => {
        const burgers = { ...this.state.burgers };
        delete burgers[key];
        this.setState({ burgers }, () => {
            this.writeBurgersToDatabase();
        });
    };

    deleteFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    };

    handleLogout = async () => {
        await signOut(auth);
        window.location.reload();
    };

    changeGuestStatus = () => {
        this.setState(prevState => ({
            isGuest: !prevState.isGuest
        }));
    };

    render() {
        return (
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="Very Hot Burgers" />
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map((key) => (
                                <Burger
                                    key={key}
                                    index={key}
                                    addToOrder={this.addToOrder}
                                    details={this.state.burgers[key]}
                                />
                            ))}
                        </ul>
                    </div>
                    <Order
                        deleteFromOrder={this.deleteFromOrder}
                        burgers={this.state.burgers}
                        order={this.state.order}
                    />
                    <SignIn changeGuestStatus={this.changeGuestStatus} isGuest={this.state.isGuest}>
                        <MenuAdmin
                        deleteBurger={this.deleteBurger}
                        addBurger={this.addBurger}
                        loadSampleBurgers={this.loadSampleBurgers}
                        burgers={this.state.burgers}
                        updateBurger={this.updateBurger}
                        handleLogout={this.handleLogout}
                        />
                    </SignIn>
                </div>

        );
    }
}

export default AppWrapper;