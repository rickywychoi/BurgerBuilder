import React, { Component } from 'react';
import classes from './Order.css'
import axios from '../../../axios-orders';
import { withRouter } from 'react-router-dom';

class Order extends Component{
  deleteOrderHandler = () => {
    alert(`Are you sure to delete the order with id: \n\n${this.props.thisOrder.id}\n\n?`);
    axios.delete(`/orders/${this.props.thisOrder.id}.json`)
      .then(res=>{
        return res;
      })
      .catch(err=>(
        console.log(err)
      ));
    this.props.orderDeleteHandler();
  }

  render() {
    const ingredients = [];
    for (let ingredientName in this.props.ingredients) {
      ingredients.push({
        name: ingredientName,
        amount: this.props.ingredients[ingredientName]
      });
    }

    console.log(ingredients);
    console.log(this.props);

    const ingredientOutput = ingredients.map(ig=>{
      return <span 
        style={{textTransform: 'capitalize'}}
        key={ig.name}>{ig.name}({ig.amount}) </span>
    })
    return(
      <div className={classes.Order}>
        <p>{this.props.orderData.name}</p>
        <p>{this.props.orderData.email}</p>
        <p>{this.props.orderData.deliveryType}</p>
        <p>{this.props.orderData.street}</p>
        <p>{this.props.orderData.postalCode}</p>
        <p>{ingredientOutput}</p>
        <p>Price: <strong>${this.props.price}</strong></p>
        <button type="button" className="btn btn-outline-danger" onClick={this.deleteOrderHandler}>Delete Order</button>
      </div>
    );
  }
}

export default withRouter(Order);