import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let receivedIngredients = Object.keys(props.ingredients)
  .map(igKey=>{
    return [...Array(props.ingredients[igKey])].map((_,i)=>{
      // console.log('this is _ ' + _);
      // parameter '_' is curious.
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  // flatten the array => to check the total num of the whole ingredients
  }).reduce((accumulator,currentValue) => 
  accumulator.concat(currentValue),[]);

  console.log('[receivedIngredients] ', receivedIngredients);

  if(receivedIngredients.length === 0) {
    receivedIngredients = <p>Please fill ingredients in!</p>
  } 

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {receivedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
} 

export default burger;