import React from 'react';
import styled from 'styled-components';

class MarketPricePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
  }
  generateRandomNumber() {
    return Math.floor(Math.random() * 1000)
  }
  generateRandomStock() {
    const stockArr = ['NYSE', 'ARCX', 'XNAS', 'XNYS', 'FINR']
    const randomStockArr = Math.floor(Math.random() * stockArr.length)
    return stockArr[randomStockArr]
  }
  render() {
    const PopUp = styled.div`
      position: absolute;
      left: 70px;
      border-radius: 5px;
      width: 240px;
      z-index: 9;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `;
    const WhiteText = styled.h5`
      font-size: 11px;
      font-style: normal;
      position: relative;
      padding-left: 10px;
    `;
    const Price = styled.h5`
      font-size: 11px;
      font-style: normal;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      padding-right: 10px;
    `;
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    const PopUpTitle = styled.div`
      font-size 13px;
      position: relative;
      padding: 15px;
    `;
    const PopUpEnd = styled.div`
      font-size 10px;
      position: relative;
      padding: 15px;
    `;
    const UnderLine = styled.div`
      width: 220px;
      align: center;
      position: relative;
      left: 10px;
    `;
    return (
      <PopUp className="backgroundStyling">
        <PopUpTitle className="popUpTitleStyling">
          The consolidated real-time market data for {this.props.stock.stock_symbol} across all US stock exchanges is:
        </PopUpTitle>
        <Wrapper>
          <WhiteText className="headerStyling">Last Sale ({this.generateRandomStock()})</WhiteText>
          <Price className="headerStyling">{this.props.stock.price} x {this.generateRandomNumber()}</Price>
        </Wrapper>
        <UnderLine className="underLineStyling"></UnderLine>
        <Wrapper>
          <WhiteText className="headerStyling">Bid ({this.generateRandomStock()})</WhiteText>
          <Price className="headerStyling">{this.props.stock.price} x {this.generateRandomNumber()}</Price>
        </Wrapper>
        <UnderLine className="underLineStyling"></UnderLine>
        <Wrapper>
          <WhiteText className="headerStyling">Ask ({this.generateRandomStock()})</WhiteText>
          <Price className="headerStyling">{this.props.stock.price} x {this.generateRandomNumber()}</Price>
        </Wrapper>
        <UnderLine className="underLineStyling"></UnderLine>
        <PopUpEnd className="checkBoxTextStyling">
          The market price on the previous screen may be different because it represents the last trade reported on Nasdaq. Learn more about market data on our help center.
        </PopUpEnd>
      </PopUp>
    );
  }
}

export default MarketPricePopUp;