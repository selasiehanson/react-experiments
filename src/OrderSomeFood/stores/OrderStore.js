import { Container } from 'unstated';

const calculateLineTotal = (price, quantity) => price * quantity;

export class OrderStore extends Container {
  state = {
    orders: []
  }

  addOrder = (order) => {
    const existingOrderIndex = this.state.orders.findIndex(o => o.name === order.name);
    if(existingOrderIndex === -1) {
      this.setState({ orders: [...this.state.orders, {...order, quantity: 1}] });
    } else {
      const before = this.state.orders.slice(0, existingOrderIndex)
      const after = this.state.orders.slice(existingOrderIndex + 1);
      const existingOrder = this.state.orders[existingOrderIndex];
      const quantity = existingOrder.quantity + 1;
      const price = calculateLineTotal(order.price,quantity);
      const updatedOrder = {...existingOrder, quantity, price };

      this.setState({orders: [...before, updatedOrder ,...after]});
    }
  }
}