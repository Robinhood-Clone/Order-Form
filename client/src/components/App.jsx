import React from 'react';
import { ajax } from 'jquery';
import MarketOrder from './MarketOrder.jsx';
import LimitOrder from './LimitOrder.jsx';
import StopLimitOrder from './StopLimitOrder.jsx';
import StopLossOrder from './StopLossOrder.jsx';
import TrailingStopOrder from './TrailingStopOrder.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderType: 'Market Order',
      stock: {},
      watch: false
    }
    this.getRandomStock = this.getRandomStock.bind(this);
    this.toggleWatch = this.toggleWatch.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
  }

  componentDidMount() {
    this.getRandomStock();
  }

  handleDropDown(e) {
    e.preventDefault();
    this.setState({
      orderType: e.target.value
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
          <MarketOrder stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Limit Order') {
      return (
        <div className="limitOrder">
          <LimitOrder stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Loss Order') {
      return (
        <div className="stopLossOrder">
          <StopLossOrder stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Limit Order') {
      return (
        <div className="stopLimitOrder">
          <StopLimitOrder stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Trailing Stop Order') {
      return (
        <div className="trailingStopOrder">
          <TrailingStopOrder stock={this.state.stock}/>
        </div>
      );
    }
  }

  getRandomStock() {
    ajax({
      url: '/stocks',
      method: "GET",
      success: (data) => {
        let randomIndex = Math.floor(Math.random() * data.length);
        this.setState({
          stock: data[randomIndex]
        })
      }
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <button className="buyHeader">Buy {this.state.stock.stock_symbol}</button>
          <button className="sellHeader">Sell {this.state.stock.stock_symbol}</button>
          <select className="dropdownHeader" onChange={this.handleDropDown}>            
            <option value="" selected disabled hidden>···</option>
            <option value="" disabled>Order Type</option>
            <option value="Market Order">Market Order</option>
            <option value="Limit Order">Limit Order</option>
            <option value="Stop Loss Order">Stop Loss Order</option>
            <option value="Stop Limit Order">Stop Limit Order</option>
            <option value="Trailing Stop Order">Trailing Stop Order</option>
          </select>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
        <button className="watchButton" onClick={this.toggleWatch}> {this.state.watch === false ? 'Add to Watchlist' : 'Remove from WatchList'} </button>
      </div>
    );
  }
}

export default App;