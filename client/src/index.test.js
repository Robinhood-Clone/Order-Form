import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './components/App.jsx';
import MarketOrder from './components/MarketOrder.jsx';
const sinon = require('sinon');
const sampleStock = {
  price: '$300.00',
  stock_symbol: 'AAPL',
  stock_name: 'Apple'
};

describe('App Tests', () => {
  it('should contain App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
  it('has initial state watch set to false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('watch')).toEqual(false);
  });
  it('changes watch button text when clicked', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('watch')).toEqual(false);
    wrapper.find('.watchButton').simulate('click', {
      preventDefault: () => {}
    });
    expect(wrapper.state('watch')).toEqual(true);
  });
  it('should render correct stock symbols in the buy header', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      stock: {
        stock_symbol: 'AAPL'
      }
    });
    expect(wrapper.find('.buyHeader').text()).toEqual('Buy AAPL');
    expect(wrapper.find('.sellHeader').text()).toEqual('Sell AAPL');
  });
  it('should render Market Order by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.marketOrder').exists()).toBe(true);
    wrapper.setState({
      orderType: 'Limit Order'
    })
    expect(wrapper.find('.marketOrder').exists()).toBe(false);
  });
})

describe('Market Order Tests', () => {
  it('should fill out text with correct stock data', () => {
    const wrapper = shallow(<MarketOrder stock={sampleStock} />);
    expect(wrapper.find('.marketPrice').text()).toEqual('Market Price $300.00');
    console.log({ wrapper: wrapper.find('.marketPrice').text() })
    expect(wrapper.find('.estimatedCost').text()).toEqual('Estimated Cost $0');
    expect(wrapper.find('.buyingPower').text()).toEqual('$1000.00 Buying Power Available');
  });
  it('should render null review order by default', () => {
    const wrapper = shallow(<MarketOrder stock={sampleStock} />);
    expect(wrapper.state('reviewOrder')).toEqual('null');
    expect(wrapper.find('.reviewOrder').children('.nullReviewOrder').length).toEqual(1);
    expect(wrapper.find('.reviewOrder').children('.falseReviewOrder').length).toEqual(0);
    expect(wrapper.find('.reviewOrder').children('.trueReviewOrder').length).toEqual(0);
    wrapper.setState({ reviewOrder: 'false' });
    expect(wrapper.find('.reviewOrder').children('.nullReviewOrder').length).toEqual(0);
    expect(wrapper.find('.reviewOrder').children('.falseReviewOrder').length).toEqual(1);
  });
  it('should render the correct esimated price and remaining price', () => {
    const wrapper = mount(<MarketOrder stock={sampleStock} />);
    const input = wrapper.find('.sharesInput');
    input.simulate('change', {target: {name: 'shares', value: '2'} });
    expect(wrapper.state('shares')).toEqual(2);
    expect(wrapper.state('estim')).toEqual('600.00')
    expect(wrapper.state('remaining')).toEqual('400.00')
  });
})


