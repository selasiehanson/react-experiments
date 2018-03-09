import React, { Component } from 'react';
import styled from "styled-components";

const colors = {
  border: '#dedede',
  tabHeaderBackground: 'white'
}

const TabHeader  = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${colors.border};
`;

const TabContent  = styled.div`
  display: flex;
  padding: 1rem;
`;

const TabHead = styled.span`
  color: #303030;
  background: ${colors.tabHeaderBackground};
  border-width: ${props => (props.isActive === true ? "1px" : "0px")};
  margin-bottom: ${props => (props.isActive === true ? "-1px" : "0px")};
  border-style: solid;
  border-bottom: 1px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-color: ${colors.border};
  padding: 0.5rem 1rem;

  &:hover {
		cursor: pointer;
	}

`;
const TabTitle = ({name, title, isActive, onTabSelected} ) => {
  return (
    <TabHead isActive={isActive} onClick={() => onTabSelected(name)}>
      {title}
    </TabHead>
  );
}

const getActiveChild = (children, activeTab) => {
  let index = 0;
  if(activeTab) {
    index = React.Children.toArray(children).findIndex(x => x.props.name === activeTab );
  }

  return index;
}

const renderActiveChild = (children, index) => {
  return React.Children.toArray(children)[index];
}

class Tabs extends Component {

  state = {
    activeTabIndex: -1,
    activeTab: null
  }

  componentDidMount() {
    this.changeTab(this.props.activeTab)
  }

  changeTab = (activeTab) => {
    this.setState(prev => {
      return {
        activeTabIndex: getActiveChild(this.props.children, activeTab),
        activeTab
      }
    });
  }

  render() {
    const { children} = this.props;
    const { activeTab, activeTabIndex} =  this.state;

    if(activeTabIndex < 0)  return null;

    return(
      <div>
        <TabHeader>
        {
          React.Children.map(children, (child, i) => <TabTitle name={child.props.name} title={child.props.title} isActive={ activeTab === child.props.name} onTabSelected={this.changeTab}/>)
        }
        </TabHeader>
        <TabContent>
          { renderActiveChild(children, activeTabIndex)}
        </TabContent>
      </div>
    );
  }
}

class Tab extends Component {
  render() {
   return (<div>{this.props.children}</div>);
  }
}

export { Tabs, Tab};