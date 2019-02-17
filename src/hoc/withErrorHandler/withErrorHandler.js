import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
import classes from './messages.css';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component{
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.backToPage.bind(this);
      this.reqInterceptor = axios.interceptors.request.use(req=>req, error=>{
        this.setState({error: null});
        return Promise.reject(error);
      });
      this.resInterceptor = axios.interceptors.response.use(res=>res, error=>{
        this.setState({error: error});
        return Promise.reject(error);
      });
    }

    componentWillMount() {
      axios.interceptors.request.eject(this.reqInterceptor);    // Clean up for in case withErrorHandler ends calling axios interceptors for wrapped children components
      axios.interceptors.request.eject(this.resInterceptor);
    }

    backToPage = () => {
      this.setState({error: null});
    }

    render() {
      let errorMessage = null;
      if(this.state.error) {
        errorMessage = (
          <div className={classes.isa_error}>
            <i className="fa fa-times-circle" />
            {this.state.error.message}
            <br />
            <div style={{textAlign: 'center'}}>
              <p></p>
              <p style={{color: 'rgb(108, 117, 125)'}}>By clicking "Back" button, it goes back to previous page.</p>
              <button 
                type="button" 
                className="btn btn-outline-secondary mt-3 mb-2"
                onClick={this.backToPage}>Back</button>
            </div>
          </div>
        );
      }
      return (
        <Aux>
          <Modal modalShow={this.state.error}>
            {errorMessage}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;