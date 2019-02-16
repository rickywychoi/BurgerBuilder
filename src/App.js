import React from 'react';
import classes from './App.css';
import Aux from './hoc/Aux'
import withClasses from './hoc/withClasses';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

const app = (props) => {
  return (
    <Aux>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Aux>
  );
}

export default withClasses(app, classes.App);
