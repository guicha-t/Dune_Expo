import Dashboard from './../src/screen/dashboard/Dashboard';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Dashboard correctly', () => {

    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});