import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShoppingCart from '../components/shoppingCart';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
jest.mock('react-dom');

let initialState = {
    productDetailReducer: {},
    shoppingCartReducer: {}
};

let store = mockStore(initialState);
const div = global.document.createElement('div');

describe("ShoppingCart Component", () => {
    it('renders without crashing', () => {
        ReactDOM.render(<ShoppingCart store={store} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});