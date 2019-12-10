import RequestApp from './../src/screen/gameStore/RequestApp';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render RequestApp correctly', () => {

    const tree = renderer.create(<RequestApp />).toJSON();
    expect(tree).toMatchSnapshot();
});