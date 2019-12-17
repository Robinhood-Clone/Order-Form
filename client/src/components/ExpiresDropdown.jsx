import React from 'react';
import styled from 'styled-components';

class ExpiresDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      exp: this.props.exp,
      open: false,
    }
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleClick= this.handleClick.bind(this);
    this.handleGFDClick = this.handleGFDClick.bind(this);
    this.handleGTCClick = this.handleGTCClick.bind(this);
  }

  handleGTCClick(e) {
    e.preventDefault();
    this.props.handleEXPChange('gtc')
  }

  handleGFDClick(e) {
    e.preventDefault();
    this.props.handleEXPChange('gfd')
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((p) => {
      return {
        open: !p.open
      }
    })
  }

  renderDropDown() {
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    const Option = styled.div`
      width: 141px;
      position: absolute;
      top: 70px;
      font-size: 12px;
      text-align: center;
      padding-top: 11px;
      padding-bottom: 11px;
      z-index: 8;
    `;
    const OptionSelect = styled.div`
      width: 141px;
      position: absolute;
      top: 35px;
      font-size: 12px;
      text-align: center;
      padding-top: 11px;
      padding-bottom: 11px;
      z-index: 8;
    `;
    if (this.state.open === true) {
      if (this.state.exp === 'gfd') {
        return(
          <Wrapper>
            <OptionSelect className="optionSelectStyling" onClick={this.handleGFDClick}>Good for Day</OptionSelect>
            <Option className="optionStyling" onClick={this.handleGTCClick}>Good till Canceled</Option>
          </Wrapper>
        );
      } else {
        return(
          <Wrapper>
            <OptionSelect className="optionSelectStyling" onClick={this.handleGTCClick}>Good till Canceled</OptionSelect>
            <Option className="optionStyling" onClick={this.handleGFDClick}>Good for Day</Option>
          </Wrapper>
        );
      }
    }
  }

  render() {
    const GoodForDay = styled.div`
      background: rgb(255,255,255);
      color: rgb(23,23,24);
      width: 141px;
      border: 0.5px solid rgb(250,250,250);
      position: relative;
      top: 10px;
      right: 22.5px;
      font-size: 12px;
      text-align: center;
      padding-top: 11px;
      padding-bottom: 11px;
      border-radius: 5px;
      :hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    `;
    if (this.state.exp === 'gfd') {
      return (
        <GoodForDay className="goodForDayStyling" onClick={this.handleClick}>
          Good for Day ▼
          {this.renderDropDown()}
        </GoodForDay>
      );
    } else {
      return (
        <GoodForDay className="goodForDayStyling" onClick={this.handleClick}>
          Good till Canceled ▼
          {this.renderDropDown()}
        </GoodForDay>
      );
    }
  }
}

export default ExpiresDropdown;