import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

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
    this.setState({loading: true})
    const orders = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Ricky Choi',
        address: {
          streetNumber: '20202',
          street: 'Burger Ave',
          postalCode: 'V0V 8X8'
        },
        email: 'test@test.com',
        deliveryType: 'fastest'
      }
    }
    axios.post('/orders.json', orders)
      .then(request => {
        this.setState({loading: false, orderFinalize: false})
        console.log(request)
      })
      .catch(error => {
        this.setState({loading: false, orderFinalize: false})
        console.log(error)
      })
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
      : <Spinner />);
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <a
            href='#'
            onClick={()=>!window.open('https://burger-builder-a99e6.firebaseio.com/')}>[backend]: burger-builder-a99e6.firebaseio.com/</a>
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
      orderSummary = <Spinner />
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