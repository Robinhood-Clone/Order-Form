import React from 'react';
import styled from 'styled-components';
import MarketPricePopUp from './MarketPricePopUp.jsx';
import BuyingPowerPopUp from './BuyingPowerPopUp.jsx';

class MarketOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: '0.00',
      reviewOrder: 'default',
      remaining: '',
      added: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.renderBuyPower = this.renderBuyPower.bind(this);
    this.renderMarketPricePopUp = this.renderMarketPricePopUp.bind(this);
    this.renderBuyPowerPopUp = this.renderBuyPowerPopUp.bind(this);
    this.handleMPPopUpClick = this.handleMPPopUpClick.bind(this);
    this.handleBPPopUpClick = this.handleBPPopUpClick.bind(this);
  }

  handleBPPopUpClick() {
    this.setState((p) => {
      return {
        bppopup: !p.bppopup
      }
    })
  }

  handleMPPopUpClick() {
    this.setState((p) => {
      return {
        mppopup: !p.mppopup
      }
    })
  }
  
  renderMarketPricePopUp() {
    if (this.state.mppopup === true) {
      return (
        <div>
          <MarketPricePopUp power={this.props.power} stock={this.props.stock}/>
        </div>
      );
    }
  }

  renderBuyPowerPopUp() {
    if (this.state.bppopup === true) {
      return (
        <div>
          <BuyingPowerPopUp power={this.props.power} stock={this.props.stock}/>
        </div>
      );
    }
  }

  renderBuyPower() {
    const BuyPower = styled.h5`
      font-size: 12px;
      color: rgb(93,207,154);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      text-align: center;
      width: 100%;
      border-top: 0.5px solid rgb(244,244,245);
      padding-top: 15px;
    `;
    const Question = styled.a`
      position: relative;
      top: -2px;
    `;
    if (this.props.buy === true) {
      return (
        <div>
          <BuyPower className="buyingPower">{this.props.power} Buying Power Available <Question className="infolink" onClick={() => this.handleBPPopUpClick()}></Question></BuyPower>
          {this.renderBuyPowerPopUp()}
        </div>
      );
    } else {
      return (
        <BuyPower className="buyingPower">{this.props.owns} Share(s) Available</BuyPower>
      );
    }
  }

  backPress(e) {
    e.preventDefault();
    this.setState({
      reviewOrder: 'default'
    })
  }
  
  handleBuy(e) {
    e.preventDefault();
    if (this.props.buy === true) {
      let newPower = '$' + this.state.remaining;
      this.props.handleBuy(newPower, Number(this.state.shares));
      this.setState({
        estim: 0,
        shares: 0,
        remaining: 0,
        added: 0,
        reviewOrder: 'default'
      }, () => {
        alert('You have successfully purchased your order!')
      });
    } else {
      let newPower = '$' + this.state.added;
      this.props.handleBuy(newPower, Number(this.state.shares));
      this.setState({
        estim: 0,
        shares: 0,
        added: 0,
        remaining: 0,
        reviewOrder: 'default'
      }, () => {
        alert('You have successfully sold your order!')
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    }, this.handleEstimatedCost)
  }
  
  handleEstimatedCost() {
    let share = Number(this.state.shares)
    let price = Number(this.props.stock.price.slice(1, this.props.stock.price.length));
    let estimPrice = share * price;
    let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
    let remaining = buyingPower - estimPrice
    let added = buyingPower + estimPrice
    this.setState({
      estim: estimPrice.toFixed(2),
      remaining: remaining.toFixed(2),
      added: added.toFixed(2)
    })
  }
  
  handleReviewOrder() {
    let estim = Number(this.state.estim) * 1.05
    let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
    if (this.props.buy === true) {
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
    } else {
      if (this.props.owns >= this.state.shares) {
        this.setState({
          reviewOrder: 'trueSell'
        })
      } else {
        this.setState({
          reviewOrder: 'falseSell'
        })
      }
    }
  }

  renderReviewOrder() {
    const { reviewOrder } = this.state;
    let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
    const ReviewButton = styled.button`
      color: rgb(27,27,29);
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 12px;
      width: 230px;
      text-align: center;
      background: rgb(93,207,154);
      height: 50px;
      border: transparent;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
      :hover {
        background: rgb(126,224,178);
      }
    `;
    const ReviewButton2 = styled.button`
      color: rgb(93,207,154);
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      width: 230px;
      text-align: center;
      background: rgb(255,255,255);
      height: 50px;
      border-color: rgb(93,207,154);
      border-width: 1px;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
      :hover {
        color: rgb(126,224,178);
        border-color: rgb(126,224,178);
      }
    `;
    const WhiteTextMessage = styled.h5`
      font-size: 12px;
      color: rgb(23,23,24);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;

    `;
    const WhiteTextMessage2 = styled.h5`
      font-size: 12.5px;
      color: rgb(23,23,24);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;
    `;
    const Spacing = styled.div`
      height: 20px;
    `;
    const Exclamation = styled.a`
    position: relative;
    top: -2px;
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
    if (reviewOrder === 'trueSell') {
      return (
        <div className="trueReviewOrder">
          <WhiteTextMessage>You are placing a good for day market order to sell {this.state.shares} shares of {this.props.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</WhiteTextMessage>
          <ReviewButton onClick={this.handleBuy}><h4>Sell</h4></ReviewButton>
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
          <WhiteTextMessage2> <Exclamation className="exclamation" href="#"></Exclamation>Not Enough Buying Power</WhiteTextMessage2>
          <WhiteTextMessage>You don't have enough buying power to buy {this.state.shares} share of {this.props.stock.stock_symbol}.</WhiteTextMessage>
          <WhiteTextMessage>Please Deposit ${deposit} to purchase {this.state.shares} share at market price (5% collar included).</WhiteTextMessage>
          <WhiteTextMessage>Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.props.power} you can place a limit order instead.</WhiteTextMessage>
          <ReviewButton>Deposit ${deposit}</ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 onClick={this.backPress}>Back</ReviewButton2>
        </div>
      );
    }
    if (reviewOrder === 'falseSell') {
      let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
      return (
        <div className="falseReviewOrder">
          <WhiteTextMessage2>Not Enough Shares</WhiteTextMessage2>
          <WhiteTextMessage>You can only sell up to {this.props.owns} share(s) of {this.props.stock.stock_symbol}.</WhiteTextMessage>
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
      font-size: 12px;
      color: rgb(23,23,24);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
    `;
    const WhiteTextBold = styled.h5`
      font-size: 12px;
      color: rgb(23,23,24);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
    `;
    const MarketPrice = styled.h5`
      font-size: 12px;
      color: rgb(93,207,154);
      font-style: normal;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      left: 22.5px;
      top: 10px;
      `;
    const ShareSearch = styled.input`
      background: rgb(250,250,250);
      border: transparent;
      color: rgb(23,23,24);
      width: 80px;
      position: relative;
      height: 35px;
      top: 10px;
      right: 22.5px;
      font-size: 12px;
      text-align: right;
      :hover {
        border: 1px solid rgb(203,203,205);
      }
      border-radius: 5px;
    `;
    const EstimatedCostWhite = styled.h5`
      color: rgb(23,23,24);
      text-align: right;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      background: transparent;
      right: 22.5px;
      top: 10px;
      font-size: 12px;
    `;
    const UnderLine = styled.div`
      width: 230px;
      border-bottom: 0.5px solid rgb(244,244,245);
      align: center;
      position: relative;
      top: 10px;
      left: 22.5px;
    `;
    const Spacing = styled.div`
      height: 20px;
    `;
    const MarketPriceWhite = styled.h5`
      font-size: 12px;
      color: rgb(23,23,24);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      right: 22.5px;
      top: 10px;
    `;
    const Question = styled.a`
      position: relative;
      top: -2px;
    `;
    return (
      <div>
        <form key="marketOrderForm">
          <Spacing></Spacing>
          <Wrapper>
            <WhiteText>Shares</WhiteText>
            <ShareSearch 
              type="number" 
              value={this.state.shares} 
              name="shares" 
              onChange={this.handleChange} 
              autoFocus={true}
            />
          </Wrapper>
          <Wrapper>
            <MarketPrice className="marketPrice">Market Price <Question className="infolink" onClick={() => this.handleMPPopUpClick()}></Question></MarketPrice>
            <MarketPriceWhite>{this.props.stock.price}</MarketPriceWhite>
          </Wrapper>
          <div>
            {this.renderMarketPricePopUp()}
          </div>
          <UnderLine></UnderLine>
          <Wrapper>
            <WhiteTextBold className="estimatedCost">{this.props.buy === true ? 'Estimated Cost ' : 'Estimated Credit ' }</WhiteTextBold>
            <EstimatedCostWhite>${this.state.estim}</EstimatedCostWhite>
          </Wrapper>
          <div className="reviewOrder">
            {this.renderReviewOrder()}
          </div>
          <div>
            {this.renderBuyPower()}
          </div>
        </form>
      </div>
    );
  }

}

export default MarketOrder;