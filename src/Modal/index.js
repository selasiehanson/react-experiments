import React from "react";
import styled from "styled-components";

const HeaderTitle = styled.span`
  font-size: 21px;
`

const Header = styled.div`
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
`;

const ModalFooter = styled.div`
  border-top: 1px solid #dedede;
  padding-top: 1rem;
`;

const CloseButton = styled.button`
  font-size: 21px;
  // font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: 0.2;
  border: 0;
  font-family: sans-serif;
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

const ModalHeader = ({ showClose = true, onClose, children }) => {
  return (
    <Header>
      {children && children}
      {showClose && (
        <CloseButton onClick={() => onClose()}>
          <span>x</span>
        </CloseButton>
      )}
    </Header>
  );
};

const Body = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const ModalBody = ({ children }) => {
  return <Body>{children && children}</Body>;
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const sizes = {
  small: "16em",
  normal: "32em",
  medium: "48em",
  large: "64em"
};

const ModalRoot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(100vw - 4em);
  max-width: ${props => (props.size ? sizes[props.size] : sizes.normal)};
  max-height: calc(100vh - 4em);
  overflow: auto;
  transform: translate(-50%, -50%);
  padding: 1em;
  border-radius: 0.2em;
  background: white;
`;

class Modal extends React.Component {
  static defaultProps = { showModal: false, size: "normal" };

  render() {
    return (
      this.props.showModal && (
        <div>
          <ModalBackground />
          <ModalRoot size={this.props.size}>
            {this.props.children && this.props.children}
          </ModalRoot>
        </div>
      )
    );
  }
}

const DialogRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Dialog = ({ children, show }) => {
  return (
    <Modal showModal={show} size={"small"}>
      <ModalBody>
        <DialogRoot>
          {children && children}
        </DialogRoot>
      </ModalBody>
    </Modal>
  );
};

export { Modal, ModalHeader, ModalBody, Dialog, ModalFooter , HeaderTitle};
