import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
jest.mock('react-dom');

let initialState = {};

let store = mockStore(initialState);
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store}/>, div);
});
