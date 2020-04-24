import React from 'react';
import classes from './App.css';
import Aux from './hoc/Aux';
import withClasses from './hoc/withClasses';
import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

const app = () => {
  return (
    <Aux>
      <Layout>
        <Switch>
          <Route path="/burgerbuilder" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Layout>
    </Aux>
  );
}

export default withClasses(app, classes.App);
