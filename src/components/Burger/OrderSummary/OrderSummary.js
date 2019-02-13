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
      <button onClick={props.modalClose} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <br />
      <h3>Order Summary</h3>
      <p></p>
      <div style={style}>
        <p>Your Burger with Following Ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
      </div>
      <strong>Total Price: ${props.price.toFixed(2)}</strong>
      <hr />
      <p>Continue to Checkout?</p>
      <div className="mb-2">
        <button type="button" className="btn btn-outline-danger mr-2" onClick={props.modalClose}>Cancel</button>
        <button type="button" className="btn btn-outline-primary" onClick={props.purchaseContinue}>Continue</button>
      </div>
    </Aux>  
  );
}

export default orderSummary;