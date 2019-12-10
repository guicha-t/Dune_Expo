import AppNotice from './../src/screen/gameStore/AppNotice';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render AppNotice correctly', () => {

    const tree = renderer.create(<AppNotice />).toJSON();
    expect(tree).toMatchSnapshot();
});