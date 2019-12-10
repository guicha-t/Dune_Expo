import ForgottenPass from './../src/screen/startPage/ForgottenPass';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render ForgottenPass correctly', () => {

    const tree = renderer.create(<ForgottenPass />).toJSON();
    expect(tree).toMatchSnapshot();
});