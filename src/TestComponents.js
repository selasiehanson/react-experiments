import React from "react";
import styled from "styled-components";

import { Button, Input, Label } from "./Form";
import { Modal, ModalHeader, ModalBody, Dialog, ModalFooter, HeaderTitle } from "./Modal";
import { Tabs, Tab} from './Tabs';

const TestHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
`;

class TestModal extends React.Component {
  state = {
    showModal: false,
    showConfirm: false,
    showTabs: true
  };

  closeModal = () => {
    this.setState(state => {
      return { showModal: false };
    });
  };

  closeDialog = () => {
    this.setState(state => {
      return { showConfirm: false };
    });
  };

  render() {
    return (
      <div>
        <TestHeader>
          <h2>Components</h2>
          <ButtonContainer>
            <Button onClick={() => this.setState({ showModal: true })}>
              Show Modal
            </Button>
            <Button onClick={() => this.setState({ showConfirm: true })}>
              show Confirm dialog
            </Button>

            <Button onClick={() => this.setState({showTabs: true})}>
              Show Tabs
            </Button>
          </ButtonContainer>
        </TestHeader>

        <Modal showModal={this.state.showModal} size={"medium"}>
          <ModalHeader onClose={this.closeModal}>
            <HeaderTitle>This is the header</HeaderTitle>
          </ModalHeader>
          <ModalBody>
            <form>
              <div>
                <Label>First Name</Label>
                <Input type="text" name="first_name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input type="text" name="last_name" />
              </div>
              <div>
                <Label>Age</Label>
                <Input type="text" name="age" />
              </div>
              <div>
                <Label>Gender</Label>
                <Input type="text" name="gender" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button>Save</Button>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button onClick={() => this.setState({ showConfirm: true })}>Show Dialog</Button>
          </ModalFooter>
        </Modal>

        <Dialog show={this.state.showConfirm} size={"small"}>
          <h4>Are u sure you want to cancel?</h4>
          <div>
            <Button onClick={() => console.log("Making request to backend...")}>
              Yes
            </Button>
            <Button onClick={this.closeDialog}>Cancel</Button>
          </div>
        </Dialog>
        {
          this.state.showTabs &&
          (
            <TabContainer>
              <Tabs activeTab="3">
                <Tab title="Tab 1" name={"1"}> Content for tab 1</Tab>
                <Tab title="Tab 2" name={"2"}> Content for tab 2</Tab>
                <Tab title="Tab 3" name={"3"}> Content for tab 3</Tab>
                <Tab title="Tab 4" name={"4"}> Content for tab 4</Tab>
                <Tab title="Tab 5" name={"5"}> Content for tab 5</Tab>
                <Tab title="Tab 6" name={"6"}> Content for tab 6</Tab>
              </Tabs>
            </TabContainer>
          )
        }
      </div>
    );
  }
}

export { TestModal };
