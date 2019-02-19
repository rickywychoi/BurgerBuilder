import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import WhiteSpinner from '../../components/UI/Spinner/WhiteSpinner/WhiteSpinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    const orders = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Ricky Choi',
        address: {
          street: 'Burger Ave',
          postalCode: 'V0V 8X8'
        },
        email: 'test@test.com',
        deliveryType: 'fastest'
      }
    }
    axios.post('/orders.json', orders)
      .then(request => {
        this.setState({loading: false})
        console.log(request)
        this.props.history.push('/orders');
      })
      .catch(error => {
        this.setState({loading: false})
        console.log(error)
      })
  }

  render() {
    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your E-mail" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
          <div className="mt-3">
            <button type="button" className="btn btn-outline-success" onClick={this.orderHandler}>ORDER</button>
          </div>
        </form>
    );
    if (this.state.loading) {
      form = <WhiteSpinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data.</h4>
        {form}
      </div>
    );
  }
}

export default withErrorHandler(ContactData, axios);