import React from 'react';
import classes from './BuildControl.css';

const style = {
  margin: '0 0 0 10px'
}

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button 
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}>-</button>
      <button 
        className={classes.More} 
        onClick={props.added}>+</button>
      {props.clicked ? <strong style={style}>({props.numOfItemSelected})</strong> : null}
    </div>
  );
}

export default buildControl;