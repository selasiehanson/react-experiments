import React, {
  Component
} from 'react';
import styled  from 'styled-components'
import { Provider, Subscribe, Container} from 'unstated';
import { Button } from '../Form'
import { MenuStore} from './stores/MenuStore';
import { OrderStore} from './stores/OrderStore';

const Editor = styled.div`
  display: flex;
`;


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

const MenuItemName = styled.div`
  font-family: cursive;
`;

const MenuItem = ({name, currency, price, addItem}) => {
  return (
    <MenuItemRoot>
      <NameAndAddButton>
        <MenuItemName>
          {name}
        </MenuItemName>
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
  font-family: cursive;
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

const OrderHeaderRoot = styled.div`
  display: flex;
  color: #4db014;
  padding: 1rem;
  font-size: 32px;
  font-family: fantasy;
`

const OrderHeader = () => {
  return (
    <OrderHeaderRoot>
      Eat Something!!
    </OrderHeaderRoot>
  )
}

export default class OrderSomeFood extends Component {
  render () {
    return (
      <Provider>
        <OrderHeader />
        <Editor>
          <Menu></Menu>
          <Orders />
        </Editor>
      </Provider>
    )
  }
}


