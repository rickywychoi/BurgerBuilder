import React from 'react';
import Aux from '../../../hoc/Aux';

const style = {
  textAlign: 'left'
}

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey=>{
      return<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: </span>{props.ingredients[igKey]}</li>
    })
  return (
    <Aux>
      <button onClick={props.modalClose} type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <br />
      <h3>Order Summary</h3>
      <div style={style}>
        <p>Your Burger with Following Ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
      </div>
      <strong>Total Price: ${props.price.toFixed(2)}</strong>
      <p>Continue to Checkout?</p>

    </Aux>  
  );
}

export default orderSummary;