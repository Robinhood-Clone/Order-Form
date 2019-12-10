import React from 'react';
import styled from 'styled-components';

class TrailDropDown extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleClick= this.handleClick.bind(this);
    this.handleGFDClick = this.handleGFDClick.bind(this);
    this.handleGTCClick = this.handleGTCClick.bind(this);
  }

  handleGTCClick(e) {
    e.preventDefault();
    this.props.handleTrailInputChange('Amount', 'gtc')
  }

  handleGFDClick(e) {
    e.preventDefault();
    this.props.handleTrailInputChange('Percentage', 'gfd')
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
      background: rgb(27,27,29);
      border: 0.5px solid black;
      color: rgb(255,255,255);
      width: 141px;
      position: absolute;
      top: 70px;
      font-size: 12px;
      text-align: center;
      padding-top: 11px;
      padding-bottom: 11px;
      z-index: 8;
      :hover {
        background: rgb(23,23,24);
      }
    `;
    const OptionSelect = styled.div`
      background: rgb(238,84,53);
      border: 0.5px solid black;
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
      if (this.props.exp === 'gfd') {
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
      background: rgb(27,27,29);
      border: 0.5px solid black;
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
    if (this.props.exp === 'gfd') {
      console.log('this.state inside gfd :', this.state);
      return (
        <GoodForDay onClick={this.handleClick}>
          Percentage ▼
          {this.renderDropDown()}
        </GoodForDay>
      );
    } else {
      console.log('this.state inside gtc :', this.state);
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