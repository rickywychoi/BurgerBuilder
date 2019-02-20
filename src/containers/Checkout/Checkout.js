import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Aux from '../../hoc/Aux';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
    }
    // this.focusContactFormRef = React.createRef();
  }
  

  componentWillMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = param[1];
      }else {
        // ['salad', '1']
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({
      ingredients: ingredients, 
      totalPrice: totalPrice
    });
  }

  checkoutCancelHandler = () => {   // This way of creating method in class doesn't need binding in constructor
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    // this.focusContactFormRef.focus();
  }

  render() {
    console.log(this.focusContactFormRef);
    return(
      <Aux>
        <CheckoutSummary 
          ingredients={this.state.ingredients} 
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'}
          // ref={this.focusContactFormRef}
          render={(props)=>(
            <ContactData 
              ingredients={this.state.ingredients} 
              totalPrice={this.state.totalPrice}
              // formRef={this.props.ref}
              {...props} />)}
        />
      </Aux>
    );
  }
}

export default Checkout;