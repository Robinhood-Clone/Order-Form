import React from 'react';

class LimitOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: '$1000.00',
      view: 'buy',
      shares: '',
      estim: 0,
      reviewOrder: 'default',
      remaining: '',
      limitPrice: "$0.00"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }
   
  backPress(e) {
    e.preventDefault();
    this.setState({
      reviewOrder: 'default'
    })
  }
  
  handleLimitChange(e) {
    console.log(e.target.value)
    let price = Number(this.state.limitPrice.slice(1, this.props.stock.price.length)).toFixed(2);    
    let priceStr = '$' + price
    console.log('price :', price);
    console.log('priceStr :', priceStr);
    this.setState({
      limitPrice: e.target.value
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
      reviewOrder: 'default'
    }, alert('You have successfully purchased your order!'))
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    }, this.handleEstimatedCost(Math.floor(Number(e.target.value))))
  }
  
  handleEstimatedCost(share) {
    let price = Number(this.props.stock.price.slice(1, this.props.stock.price.length));
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
      let buyingPower = Number(this.state.power.slice(1, this.state.power.length))
      let deposit= ((this.state.estim * 1.05) - buyingPower).toFixed(2);
      return (
        <div className="falseReviewOrder">
          <h4>Not Enough Buying Power</h4>
          <h5>You don't have enough buying power to buy {this.state.shares} share of {this.props.stock.stock_symbol}.</h5>
          <h5>Please Deposit {this.props.stock.price} to purchase {this.state.shares} share at market price (5% collar included).</h5>
          <h5>Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.state.power} you can place a limit order instead.</h5>
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
          <h5>Limit Price<input className="sharesInput" placeholder={this.state.limitPrice} type="string" value={this.state.limitPrice} name="shares" onChange={this.handleLimitChange}></input></h5>
          <h5>Shares<input className="sharesInput" placeholder={this.state.shares} type="number" value={this.state.shares} name="shares" onChange={this.handleChange}></input></h5>
          <h5 className="marketPrice">Market Price {this.props.stock.price}</h5>
          <h5 className="estimatedCost">Estimated Cost ${this.state.estim}</h5>
          <div className="reviewOrder">
            {this.renderReviewOrder()}
          </div>
          <h6 className="buyingPower">{this.state.power} Buying Power Available</h6>
        </form>
      </div>
    );
  }

}

export default LimitOrder;