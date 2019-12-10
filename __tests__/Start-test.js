import Start from './../src/screen/startPage/Start';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Start correctly', () => {

    const tree = renderer.create(<Start />).toJSON();
    expect(tree).toMatchSnapshot();
});