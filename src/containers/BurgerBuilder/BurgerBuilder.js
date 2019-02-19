import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import OrangeSpinner from '../../components/UI/Spinner/OrangeSpinner/OrangeSpinner';
import WhiteSpinner from '../../components/UI/Spinner/WhiteSpinner/WhiteSpinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {   // capital letters for global variable
  'bacon': 0.7,
  'salad': 0.3,
  'cheese': 0.4,
  'meat': 1.3,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3.0,
    orderable: false,
    orderFinalize: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response=>{
      this.setState({ingredients: response.data});
    })
    .catch(error=>{
      this.setState({error: true});
      console.log(error);
    });
  }

  updateOrderState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey=>ingredients[igKey])
      .reduce((sum, el)=>sum + el, 0);
    this.setState({orderable: sum > 0})  // sum automaically returns true or false
  }

  orderFinalizeHandler = () => {
    this.setState({orderFinalize: true});
  }

  purchaseCancelHandler = () => {
    this.setState({orderFinalize: false})
  }

  purchaseContinueHandler = () => {
    console.log(this.props);
    const queryParams = [];
    for(let ig in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ig) + '=' + encodeURIComponent(this.state.ingredients[ig]));
    }
    queryParams.push('price=' + this.state.totalPrice.toFixed(2));
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients   // copy(spread) ingredients object into new object to prevent mutating the state
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice});
    this.updateOrderState(updatedIngredients);
  }

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
  }

  render() {
    console.log('[this.state.ingredients] ', this.state.ingredients)

    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = (
      this.state.error 
      ? <p style={{textAlign: 'center', color: 'red'}}>[Error]: Cannot fetch the initial ingredients from the server.</p> 
      : <OrangeSpinner />);
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        modalClose={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
    }
    if(this.state.loading) {
      orderSummary = <WhiteSpinner />
    }

    return (
      <Aux>
        <Modal 
          modalShow={this.state.orderFinalize}
          modalClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);