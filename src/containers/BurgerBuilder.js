import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>
          <span>
          <button type="button">Bread Bottom</button>
          <button type="button">Meat</button>
          <button type="button">Cheese</button>
          <button type="button">Salad</button>
          <button type="button">Bacon</button>
          <button type="button">Bread Top</button>
          </span>
        </div>
      </Aux>
    )
  }
}

export default BurgerBuilder;