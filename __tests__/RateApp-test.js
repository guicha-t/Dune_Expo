import RateApp from './../src/screen/gameStore/RateApp';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render RateApp correctly', () => {

    const tree = renderer.create(<RateApp />).toJSON();
    expect(tree).toMatchSnapshot();
});