import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductList from '../components/productList';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
jest.mock('react-dom');

let initialState = {
    productDetailReducer: {}
};

let store = mockStore(initialState);

const div = global.document.createElement('div');
describe("ProductList Component", () => {
    it('renders without crashing', () => {
        ReactDOM.render(<ProductList store={store} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});