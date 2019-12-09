import React from 'react';
import styled from 'styled-components';

class TrailDropDown extends React.Component{
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
    this.setState({
      exp: 'gtc'
    }, this.props.handleTrailInputChange('Amount'))
  }

  handleGFDClick(e) {
    e.preventDefault();
    this.setState({
      exp: 'gfd'
    }, this.props.handleTrailInputChange('Percentage'))
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
      background: rgb(23,23,24);
      border: transparent;
      color: rgb(255,255,255);
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
      background: rgb(238,84,53);
      border: transparent;
      color: rgb(23,23,24);
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
            <OptionSelect onClick={this.handleGFDClick}>Percentage</OptionSelect>
            <Option onClick={this.handleGTCClick}>Amount</Option>
          </Wrapper>
        );
      } else {
        return(
          <Wrapper>
            <OptionSelect onClick={this.handleGTCClick}>Amount</OptionSelect>
            <Option onClick={this.handleGFDClick}>Percentage</Option>
          </Wrapper>
        );
      }
    }
  }

  render() {
    const GoodForDay = styled.div`
      background: rgb(23,23,24);
      border: transparent;
      color: rgb(255,255,255);
      width: 141px;
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
        <GoodForDay onClick={this.handleClick}>
          Percentage ▼
          {this.renderDropDown()}
        </GoodForDay>
      );
    } else {
      return (
        <GoodForDay onClick={this.handleClick}>
          Amount ▼
          {this.renderDropDown()}
        </GoodForDay>
      );
    }
  }
}

export default TrailDropDown;