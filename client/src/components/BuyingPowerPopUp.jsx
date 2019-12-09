import React from 'react';
import styled from 'styled-components';

class BuyingPowerPopUp extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const PopUp = styled.div`
      position: absolute;
      left: 70px;
      background: rgb(27,27,29);
      border-radius: 5px;
      width: 240px;
      z-index: 9;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `;
    const WhiteText = styled.h5`
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      padding-left: 10px;
    `;
    const WhiteTextBold = styled.h5`
      font-size: 11px;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      padding-left: 10px;
    `;
    const Price = styled.h5`
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      padding-right: 10px;
    `;
    const PriceBold = styled.h5`
      font-size: 11px;
      color: rgb(255,255,255);
      font-style: normal;
      position: relative;
      padding-right: 10px;
      font-family: 'DINPro-Medium', -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    const PopUpTitle = styled.div`
      color: rgb(255,255,255);
      font-size 11px;
      position: relative;
      padding: 15px;
    `;
    return (
      <PopUp>
        <PopUpTitle>
          {this.props.stock.stock_symbol} has standard margin requirements, so you can invest with all your available margin.
        </PopUpTitle>
        <Wrapper>
          <WhiteText>Cash</WhiteText>
          <Price>{this.props.power}</Price>
        </Wrapper>
        <Wrapper>
          <WhiteText>Margin</WhiteText>
          <Price>$0.00</Price>
        </Wrapper>
        <Wrapper>
          <WhiteTextBold>Buying Power For {this.props.stock.stock_symbol}</WhiteTextBold>
          <PriceBold>{this.props.power}</PriceBold>
        </Wrapper>
        <Wrapper>
          <WhiteText>Initial Margin</WhiteText>
          <Price>50%</Price>
        </Wrapper>
        <Wrapper>
          <WhiteText>Maintenance Margin</WhiteText>
          <Price>25%</Price>
        </Wrapper>
      </PopUp>
    );
  }
}

export default BuyingPowerPopUp;