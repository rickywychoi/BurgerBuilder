import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  componentWillUpdate() {
    console.log('[Modal] componentWillUpdate()');
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.modalShow !== this.props.modalShow;
  }

  render() {
    return(
      <Aux>
      <Backdrop show={this.props.modalShow} />
      <div 
        className={classes.Modal}
        style={{
          transform: this.props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.modalShow ? '1' : '0'
        }}>
        {this.props.children}
      </div>
    </Aux>
    );
  }
} 

export default Modal;