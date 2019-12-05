import React from 'react';
import { ajax } from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      power: '$1000.00',
      view: 'buy',
      shares: '',
      estim: 0,
      reviewOrder: 'null',
      remaining: ''
    }
    this.getRandomStock = this.getRandomStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }
  
  componentDidMount() {
    this.getRandomStock();
  }
  
  backPress(e) {
    e.preventDefault();
    this.setState({
      reviewOrder: 'null'
    })
  }
  
  handleBuy(e) {
    e.preventDefault();
    let newPower = '$' + this.state.remaining;
    this.setState({
      power: newPower,
      estim: 0,
      shares: 0,
      remaining: 0,
      reviewOrder: 'null'
    }, alert('You have successfully purchased your order!'))
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    }, this.handleEstimatedCost(Math.floor(Number(e.target.value))))
  }
  
  handleEstimatedCost(share) {
    let price = Number(this.state.stock.price.slice(1, this.state.stock.price.length));
    let estimPrice = share * price;
    let buyingPower = Number(this.state.power.slice(1, this.state.power.length))
    let remaining = buyingPower - estimPrice
    this.setState({
      estim: estimPrice.toFixed(2),
      remaining: remaining.toFixed(2)
    })
  }
  
  handleReviewOrder() {
    let estim = Number(this.state.estim) * 1.05
    let buyingPower = Number(this.state.power.slice(1, this.state.power.length))
    if (estim > buyingPower) {
      this.setState({
        reviewOrder: 'false'
      })
    }
    if (estim <= buyingPower) {
      this.setState({
        reviewOrder: 'true'
      })
    }
  }

  renderReviewOrder() {
    const { reviewOrder } = this.state;

    if (reviewOrder === 'null') {
      return (
        <div>
          <button onClick={this.handleReviewOrder}> Review Order </button>
        </div>
      );
    }

    if (reviewOrder === 'true') {
      return (
        <div>
          <h5> You are placing a good for day market order to buy {this.state.shares} shares of {this.state.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</h5>
          <button onClick={this.handleBuy}> <h4> Buy </h4> </button>
          <br></br>
          <button onClick={this.backPress}> <h4> Edit </h4> </button>
        </div>
      );
    }

    if (reviewOrder === 'false') {
      let buyingPower = Number(this.state.power.slice(1, this.state.power.length))
      let deposit= ((this.state.estim * 1.05) - buyingPower).toFixed(2);
      return (
        <div>
          <h4> Not Enough Buying Power </h4>
          <h5> You don't have enough buying power to buy {this.state.shares} share of {this.state.stock.stock_symbol}. </h5>
          <h5> Please Deposit {this.state.stock.price} to purchase {this.state.shares} share at market price (5% collar included). </h5>
          <h5> Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.state.power} you can place a limit order instead. </h5>
          <button> Deposit {deposit} </button>
          <br></br>
          <button onClick={this.backPress}> Back </button>
        </div>
      );
    }
  }

  renderView() {
    const { view } = this.state;

    if (view === 'buy') {
      return (
        <div>
          <form>
            <h5> Shares <input placeholder={this.state.shares} type="number" value={this.state.shares} name="shares" onChange={this.handleChange}></input> </h5>
            <h5> Market Price {this.state.stock.price} </h5>
            <h5> Estimated Cost ${this.state.estim} </h5>
            <div>{this.renderReviewOrder()}</div>
            <h6> {this.state.power} Buying Power Available </h6>
          </form>
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
          <span className="buyHeader"> Buy {this.state.stock.stock_symbol} </span>
          <span className="sellHeader"> Sell {this.state.stock.stock_symbol} </span>
          <span className="dropdownHeader"> ··· </span>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

export default App;