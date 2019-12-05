import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MarketOrder from '../components/MarketOrder.jsx';
const sinon = require('sinon');
const sampleStock = {
  price: '$300.00',
  stock_symbol: 'AAPL',
  stock_name: 'Apple'
};

describe('Market Order Tests', () => {
  it('should fill out text with correct stock data', () => {
    const wrapper = shallow(<MarketOrder stock={sampleStock} />);
    expect(wrapper.find('.marketPrice').text()).toEqual('Market Price $300.00');
    expect(wrapper.find('.estimatedCost').text()).toEqual('Estimated Cost $0');
    expect(wrapper.find('.buyingPower').text()).toEqual('$1000.00 Buying Power Available');
  });
  it('should render default review order by default', () => {
    const wrapper = shallow(<MarketOrder stock={sampleStock} />);
    expect(wrapper.state('reviewOrder')).toEqual('default');
    expect(wrapper.find('.reviewOrder').children('.defaultReviewOrder').length).toEqual(1);
    expect(wrapper.find('.reviewOrder').children('.falseReviewOrder').length).toEqual(0);
    expect(wrapper.find('.reviewOrder').children('.trueReviewOrder').length).toEqual(0);
    wrapper.setState({ reviewOrder: 'false' });
    expect(wrapper.find('.reviewOrder').children('.defaultReviewOrder').length).toEqual(0);
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
