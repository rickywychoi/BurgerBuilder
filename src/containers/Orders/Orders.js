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
      <a
        href='#'
        onClick={()=>!window.open('https://burger-builder-a99e6.firebaseio.com/')}>[backend]: burger-builder-a99e6.firebaseio.com/</a>
      {this.state.orders.map(order=>(
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.totalPrice}
          orderData={order.orderData}/>
      ))}
    </div>
    );
  }
}

export default withErrorHandler(Orders, axios);