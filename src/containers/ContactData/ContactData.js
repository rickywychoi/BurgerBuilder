import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import WhiteSpinner from '../../components/UI/Spinner/WhiteSpinner/WhiteSpinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: ''
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: ''
      },
      deliveryType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', disabled: 'disabled', displayValue: 'Select your delivery option'},
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'normal', displayValue: 'Normal'},
          ]
        },
        value: ''
      },
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const orders = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData,
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

  inputChangedHandler = (event, inputIdentifier) => {
    // setState values immutably
    const updatedOrderForm = {
      ...this.state.orderForm   // copy the orderform object shell
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]    // copy the content for each properties
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement=>(
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangedHandler(event, formElement.id)} />
        ))}
        <div className="mt-3">
          <button type="submit" className="btn btn-outline-success">ORDER</button>
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