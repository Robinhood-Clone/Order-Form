import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App.jsx';
const sinon = require('sinon');


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


