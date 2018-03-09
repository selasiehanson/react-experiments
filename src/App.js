import React, { Component } from 'react';
import {TestModal} from './TestComponents';
import {TestUnstated} from './TestUnstated';

import {  Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderRoot = styled.div`
  padding: 1rem;
  background-color: black;
  color: white;
`;

const LinkItem = styled.span`
  padding: 0 1rem;
  color: white;

  &:hover {
    color: #dedede;
  }
`;

const Header = () => {
  return (
    <HeaderRoot>
      <Link to="/"> <LinkItem>Home</LinkItem>  </Link>
      <Link to="/components"> <LinkItem>Components</LinkItem> </Link>
      <Link to="/unstated"> <LinkItem>Test Unstated</LinkItem> </Link>
    </HeaderRoot>
  );
};

const Home = () => {
  return (
    <div> This is home </div>
  )
}

const Body = styled.div`
  padding: 1rem 2rem;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Body>
          <Route exact path="/" component={Home} />
          <Route exact path="/components" component={TestModal} />
          <Route exact path="/unstated" component={TestUnstated} />
        </Body>
      </div>
    );
  }
}

export default App;
