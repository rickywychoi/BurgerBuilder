import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  'bacon': 0.7,
  'salad': 0.3,
  'cheese': 0.4,
  'meat': 1.3,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      'bacon': 0,
      'salad': 0,
      'cheese': 0,
      'meat': 0,
    },
    totalPrice: 3.0,
    orderable: false,
    orderFinalize: false,
  }

  updateOrderState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey=>ingredients[igKey])
      .reduce((sum, el)=>sum + el, 0);
    this.setState({orderable: sum > 0})
  };

  orderFinalizeHandler = () => {
    this.setState({orderFinalize: true});
  };

  purchaseCancelHandler = () => {
    this.setState({orderFinalize: false})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice});
    this.updateOrderState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice});
    this.updateOrderState(updatedIngredients);
  };

  render() {
    console.log(this.state.ingredients)

    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal modalShow={this.state.orderFinalize}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            modalClose={this.purchaseCancelHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          orderable={this.state.orderable}
          showModal={this.orderFinalizeHandler}
          ingredients={this.state.ingredients}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;