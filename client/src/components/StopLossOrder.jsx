import React from 'react';
import styled from 'styled-components';

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
    const ReviewButton = styled.button`
      color: (27,27,29);
      font-size: 11px;
      width: 230px;
      text-align: center;
      background: rgb(238,84,53);
      height: 50px;
      border: transparent;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
      :hover {
        background: rgb(239,96,61);
      }
    `;
    const ReviewButton2 = styled.button`
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
    const WhiteTextMessage = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;

    `;
    const WhiteTextMessage2 = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 12.5px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;
    `;
    const Spacing = styled.div`
      height: 20px;
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
          <WhiteTextMessage>You are placing a good for day market order to buy {this.state.shares} shares of {this.props.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</WhiteTextMessage>
          <ReviewButton onClick={this.handleBuy}><h4>Buy</h4></ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 onClick={this.backPress}><h4>Edit</h4></ReviewButton2>
        </div>
      );
    }

    if (reviewOrder === 'false') {
      let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
      let deposit= ((this.state.estim * 1.05) - buyingPower).toFixed(2);
      return (
        <div className="falseReviewOrder">
          <WhiteTextMessage2>Not Enough Buying Power</WhiteTextMessage2>
          <WhiteTextMessage>You don't have enough buying power to buy {this.state.shares} share of {this.props.stock.stock_symbol}.</WhiteTextMessage>
          <WhiteTextMessage>Please Deposit {deposit} to purchase {this.state.shares} share at market price (5% collar included).</WhiteTextMessage>
          <WhiteTextMessage>Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.props.power} you can place a limit order instead.</WhiteTextMessage>
          <ReviewButton>Deposit {deposit}</ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 onClick={this.backPress}>Back</ReviewButton2>
        </div>
      );
    }
  }

  render() {
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    const WhiteText = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
    `;
    const BuyPower = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(238,84,53);
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
      border-top: 0.5px solid black;
      padding-top: 15px;
  `;
    const ShareSearch = styled.input`
      background: rgb(23,23,24);
      border: transparent;
      color: rgb(255,255,255);
      width: 140px;
      position: relative;
      height: 35px;
      top: 10px;
      right: 22.5px;
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      text-align: right;
      :hover {
        border: 1px solid rgb(140,140,142);
      }
      border-radius: 5px;
    `;
    const MarketPriceWhite = styled.h5`
      color: rgb(255,255,255);
      text-align: right;
      position: relative;
      background: transparent;
      right: 22.5px;
      top: 10px;
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
    `;
    const EstimatedCostWhite = styled.h5`
      color: rgb(255,255,255);
      text-align: right;
      position: relative;
      background: transparent;
      right: 22.5px;
      top: 10px;
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
    `;
    const GoodForDay = styled.select`
      background: rgb(23,23,24);
      border: transparent;
      color: rgb(255,255,255);
      width: 140px;
      position: relative;
      height: 35px;
      top: 10px;
      right: 22.5px;
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      text-align: right;
      :hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    `;
    const Options = styled.option`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
    `;
    const Spacing = styled.div`
      height: 20px;
    `;
    const MarketPrice = styled.h5`
      font-family: 'DIN Web', sans-serif;
      font-size: 11px;
      color: rgb(238,84,53);
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
      padding-top: 15px;
    `;
    const Question = styled.a`
      position: relative;
      top: -2px;
    `;
    const UnderLineMini = styled.div`
      width: 230px;
      border-bottom: 1px solid black;
      align: center;
      position: relative;
      top: 10px;
      left: 22.5px;
    `;
    return (
      <div>
        <form className="marketOrderForm">
          <Spacing></Spacing>
          <Wrapper>
            <WhiteText>Stop Price</WhiteText>
            <ShareSearch className="stopInput" placeholder={this.state.stop} type="text" value={this.state.stop} name="stop" onChange={this.handleStopChange}></ShareSearch>
          </Wrapper>
          <Wrapper>
            <WhiteText>Shares</WhiteText>
            <ShareSearch className="sharesInput" placeholder={this.state.shares} type="number" value={this.state.shares} name="shares" onChange={this.handleChange}></ShareSearch>
          </Wrapper>
          <Wrapper>
            <WhiteText className="marketPrice">Expires</WhiteText>
            <GoodForDay>
              <Options>Good for Day</Options>
              <Options>Good till Canceled</Options>
            </GoodForDay>
          </Wrapper>
          <UnderLineMini></UnderLineMini>
          <Wrapper>
            <WhiteText className="estimatedCost">Estimated Cost </WhiteText>
            <EstimatedCostWhite>${this.state.estim}</EstimatedCostWhite>
          </Wrapper>
          <MarketPrice>Market Price {this.props.stock.price} <Question className="infolink" href="#"></Question></MarketPrice>
          <div className="reviewOrder">
            {this.renderReviewOrder()}
          </div>
          <BuyPower className="buyingPower">{this.props.power} Buying Power Available <Question className="infolink" href="#"></Question></BuyPower>
        </form>
      </div>
    );
  }

}

export default StopLossOrder;