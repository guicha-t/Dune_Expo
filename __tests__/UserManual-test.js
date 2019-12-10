import userManual from './../src/screen/userManual/userManual';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render userManual correctly', () => {

    const tree = renderer.create(<userManual />).toJSON();
    expect(tree).toMatchSnapshot();
});