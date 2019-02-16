import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
  const control = [   // control for add or remove ingredients
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
  ].map(ctrl => 
    <BuildControl 
      key={ctrl.label}
      label={ctrl.label}
      added={()=>props.ingredientAdded(ctrl.type)}
      removed={()=>props.ingredientRemoved(ctrl.type)}
      disabled={props.disabled[ctrl.type]}
      numOfItemSelected={props.ingredients[ctrl.type]}
      clicked={props.orderable}
    />
  );

  return (
    <div className={classes.BuildControls}>
      <p>* basic buns are $3.00.</p>
      {control}
      <br />
      <strong>Total Price: ${props.price.toFixed(2)}</strong>
      <br />
      <button 
        className={classes.OrderButton}
        disabled={!props.orderable}
        onClick={props.showModal}>ORDER NOW</button>
    </div>
  );
}

export default buildControls;