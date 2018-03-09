import { Container } from 'unstated';
export  class MenuStore extends Container {
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