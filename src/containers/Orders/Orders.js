import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(res=>{
        console.log(res);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            id: key,
            ...res.data[key]
          });
        }
        this.setState({orders: fetchedOrders, loading: false})
      })
      .catch(err=>{
        this.setState({loading: false})
      })    
  }

  render() {
    console.log('[Orders.js state]', this.state.orders);
    return (
    <div>
      {this.state.orders.map(order=>(
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.totalPrice}/>
      ))}
    </div>
    );
  }
}

export default withErrorHandler(Orders, axios);