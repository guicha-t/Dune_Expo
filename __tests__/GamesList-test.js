import GamesList from './../src/screen/gameStore/GamesList';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render GamesList correctly', () => {

    const tree = renderer.create(<GamesList />).toJSON();
    expect(tree).toMatchSnapshot();
});