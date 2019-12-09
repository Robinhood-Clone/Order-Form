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
      width: 275px;
      padding-top: 15px;
      padding-bottom: 2px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 5px;

    `;
    const Header = styled.button`
      background: transparent;
      border: transparent;
      font-family: 'DIN Web', sans-serif;
      font-size: 13px;
      font-style: bold;
      color: rgb(255,255,255);
      position: absolute;
      left: 92.5px;
      :hover {
        color: rgb(238,84,53);
      }
    `;
    const SelectHeader = styled.button`
      background: transparent;
      border: transparent;
      font-family: 'DIN Web', sans-serif;
      font-size: 13px;
      font-style: bold;
      color: rgb(238,84,53);
      position: relative;
      text-indent: 15px;
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
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
    `;
    const UnderLine = styled.div`
      width: 275px;
      border-top: 0.5px solid black;
      position: relative;
      top: 15px;
    `;
    const UnderLineBuy = styled.div`
      width: 69px;
      border-top: 2px solid rgb(238,84,53);
      position: relative;
      top: 13px;
      left: 22.5px;
    `;
    return (
      <div>
        <BackGround>
          <div className="header">
            <SelectHeader className="buyHeader">Buy {this.state.stock.stock_symbol}</SelectHeader>
            <Header className="sellHeader">Sell {this.state.stock.stock_symbol}</Header>
            <Dropdown orderType={this.state.orderType} handleDropDown={this.handleDropDown}/>
          </div>
          <UnderLine></UnderLine>
          <UnderLineBuy></UnderLineBuy>
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