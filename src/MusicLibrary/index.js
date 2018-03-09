import React, {
  Component
} from 'react';
import styled  from 'styled-components'
import { Provider, Subscribe, Container} from 'unstated';
import { Button } from '../Form'

const Editor = styled.div`
  display: flex;
`;

class MenuStore extends Container {
  state = {
    menu: [
      {name: "Shrimp Tacos", price: 10.99, currency: "$"},
      {name: "Chicken Tacos", price: 10.99, currency: "$"},
      {name: "Beef Tacos", price: 10.99, currency: "$"},
      {name: "Buffalo Chicken Wings", price: 10.99, currency: "$"},
      {name: "French fries", price: 10.99, currency: "$"},
      {name: "Bacon Egss and Cheese Sandwich", price: 10.99, currency: "$"},
      {name: "Cold Cut Combo Sandwich", price: 10.99, currency: "$"},
      {name: "Hamburger", price: 10.99, currency: "$"},
      {name: "Cheeseburger", price: 10.99, currency: "$"},
    ]
  };
}

const calculateLineTotal = (price, quantity) => price * quantity;

class OrderStore extends Container {
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

const MenuItemRoot = styled.div`
  font-size: 16px;
  padding: 1rem;
  display: flex;
  border-bottom: 1px solid #dedede;
  flex-direction: column;
`;

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const NameAndAddButton = ItemRow.extend`
  justify-content: space-between;
`;
const MenuItem = ({name, currency, price, addItem}) => {
  return (
    <MenuItemRoot>
      <NameAndAddButton>
        {name}
        <Button small onClick={() => addItem({name, price})}>Add</Button>
      </NameAndAddButton>
      <ItemRow>
        Price: {currency}{price}
      </ItemRow>
    </MenuItemRoot>
  );
}

const OrderItemRoot = styled.div`
  display: flex;
  flex-direction: colummn;
  padding: 1rem;
  justify-content: space-between;
`;

const OrderName = styled.div`
  flex: 1;
`;

const OrderPrice = styled.div`

`;

const OrderQuantity = styled.div`
  width: 30px;
`;

const OrderItem  = ({name, price, quantity}) => {
  return(
    <OrderItemRoot>
      <OrderQuantity>{quantity}</OrderQuantity>
      <OrderName>{name}</OrderName>
      <OrderPrice>{price}</OrderPrice>
    </OrderItemRoot>
  );
}

const MenuRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-right: 1rem;
  border: 1px solid #dedede;
`;

const Menu = () =>
  <Subscribe to={[MenuStore, OrderStore]}>
    {(menuStore, orderStore) => (
      <MenuRoot>
          {
            menuStore.state.menu.map((item, idx) => (<MenuItem key={idx}  {...item} addItem={orderStore.addOrder}/>))
          }
      </MenuRoot>
    )}
  </Subscribe>


const OrdersRoot  = styled.div`
  display: flex;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #dedede;
  flex-direction: column;
`;

const OrderTitle = styled.div`
  padding: 1rem;
  // font-weight: bold;
  color: #569B51;
  font-size: 18px;
  background-color: #e7e7e7;
  border-bottom: 1px solid #dedede;
`;

const Orders = ({albums}) => {
  return (
    <Subscribe to={[OrderStore]}>
      {
        (orderStore) => (
          <OrdersRoot>
            <OrderTitle>Orders</OrderTitle>
            <div>
              {
                orderStore.state.orders.map((order, idx) => (<OrderItem key={idx} {...order}/>))
              }
            </div>
          </OrdersRoot>
        )
      }
    </Subscribe >
  )
}


export default class MusicLibrary extends Component {
  render () {
    return (
      <Provider>
        <Editor>
          <Menu></Menu>
          <Orders />
        </Editor>
      </Provider>
    )
  }
}


