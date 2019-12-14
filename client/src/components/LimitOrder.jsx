import React from 'react';
import styled from 'styled-components';
import MarketPricePopUp from './MarketPricePopUp.jsx';
import BuyingPowerPopUp from './BuyingPowerPopUp.jsx';
import ExpiresDropdown from './ExpiresDropdown.jsx';

class LimitOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: '0.00',
      reviewOrder: 'default',
      remaining: '',
      limit: '$0.00',
      checked: false,
      added: '',
      exp: 'gfd',
      focusLimit: false,
      focusShare: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleMPPopUpClick = this.handleMPPopUpClick.bind(this);
    this.handleBPPopUpClick = this.handleBPPopUpClick.bind(this);
    this.renderMarketPricePopUp = this.renderMarketPricePopUp.bind(this);
    this.renderBuyPowerPopUp = this.renderBuyPowerPopUp.bind(this);
    this.renderBuyPower = this.renderBuyPower.bind(this);this.handleEXPChange = this.handleEXPChange.bind(this);
    this.handleLimitClick = this.handleLimitClick.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
  }

  handleLimitClick(e) {
    e.preventDefault();
    this.setState({
      focusLimit: true,
      focusShare: false
    })
  }
  handleShareClick(e) {
    e.preventDefault();
    this.setState({
      focusLimit: false,
      focusShare: true
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
  
  handleCheckBoxChange(e) {
    e.preventDefault();
    this.setState((p) => {
      return {
        checked: !p.checked
      }
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

  handleLimitChange(e) {
    e.preventDefault();
    this.setState({
      limit: e.target.value
    }, () => this.handleEstimatedCost())
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    }, () => this.handleEstimatedCost())
  }
  
  handleEstimatedCost() {
    let share = Number(this.state.shares)
    let price = Number(this.state.limit.slice(1, this.state.limit.length));
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
      background: rgb(93,207,154);
      height: 50px;
      border: transparent;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
      :hover {
        background: rgb(126,224,178);
      }
    `;
    const ReviewButton2 = styled.button`
      color: rgb(93,207,154);
      width: 230px;
      text-align: center;
      background: rgb(27,27,29);
      height: 50px;
      border-color: rgb(93,207,154);
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
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
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
      padding-top: 15px;
    `;
    const BuyPower = styled.h5`
      font-size: 12px;
      color: rgb(93,207,154);
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
      border-top: 0.5px solid black;
      padding-top: 15px;
  `;
    const ShareSearch = styled.input`
      background: rgb(250,250,250);
      border: transparent;
      color: rgb(23,23,24);
      width: 140px;
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
    const GoodForDay = styled.select`
      background: rgb(250,250,250);
      border: transparent;
      color: rgb(23,23,24);
      width: 140px;
      position: relative;
      height: 35px;
      top: 10px;
      right: 22.5px;
      font-size: 12px;
      text-align: right;
      :hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    `;
    const Options = styled.option`
      font-size: 12px;
    `;
    const Checkbox = styled.input`
      position: relative;
      top: 10px;
      float: left;
      left: 20px;
    `;
    const CheckboxText = styled.h5`
      font-size: 12px;
      color: rgb(203,203,205);
      font-style: normal;
      position: relative;
      right: 45px;
      width: 170px;
      top: 10px;
    `;
    const UnderLineMini = styled.div`
      width: 230px;
      border-bottom: 1px solid rgb(244,244,245);
      align: center;
      position: relative;
      top: 10px;
      left: 22.5px;
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
        <form className="limitOrderForm">
          <Spacing></Spacing>
          <Wrapper>
            <WhiteText>Limit Price</WhiteText>
            <ShareSearch 
              className="limitInput" 
              placeholder={this.state.limit} 
              type="text" value={this.state.limit} 
              name="limit" 
              onChange={this.handleLimitChange}
              autoFocus={this.state.focusLimit}
              onClick={this.handleLimitClick}
            />
          </Wrapper>
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
          <Wrapper className="custom-select">
            <WhiteText className="marketPrice">Expires</WhiteText>
            <ExpiresDropdown handleEXPChange={this.handleEXPChange} exp={this.state.exp} />
          </Wrapper>
          <UnderLineMini></UnderLineMini>
          <Wrapper>
            <WhiteTextBold className="estimatedCost">{this.props.buy === true ? 'Estimated Cost ' : 'Estimated Credit ' }</WhiteTextBold>
            <EstimatedCostWhite>${this.state.estim}</EstimatedCostWhite>
          </Wrapper>
          <Wrapper>
            <Checkbox
            className="container"
            type="checkbox"
            defaultChecked={this.state.checked}
            />
            <CheckboxText>Allow this order to execute during extended hours.</CheckboxText>
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

export default LimitOrder;