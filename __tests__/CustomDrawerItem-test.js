import CustomDrawerItem from './../src/global/navigation/CustomDrawerItem';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render CustomDrawerItem correctly', () => {

    const tree = renderer.create(<CustomDrawerItem />).toJSON();
    expect(tree).toMatchSnapshot();
});