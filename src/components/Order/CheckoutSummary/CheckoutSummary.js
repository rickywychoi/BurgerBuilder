import React from 'react';
import Burger from '../../Burger/Burger/Burger';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>Hope you enjoy your burger!</h1>
    <p></p>
    <div style={{width: '100%', margin: 'auto'}}>
      <Burger ingredients={props.ingredients} />
    </div>
    <div className="mt-4">
        <button type="button" className="btn btn-outline-danger mr-2" onClick={props.checkoutCancelled}>Cancel</button>
        <button type="button" className="btn btn-outline-primary" onClick={props.checkoutContinued}>Continue</button>
    </div>
  </div>
);

export default checkoutSummary;