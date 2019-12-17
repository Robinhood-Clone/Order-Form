import React from 'react';
import styled from 'styled-components';
import MarketPricePopUp from './MarketPricePopUp.jsx';
import BuyingPowerPopUp from './BuyingPowerPopUp.jsx';
import ExpiresDropdown from './ExpiresDropdown.jsx';

class StopLimitOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'buy',
      shares: 0,
      estim: 0,
      reviewOrder: 'default',
      remaining: '',
      limit: '$0.00',
      stop: '$0.00',
      exp: 'gfd',
      focusStop: false,
      focusLimit: false,
      focusShare: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEstimatedCost = this.handleEstimatedCost.bind(this);
    this.renderReviewOrder = this.renderReviewOrder.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
    this.backPress = this.backPress.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleStopChange = this.handleStopChange.bind(this);
    this.handleMPPopUpClick = this.handleMPPopUpClick.bind(this);
    this.handleBPPopUpClick = this.handleBPPopUpClick.bind(this);
    this.renderMarketPricePopUp = this.renderMarketPricePopUp.bind(this);
    this.renderBuyPowerPopUp = this.renderBuyPowerPopUp.bind(this);
    this.renderBuyPower = this.renderBuyPower.bind(this);this.handleEXPChange = this.handleEXPChange.bind(this);this.handleLimitClick = this.handleLimitClick.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }
  handleStopClick(e) {
    e.preventDefault();
    this.setState({
      focusLimit: false,
      focusShare: false,
      focusStop: true
    })
  }
  handleLimitClick(e) {
    e.preventDefault();
    this.setState({
      focusLimit: true,
      focusShare: false,
      focusStop: false
    })
  }
  handleShareClick(e) {
    e.preventDefault();
    this.setState({
      focusLimit: false,
      focusShare: true,
      focusStop: false
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
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      text-align: center;
      width: 100%;
      padding-top: 15px;
    `;
    const Question = styled.a`
      position: relative;
      top: -2px;
    `;
    if (this.props.buy === true) {
      return (
        <div>
          <BuyPower className="buyPowerStyling">{this.props.power} Buying Power Available <Question className="infolink" onClick={() => this.handleBPPopUpClick()}></Question></BuyPower>
          {this.renderBuyPowerPopUp()}
        </div>
      );
    } else {
      return (
        <BuyPower className="buyPowerStyling">{this.props.owns} Share(s) Available</BuyPower>
      );
    }
  }
   
  backPress(e) {
    e.preventDefault();
    this.setState({
      reviewOrder: 'default'
    })
  }
  
  handleLimitChange(e) {
    e.preventDefault();
    this.setState({
      limit: e.target.value
    })
  }

  handleStopChange(e) {
    e.preventDefault();
    this.setState({
      stop: e.target.value
    }, () => this.handleEstimatedCost())
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
    let price = Number(this.state.stop.slice(1, this.state.stop.length));
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
      font-size: 12px;
      width: 230px;
      text-align: center;
      height: 50px;
      border: transparent;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
    `;
    const ReviewButton2 = styled.button`
      width: 230px;
      text-align: center;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      height: 50px;
      border-width: 1px;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
    `;
    const WhiteTextMessage = styled.h5`
      font-size: 12px;
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
      padding-right: 45px;

    `;
    const WhiteTextMessage2 = styled.h5`
      font-size: 12.5px;
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
          <ReviewButton className="reviewButtonStyling" onClick={this.handleReviewOrder}>Review Order</ReviewButton>
        </div>
      );
    }
    if (reviewOrder === 'trueSell') {
      return (
        <div className="trueReviewOrder">
          <WhiteTextMessage className="headerStyling">You are placing a good for day market order to sell {this.state.shares} shares of {this.props.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</WhiteTextMessage>
          <ReviewButton className="reviewButtonStyling" onClick={this.handleBuy}><h4>Sell</h4></ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 className="reviewButton2Styling" onClick={this.backPress}><h4>Edit</h4></ReviewButton2>
        </div>
      );
    }
    if (reviewOrder === 'true') {
      return (
        <div className="trueReviewOrder">
          <WhiteTextMessage className="headerStyling">You are placing a good for day market order to buy {this.state.shares} shares of {this.props.stock.stock_symbol}. Your order will be placed after the market opens and executed at the best available price.</WhiteTextMessage>
          <ReviewButton className="reviewButtonStyling" onClick={this.handleBuy}><h4>Buy</h4></ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 className="reviewButton2Styling" onClick={this.backPress}><h4>Edit</h4></ReviewButton2>
        </div>
      );
    }

    if (reviewOrder === 'false') {
      let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
      let deposit= ((this.state.estim * 1.05) - buyingPower).toFixed(2);
      return (
        <div className="falseReviewOrder">
          <WhiteTextMessage2 className="headerStyling"> <Exclamation className="exclamation" href="#"></Exclamation>Not Enough Buying Power</WhiteTextMessage2>
          <WhiteTextMessage className="headerStyling">You don't have enough buying power to buy {this.state.shares} share of {this.props.stock.stock_symbol}.</WhiteTextMessage>
          <WhiteTextMessage className="headerStyling">Please Deposit ${deposit} to purchase {this.state.shares} share at market price (5% collar included).</WhiteTextMessage>
          <WhiteTextMessage className="headerStyling">Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their Robinhood account. If you want to use your full buying power of {this.props.power} you can place a limit order instead.</WhiteTextMessage>
          <ReviewButton className="reviewButtonStyling" >Deposit ${deposit}</ReviewButton>
          <Spacing></Spacing>
          <ReviewButton2 className="reviewButton2Styling" onClick={this.backPress}>Back</ReviewButton2>
        </div>
      );
    }
    if (reviewOrder === 'falseSell') {
      let buyingPower = Number(this.props.power.slice(1, this.props.power.length))
      return (
        <div className="falseReviewOrder">
          <WhiteTextMessage2 className="headerStyling">Not Enough Shares</WhiteTextMessage2>
          <WhiteTextMessage className="headerStyling">You can only sell up to {this.props.owns} share(s) of {this.props.stock.stock_symbol}.</WhiteTextMessage>
          <ReviewButton2 className="reviewButton2Styling" onClick={this.backPress}>Back</ReviewButton2>
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
      font-style: normal;
      position: relative;
      left: 22.5px;
      top: 10px;
    `;
    const WhiteTextBold = styled.h5`
      font-size: 12px;
      font-style: normal;
      position: relative;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      left: 22.5px;
      top: 10px;
    `;
    const MarketPrice = styled.h5`
      font-size: 12px;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-style: normal;
      position: relative;
      text-align: center;
      width: 100%;
      padding-top: 15px;
    `;
    const ShareSearch = styled.input`
      border: transparent;
      width: 140px;
      position: relative;
      height: 35px;
      top: 10px;
      right: 22.5px;
      font-size: 12px;
      text-align: right;
      border-radius: 5px;
    `;
    const EstimatedCostWhite = styled.h5`
      text-align: right;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      background: transparent;
      right: 22.5px;
      top: 10px;
      font-size: 12px;
    `;
    const UnderLineMini = styled.div`
      width: 230px;
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
        <form className="StopLimitOrderForm">
          <Spacing></Spacing>
          <Wrapper>
            <WhiteText className="headerStyling">Stop Price</WhiteText>
            <ShareSearch 
              className="shareSearchStyling" 
              placeholder={this.state.stop} 
              type="text" 
              value={this.state.stop} 
              name="stop" 
              onChange={this.handleStopChange}
              autoFocus={this.state.focusStop}
              onClick={this.handleStopClick}
            />
          </Wrapper>
          <Wrapper>
            <WhiteText className="headerStyling">Limit Price</WhiteText>
            <ShareSearch 
              className="shareSearchStyling" 
              placeholder={this.state.limit} 
              type="text" 
              value={this.state.limit} 
              name="limit" 
              onChange={this.handleLimitChange}
              autoFocus={this.state.focusLimit}
              onClick={this.handleLimitClick}
            />
          </Wrapper>
          <Wrapper>
            <WhiteText className="headerStyling">Shares</WhiteText>
            <ShareSearch 
              className="shareSearchStyling" 
              type="number" 
              value={this.state.shares} 
              name="shares" 
              onChange={this.handleChange} 
              autoFocus={this.state.focusShare}
              onClick={this.handleShareClick}
            />
          </Wrapper>
          <Wrapper>
            <WhiteText className="headerStyling">Expires</WhiteText>
            <ExpiresDropdown handleEXPChange={this.handleEXPChange} exp={this.state.exp} />
          </Wrapper>
          <UnderLineMini className="underLineMiniStyling"></UnderLineMini>
          <Wrapper>
            <WhiteTextBold className="headerStyling">{this.props.buy === true ? 'Estimated Cost ' : 'Estimated Credit ' }</WhiteTextBold>
            <EstimatedCostWhite className="headerStyling">${this.state.estim}</EstimatedCostWhite>
          </Wrapper>
          <MarketPrice className="justColorGreenRed">Market Price {this.props.stock.price} <Question className="infolink" onClick={() => this.handleMPPopUpClick()}></Question></MarketPrice>
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

export default StopLimitOrder;