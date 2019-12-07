import React from 'react';

class StopLossOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: 0,
      reviewOrder: 'default',
      remaining: '',
      stop: '$0.00'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleStopChange = this.handleStopChange.bind(this); 
  }
   
  backPress(e) {
    e.preventDefault();
    this.setState({
      reviewOrder: 'default'
    })
  }
  
  handleBuy(e) {
    e.preventDefault();
    let newPower = '$' + this.state.remaining;
    this.setState({
      estim: 0,
      shares: 0,
      remaining: 0,
      reviewOrder: 'default',
      stop: '$0.00'
    }, () => {
      this.props.handleBuy(newPower);
      alert('You have successfully purchased your order!')
    });
  }

  handleStopChange(e) {
    e.preventDefault();
    this.setState({
      stop: e.target.value
    }, () => this.handleEstimatedCost())
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    }, () => this.handleEstimatedCost())
  }
  
  handleEstimatedCost() {
    let price = Number(this.state.stop.slice(1, this.state.stop.length));
    let estimPrice = this.state.shares * price;
    let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
    let remaining = buyingPower - estimPrice
    this.setState({
      estim: estimPrice.toFixed(2),
      remaining: remaining.toFixed(2)
    })
  }
  
  handleReviewOrder() {
    let estim = Number(this.state.estim) * 1.05
    let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
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

    if (reviewOrder === 'default') {
      return (
        <div className="defaultReviewOrder">
          <button onClick={this.handleReviewOrder}>Review Order</button>
        </div>
      );
    }

    if (reviewOrder === 'true') {
      return (
        <div className="trueReviewOrder">
          <h5>You are placing a good for day market order to buy {this.state.shares} shares of {this.props.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</h5>
          <button onClick={this.handleBuy}><h4>Buy</h4></button>
          <br></br>
          <button onClick={this.backPress}><h4>Edit</h4></button>
        </div>
      );
    }

    if (reviewOrder === 'false') {
      let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
      let deposit= ((this.state.estim * 1.05) - buyingPower).toFixed(2);
      return (
        <div className="falseReviewOrder">
          <h4>Not Enough Buying Power</h4>
          <h5>You don't have enough buying power to buy {this.state.shares} share of {this.props.stock.stock_symbol}.</h5>
          <h5>Please Deposit {this.props.stock.price} to purchase {this.state.shares} share at market price (5% collar included).</h5>
          <h5>Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.props.power} you can place a limit order instead.</h5>
          <button>Deposit {deposit}</button>
          <br></br>
          <button onClick={this.backPress}>Back</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <form className="marketOrderForm">
          <h5>Stop Price<input className="stopInput" placeholder={this.state.stop} type="text" value={this.state.stop} name="stop" onChange={this.handleStopChange}></input></h5>
          <h5>Shares<input className="sharesInput" placeholder={this.state.shares} type="number" value={this.state.shares} name="shares" onChange={this.handleChange}></input></h5>
          <h5 className="marketPrice">Expires
            <select>
              <option>Good for Day</option>
              <option>Good till Canceled</option>
            </select>
          </h5>
          <h5 className="estimatedCost">Estimated Cost ${this.state.estim}</h5>
          <h5>Market Price {this.props.stock.price}</h5>
          <div className="reviewOrder">
            {this.renderReviewOrder()}
          </div>
          <h6 className="buyingPower">{this.props.power} Buying Power Available</h6>
        </form>
      </div>
    );
  }

}

export default StopLossOrder;