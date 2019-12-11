import React from 'react';
import styled from 'styled-components';
import MarketPricePopUp from './MarketPricePopUp.jsx';
import BuyingPowerPopUp from './BuyingPowerPopUp.jsx';
import ExpiresDropdown from './ExpiresDropdown.jsx';
import TrailDropDown from './TrailDropDown.jsx';

class TrailingStopOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: 0,
      reviewOrder: 'default',
      remaining: '',
      trailP: '0%',
      trailD: '$0.00',
      inputType: 'Percentage',
      tt: 'gfd',
      exp: 'gfd',
      focusShare: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.renderTrailInput = this.renderTrailInput.bind(this);
    this.handleTrailInputChange = this.handleTrailInputChange.bind(this);
    this.handleMPPopUpClick = this.handleMPPopUpClick.bind(this);
    this.handleBPPopUpClick = this.handleBPPopUpClick.bind(this);
    this.renderMarketPricePopUp = this.renderMarketPricePopUp.bind(this);
    this.renderBuyPowerPopUp = this.renderBuyPowerPopUp.bind(this);
    this.renderBuyPower = this.renderBuyPower.bind(this);
    this.handleEXPChange = this.handleEXPChange.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleOtherClick = this.handleOtherClick.bind(this);
  }

  handleOtherClick(e) {
    e.preventDefault();
    this.setState({
      focusShare: false,
    })
  }

  handleShareClick(e) {
    e.preventDefault();
    this.setState({
      focusShare: true,
    })
  }
  handleEXPChange(val) {
    this.setState({
      exp: val
    })
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
      color: rgb(238,84,53);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      text-align: center;
      width: 100%;
      border-top: 0.5px solid black;
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
  
  handleTrailInputChange(value, type) {
    this.setState({
      inputType: value,
      tt: type
    })
  }

  renderTrailInput() {
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    const WhiteText = styled.h5`
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      
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
      font-size: 11px;
      text-align: right;
      :hover {
        border: 1px solid rgb(140,140,142);
      }
      border-radius: 5px;
    `;
    if (this.state.inputType === 'Percentage') {
      return (
        <Wrapper>
          <WhiteText>Trail (%)</WhiteText>
          <ShareSearch className="trailPercentageInput"  type="text" defaultValue={this.state.trailP} name="trailP" onChange={this.handleTrailPChange}></ShareSearch>
        </Wrapper>
      );
    }
    if (this.state.inputType === 'Amount') {
      return (
        <Wrapper>
          <WhiteText>Trail ($)</WhiteText>
          <ShareSearch className="trailPercentageInput" type="text" defaultValue={this.state.trailD} name="trailD" onChange={this.handleTrailDChange}></ShareSearch>
        </Wrapper>
      );
    }
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
      [e.target.name]: Math.floor(Number(e.target.value))
    }, () => this.handleEstimatedCost())
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
    const ReviewButton = styled.button`
      color: (27,27,29);
      font-size: 12px;
      width: 230px;
      text-align: center;
      background: rgb(238,84,53);
      height: 50px;
      border: transparent;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
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
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      height: 50px;
      border-color: rgb(238,84,53);
      border-width: 1px;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
    `;
    const WhiteTextMessage = styled.h5`
      font-size: 12px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;

    `;
    const WhiteTextMessage2 = styled.h5`
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
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
    `;
    const WhiteTextBold = styled.h5`
      font-size: 12px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
    `;
    const MarketPrice = styled.h5`
      font-size: 12px;
      color: rgb(238,84,53);
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
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
      font-size: 12px;
      text-align: right;
      :hover {
        border: 1px solid rgb(140,140,142);
      }
      border-radius: 5px;
    `;
    const EstimatedCostWhite = styled.h5`
      color: rgb(255,255,255);
      text-align: right;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      background: transparent;
      right: 22.5px;
      top: 10px;
      font-size: 12px;
    `;
    const Spacing = styled.div`
      height: 20px;
    `;
    const Question = styled.a`
      position: relative;
      top: -2px;
    `;
    return (
      <div>
        <form className="TrailingStopOrderForm">
          <Spacing></Spacing>
          <Wrapper>
            <WhiteText className="marketPrice">Trail Type</WhiteText>
            <TrailDropDown exp={this.state.tt} handleTrailInputChange={this.handleTrailInputChange} ></TrailDropDown>
          </Wrapper>
          <div>
            {this.renderTrailInput()}
          </div>
          <Wrapper>
            <WhiteText>Shares</WhiteText>
            <ShareSearch 
              type="number" 
              value={this.state.shares} 
              name="shares" 
              onChange={this.handleChange} 
              autoFocus={this.state.focusShare}
              onClick={this.handleShareClick}
            />
          </Wrapper>
          <Wrapper>
            <WhiteText className="marketPrice">Expires</WhiteText>
            <ExpiresDropdown handleEXPChange={this.handleEXPChange} exp={this.state.exp} />
          </Wrapper>
          <Wrapper>
            <WhiteTextBold className="estimatedCost">{this.props.buy === true ? 'Estimated Cost ' : 'Estimated Credit ' }</WhiteTextBold>
            <EstimatedCostWhite>${this.state.estim}</EstimatedCostWhite>
          </Wrapper>
          <MarketPrice>Market Price {this.props.stock.price} <Question className="infolink" onClick={() => this.handleMPPopUpClick()}></Question></MarketPrice>
          <div>
            {this.renderMarketPricePopUp()}
          </div>
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

export default TrailingStopOrder;