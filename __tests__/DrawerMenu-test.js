import DrawerMenu from './../src/global/navigation/DrawerMenu';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render DrawerMenu correctly', () => {

    const tree = renderer.create(<DrawerMenu />).toJSON();
    expect(tree).toMatchSnapshot();
});