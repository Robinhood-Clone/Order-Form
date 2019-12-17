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
      border-radius: 5px;
      width: 180px;
      z-index: 10;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `;
    const DropDownButton = styled.button`
      font-size 13px;
      background: transparent;
      border: transparent;
      text-indent: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    `;
    const DropDownButtonSelect = styled.button`
      font-size 13px;
      background: transparent;
      border: transparent;
      text-indent: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    `;
    const DropdownTitle = styled.div`
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
          <Dropdown className="backgroundStyling">
            <DropdownTitle className="headerStyling">Order Type</DropdownTitle>
            <DropDownButtonSelect className="dropDownButtonSelectStyling" value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton className="dropDownButtonStyling" value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Limit Order') {
        return (
          <Dropdown className="backgroundStyling">
            <DropdownTitle className="headerStyling">Order Type</DropdownTitle>
            <DropDownButton className="dropDownButtonStyling"value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect className="dropDownButtonSelectStyling" value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling" value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling" value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Stop Loss Order') {
        return (
          <Dropdown className="backgroundStyling">
            <DropdownTitle className="headerStyling">Order Type</DropdownTitle>
            <DropDownButton className="dropDownButtonStyling"value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect className="dropDownButtonSelectStyling" value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Stop Limit Order') {
        return (
          <Dropdown className="backgroundStyling">
            <DropdownTitle className="headerStyling">Order Type</DropdownTitle>
            <DropDownButton className="dropDownButtonStyling"value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect className="dropDownButtonSelectStyling" value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButtonSelect>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButton>
          </Dropdown>
        );
      }
      if (this.props.orderType === 'Trailing Stop Order') {
        return (
          <Dropdown className="backgroundStyling">
            <DropdownTitle className="headerStyling">Order Type</DropdownTitle>
            <DropDownButton className="dropDownButtonStyling"value="Market Order" onClick={this.handleDropDownClick}>Market Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</DropDownButton>
            <br></br>
            <DropDownButton className="dropDownButtonStyling"value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</DropDownButton>
            <br></br>
            <DropDownButtonSelect className="dropDownButtonSelectStyling" value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</DropDownButtonSelect>
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
      color: rgb(23,23,24);
      position: absolute;
      left: 235px;
      top: -33px;
      font-size: 30px;
      :hover {
        color: rgb(93,207,154);
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