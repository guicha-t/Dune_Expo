import Header from './../src/global/header/Header';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Header correctly', () => {

    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
});