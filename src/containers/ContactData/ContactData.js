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
        elementType: 'input',   // html type
        elementConfig: {
          type: 'text',   // input tag type
          placeholder: 'Your Name',
        },
        value: '',    // input value
        validation: {
          required: true,    // input validation
          maximumLength: 35
        },
        valid: false    // isValid?
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
          maximumLength: 62
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
          maximumLength: 95
        },
        valid: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
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
        value: '',
        validation: {
          required: true
        },
        valid: false
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

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' &&isValid;
    }
    if(rules.maximumLength) {
      isValid = value.length <= rules.maximumLength &&isValid;
    }

    return isValid;
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
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    console.log('[ContactData.js state] ', this.state);

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
            invalid={formElement.config.valid}
            // inputRef={this.props.formRef}
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