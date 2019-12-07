import React from 'react';
import { ajax } from 'jquery';
import MarketOrder from './MarketOrder.jsx';
import LimitOrder from './LimitOrder.jsx';
import StopLimitOrder from './StopLimitOrder.jsx';
import StopLossOrder from './StopLossOrder.jsx';
import TrailingStopOrder from './TrailingStopOrder.jsx';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderType: 'Market Order',
      stock: {},
      watch: false,
      power: '',
    }
    this.getRandomStock = this.getRandomStock.bind(this);
    this.toggleWatch = this.toggleWatch.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.getUserPower = this.getUserPower.bind(this);
  }

  componentDidMount() {
    this.getRandomStock();
    this.getUserPower();
  }

  getUserPower() {
    ajax({
      url: '/userpower',
      method: 'GET',
      success: (data) => {
        this.setState({
          power: data[0].power
        }, () => console.log(this.state.power))
      }
    })
  }

  handleBuy(newPower) {
    // ajax({
    //   url: '/updateUserPower',
    //   method: 'PUT',
    //   data: {
    //     value: newPower,
    //   },
    //   success: () => console.log('successfully updated')
    // })
    this.setState({
      power: newPower
    })
  }

  handleDropDown(val) {
    this.setState({
      orderType: val
    }, ()=> {
      this.renderView();
    })
  }

  toggleWatch(e) {
    e.preventDefault();
    this.setState((p) => {
      return {
        watch: !p.watch
      }
    })
  }

  renderView() {
    const { orderType } = this.state;
    if (orderType === 'Market Order') {
      return (
        <div className="marketOrder">
          <MarketOrder handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Limit Order') {
      return (
        <div className="limitOrder">
          <LimitOrder handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Loss Order') {
      return (
        <div className="stopLossOrder">
          <StopLossOrder handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Limit Order') {
      return (
        <div className="stopLimitOrder">
          <StopLimitOrder handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Trailing Stop Order') {
      return (
        <div className="trailingStopOrder">
          <TrailingStopOrder handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
  }

  getRandomStock() {
    ajax({
      url: '/stocks',
      method: 'GET',
      success: (data) => {
        let randomIndex = Math.floor(Math.random() * data.length);
        this.setState({
          stock: data[randomIndex]
        })
      }
    })
  }

  render() {
    const BackGround = styled.div`
      background: rgb(27,27,29);
      width: 255px;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 15px;
      padding-bottom: 2px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `;
    const Header = styled.button`
      background: transparent;
      border: transparent;
      font-family: 'DIN Web', sans-serif;
      font-size: 13px;
      font-style: bold;
      color: rgb(255,255,255);
      position: relative;
      left: 12.5px;
    `;
    const WatchButton = styled.button`
      color: rgb(238,84,53);
      width: 230px;
      text-align: center;
      background: rgb(27,27,29);
      height: 50px;
      border-color: rgb(238,84,53);
      border-width: 1px;
      position: relative;
      left: 12.5px;
      top: 10px;
    `;
    return (
      <div>
        <BackGround>
          <div className="header">
            <Header className="buyHeader">Buy {this.state.stock.stock_symbol}</Header>
            <Header className="sellHeader">Sell {this.state.stock.stock_symbol}</Header>
            <Dropdown handleDropDown={this.handleDropDown}/>
            {/* <select className="dropdownHeader" onChange={this.handleDropDown}>            
              <option value="" selected disabled hidden>···</option>
              <option value="" disabled>Order Type</option>
              <option value="Market Order">Market Order</option>
              <option value="Limit Order">Limit Order</option>
              <option value="Stop Loss Order">Stop Loss Order</option>
              <option value="Stop Limit Order">Stop Limit Order</option>
              <option value="Trailing Stop Order">Trailing Stop Order</option>
            </select> */}
          </div>
          <div className="main">
            {this.renderView()}
          </div>
        </BackGround>
          <WatchButton className="watchButton" onClick={this.toggleWatch}> {this.state.watch === false ? 'Add to Watchlist' : 'Remove from WatchList'} </WatchButton>
      </div>
    );
  }
}

export default App;