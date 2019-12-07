import React from 'react';

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
    console.log(e.target.value)
    this.props.handleDropDown(e.target.value)
  }

  renderDropDown() {
    if (this.state.listOpen === false) {
      return (
        <div></div>
      );
    } else {
      return (
        <div>
          <h5>Order Type</h5>
          <button value="Market Order" onClick={this.handleDropDownClick}>Market Order</button>
          <button value="Limit Order" onClick={this.handleDropDownClick}>Limit Order</button>
          <button value="Stop Loss Order" onClick={this.handleDropDownClick}>Stop Loss Order</button>
          <button value="Stop Limit Order" onClick={this.handleDropDownClick}>Stop Limit Order</button>
          <button value="Trailing Stop Order" onClick={this.handleDropDownClick}>Trailing Stop Order</button>
        </div>
      );
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
    return (
      <div>
        <h2 onClick={this.toggleList}>···</h2>
        <div>{this.renderDropDown()}</div>
      </div>
    );
  }
}

export default Dropdown;