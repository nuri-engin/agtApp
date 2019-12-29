//Core
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//UI
import Navbar from "./components/layouts/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

import PeriodDetails from "./components/periods/PeriodDetails";
import CreatePeriod from "./components/periods/CreatePeriod";

import ProductDetails from "./components/products/ProductDetails";
import CreateProduct from "./components/products/CreateProduct";
import ProductList from "./components/products/ProductList";

import FarmDetails from "./components/farms/FarmDetails";
import CreateFarm from "./components/farms/CreateFarm";
import FarmList from "./components/farms/FarmList";

import CreateOrder from "./components/orders/CreateOrder";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            
            {/* AUTH */}
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />

            {/* PERIODS */}
            <Route path="/period/:title" component={PeriodDetails} />
            <Route exact path="/create-period" component={CreatePeriod} />

            {/* PRODUCT */}
            <Route path="/product/:title" component={ProductDetails} />
            <Route exact path="/create-product" component={CreateProduct} />
            <Route exact path="/productlist" component={ProductList} />

             {/* PRODUCT */}
             <Route path="/farm/:title" component={FarmDetails} />
            <Route exact path="/create-farm" component={CreateFarm} />
            <Route exact path="/farmlist" component={FarmList} />

            {/* ORDERS */}
            <Route exact path="/create-order" component={CreateOrder} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
