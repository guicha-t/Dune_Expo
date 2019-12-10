import UserDemands from './../src/screen/gameStore/UserDemands';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render UserDemands correctly', () => {

    const tree = renderer.create(<UserDemands />).toJSON();
    expect(tree).toMatchSnapshot();
});