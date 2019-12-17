import React from 'react';
import { ajax } from 'jquery';
import MarketOrder from './MarketOrder.jsx';
import LimitOrder from './LimitOrder.jsx';
import StopLimitOrder from './StopLimitOrder.jsx';
import StopLossOrder from './StopLossOrder.jsx';
import TrailingStopOrder from './TrailingStopOrder.jsx';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderType: 'Market Order',
      stock: {},
      watch: false,
      power: '',
      buy: true,
      owns: 100
    }
    this.getRandomStock = this.getRandomStock.bind(this);
    this.toggleWatch = this.toggleWatch.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.getUserPower = this.getUserPower.bind(this);
    this.handleBuyClick = this.handleBuyClick.bind(this);
    this.handleSellClick = this.handleSellClick.bind(this);
  }

  componentDidMount() {
    let path = location.pathname;
    let stockSymbol = path.substring(0, path.length - 1)
    if (stockSymbol === '' || stockSymbol === undefined) {
      stockSymbol = 'MMM'
    } else {
      stockSymbol = path.substring(8, path.length - 1)
    }
    this.getRandomStock(stockSymbol);
    this.getUserPower();
  }

  handleBuyClick(e) {
    e.preventDefault();
    this.setState({
      buy: true
    })
  }

  handleSellClick(e) {
    e.preventDefault();
    this.setState({
      buy: false
    })
  }

  getUserPower() {
    ajax({
      url: 'http://13.52.212.165/userpower',
      method: 'GET',
      success: (data) => {
        this.setState({
          power: data[0].power
        })
      }
    })
  }

  handleBuy(newPower, shares) {
    // ajax({
    //   url: '/updateUserPower',
    //   method: 'PUT',
    //   data: {
    //     value: newPower,
    //   },
    //   success: () => console.log('successfully updated')
    // })
    if (this.state.buy === true) {
      this.setState((p) => {
        return {
          power: newPower,
          owns: p.owns + shares
        }
      })
    } else {
      this.setState((p) => {
        return {
          power: newPower,
          owns: p.owns - shares
        }
      })
    }
  }

  handleDropDown(val) {
    this.setState({
      orderType: val
    }, ()=> {
      this.renderView();
    })
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
        <div className="marketOrder">
          <MarketOrder owns={this.state.owns} buy={this.state.buy} handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Limit Order') {
      return (
        <div className="limitOrder">
          <LimitOrder owns={this.state.owns} buy={this.state.buy} handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Loss Order') {
      return (
        <div className="stopLossOrder">
          <StopLossOrder owns={this.state.owns} buy={this.state.buy} handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Stop Limit Order') {
      return (
        <div className="stopLimitOrder">
          <StopLimitOrder owns={this.state.owns} buy={this.state.buy} handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
    if (orderType === 'Trailing Stop Order') {
      return (
        <div className="trailingStopOrder">
          <TrailingStopOrder owns={this.state.owns} buy={this.state.buy} handleBuy={this.handleBuy} power={this.state.power} stock={this.state.stock}/>
        </div>
      );
    }
  }

  getRandomStock(stockSymbol) {
    ajax({
      url: `http://13.52.212.165/stocks/?stock_symbol=${stockSymbol}`,
      method: 'GET',
      success: (data) => {
        console.log('data :', data);
        this.setState({
          stock: data[0]
        })
      }
    })
  }

  render() {
    const BackGround = styled.div`
      width: 275px;
      padding-top: 15px;
      padding-bottom: 2px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 5px;

    `;
    const Header = styled.button`
      background: transparent;
      border: transparent;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px;
      position: absolute;
      left: 92.5px;
    `;
    const SelectHeader2 = styled.button`
      background: transparent;
      border: transparent;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px;
      position: absolute;
      left: 92.5px;
    `;
    const Header2 = styled.button`
      background: transparent;
      border: transparent;
      font-size: 13px;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      text-indent: 15px;
      top: -2px;
    `;
    const SelectHeader = styled.button`
      background: transparent;
      border: transparent;
      font-size: 13px;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      font-style: bold;
      position: relative;
      text-indent: 15px;
      top: -2px;
    `;
    const WatchButton = styled.button`
      width: 230px;
      text-align: center;
      height: 50px;
      border-width: 1px;
      position: relative;
      left: 22.5px;
      top: 10px;
      border-radius: 5px;
    `;
    const UnderLine = styled.div`
      width: 275px;
      position: relative;
      top: 15px;
    `;
    const UnderLineBuy = styled.div`
      width: 60px;
      position: relative;
      top: 13px;
      left: 22.5px;
    `;
    const UnderLineSell = styled.div`
      width: 60px;
      position: relative;
      top: 13px;
      left: 90px;
    `;
    const Wrapper = styled.div`
      display: flex;
      position: relative;
    `;
    if (this.state.buy === true) {
      
      return (
        <div>
          <Wrapper>
            <BackGround className="backgroundStyling">
              <div className="header">
                <SelectHeader onClick={this.handleBuyClick} className="justColorGreenRed">Buy {this.state.stock.stock_symbol}</SelectHeader>
                <Header onClick={this.handleSellClick} className="realHeaderStyling">Sell {this.state.stock.stock_symbol}</Header>
                <Dropdown orderType={this.state.orderType} handleDropDown={this.handleDropDown}/>
              </div>
              <UnderLine class="underLineStyling"></UnderLine>
              <UnderLineBuy class="underLineBuyStyling"></UnderLineBuy>
              <div className="main">
                {this.renderView()}
              </div>
            </BackGround>
          </Wrapper>
          <WatchButton className="watchButtonStyling" onClick={this.toggleWatch}> {this.state.watch === false ? 'Add to Watchlist' : 'Remove from WatchList'} </WatchButton>
        </div>
      );
    } else {
      return (
        <div>
          <Wrapper>
          <BackGround className="backgroundStyling">
            <div className="header">
              <Header2 onClick={this.handleBuyClick} className="realHeaderStyling">Buy {this.state.stock.stock_symbol}</Header2>
              <SelectHeader2 onClick={this.handleSellClick} className="justColorGreenRed">Sell {this.state.stock.stock_symbol}</SelectHeader2>
              <Dropdown orderType={this.state.orderType} handleDropDown={this.handleDropDown}/>
            </div>
            <UnderLine class="underLineStyling"></UnderLine>
            <UnderLineSell class="underLineBuyStyling"></UnderLineSell>
            <div className="main">
              {this.renderView()}
            </div>
          </BackGround>
          </Wrapper>
          <WatchButton className="watchButtonStyling" onClick={this.toggleWatch}> {this.state.watch === false ? 'Add to Watchlist' : 'Remove from WatchList'} </WatchButton>
        </div>
      );
    }
  }
}

export default App;