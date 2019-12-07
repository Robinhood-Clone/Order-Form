import React from 'react';
import styled from 'styled-components';

class MarketOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: 0,
      reviewOrder: 'default',
      remaining: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
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
      reviewOrder: 'default'
    }, () => {
      this.props.handleBuy(newPower);
      alert('You have successfully purchased your order!')
    });
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
    const ReviewButton = styled.button`
      color: (27,27,29);
      font-size: 11px;
      width: 230px;
      text-align: center;
      background: rgb(238,84,53);
      height: 50px;
      border: transparent;
      position: relative;
      left: 12.5px;
      top: 10px; 
    `;
    if (reviewOrder === 'default') {
      return (
        <div className="defaultReviewOrder">
          <ReviewButton onClick={this.handleReviewOrder}>Review Order</ReviewButton>
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
    const WhiteText = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 12.5px;
      top: 10px;
    `;
    const MarketPrice = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(238,84,53);
      font-style: normal;
      position: relative;
      left: 12.5px;
      top: 10px;
      bottom: 10px;
    `;
    const BuyPower = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(238,84,53);
      font-style: normal;
      position: relative;
      text-align: center;
      border-top: 1px solid black;
      padding-top: 15px;
  `;
    return (
      <div>
        <form className="marketOrderForm">
          <WhiteText>Shares<input className="sharesInput" placeholder={this.state.shares} type="number" value={this.state.shares} name="shares" onChange={this.handleChange}></input></WhiteText>
          <MarketPrice className="marketPrice">Market Price {this.props.stock.price}</MarketPrice>
          <WhiteText className="estimatedCost">Estimated Cost ${this.state.estim}</WhiteText>
          <div className="reviewOrder">
            {this.renderReviewOrder()}
          </div>
          <BuyPower className="buyingPower">{this.props.power} Buying Power Available</BuyPower>
        </form>
      </div>
    );
  }

}

export default MarketOrder;