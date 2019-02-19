import React from 'react';
import classes from './Order.css'

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  console.log(ingredients);

  const ingredientOutput = ingredients.map(ig=>{
    return <span 
      style={{textTransform: 'capitalize'}}
      key={ig.name}>{ig.name}({ig.amount}) </span>
  })
  
  return(
    <div className={classes.Order}>
      <p>{props.orderData.name}</p>
      <p>{props.orderData.email}</p>
      <p>{props.orderData.deliveryType}</p>
      <p>{props.orderData.street}</p>
      <p>{props.orderData.postalCode}</p>
      <p>{ingredientOutput}</p>
      <p>Price: <strong>${props.price}</strong></p>
    </div>
  );
}

export default order;