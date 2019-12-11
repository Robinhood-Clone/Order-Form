import React from 'react';
import styled from 'styled-components'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.toggleList = this.toggleList.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleDropDownClick = this.handleDropDownClick.bind(this);
  }
  
  handleDropDownClick(e) {
    e.preventDefault();
    this.props.handleDropDown(e.target.value)
  }

  renderDropDown() {
    const Dropdown = styled.div`
      position: absolute;
      left: 70px;
      background: rgb(27,27,29);
      border-radius: 5px;
      width: 180px;
      z-index: 10;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `;
    const DropDownButton = styled.button`
      color: rgb(255,255,255);
      font-size 13px;
      background: transparent;
      border: transparent;
      text-indent: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      :hover {
        color: rgb(238,84,53);
      }
    `;
    const DropDownButtonSelect = styled.button`
      color: rgb(238,84,53);
      font-size 13px;
      background: transparent;
      border: transparent;
      text-indent: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-left: 2px solid rgb(238,84,53);
    `;
    const DropdownTitle = styled.div`
      color: rgb(255,255,255);
      font-size 14px;
      position: relative;
      text-indent: 20px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 0.5px solid black;
    `;
    if (this.state.listOpen === false) {
      return (
        <div></div>
      );
    } else {
      if (this.props.orderType === 'Market Order') {
        return (
          <Dropdown>
            <DropdownTitle>Order Type</DropdownTitle>
            <DropDownButtonSelect value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Limit Order') {
        return (
          <Dropdown>
            <DropdownTitle>Order Type</DropdownTitle>
            <DropDownButton value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Stop Loss Order') {
        return (
          <Dropdown>
            <DropdownTitle>Order Type</DropdownTitle>
            <DropDownButton value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Stop Limit Order') {
        return (
          <Dropdown>
            <DropdownTitle>Order Type</DropdownTitle>
            <DropDownButton value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Trailing Stop Order') {
        return (
          <Dropdown>
            <DropdownTitle>Order Type</DropdownTitle>
            <DropDownButton value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButtonSelect>
          </Dropdown>
        );
      }
    }
  }
  toggleList() {
    this.setState((p) => {
      return {
        listOpen: !p.listOpen
      }
    })
  }
  render() {
    const Dots = styled.div`
      color: rgb(255,255,255);
      position: absolute;
      left: 235px;
      top: -33px;
      font-size: 30px;
      :hover {
        color: rgb(238,84,53);
      }
    `;
    const Wrapper = styled.div`
      display: flex;
      position: relative;
    `;
    return (
      <Wrapper>
        <Dots onClick={this.toggleList}>···</Dots>
        <div>{this.renderDropDown()}</div>
      </Wrapper>
    );
  }
}

export default Dropdown;