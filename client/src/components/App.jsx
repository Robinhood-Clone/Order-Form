import React from 'react';
import { ajax } from 'jquery';
import MarketOrder from './MarketOrder.jsx';


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
  }

  componentDidMount() {
    this.getRandomStock();
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
        <div>
          <MarketOrder stock={this.state.stock}/>
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
    console.log('this is this.state :', this.state)
    return (
      <div>
        <div className="header">
          <button className="buyHeader"> Buy {this.state.stock.stock_symbol} </button>
          <button className="sellHeader"> Sell {this.state.stock.stock_symbol} </button>
          <button className="dropdownHeader"> ··· </button>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
        <button onClick={this.toggleWatch}> {this.state.watch === false ? 'Add to Watchlist' : 'Remove from WatchList'} </button>
      </div>
    );
  }
}

export default App;