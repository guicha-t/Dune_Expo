import Qrcode from './../src/screen/qrcode/Qrcode';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Qrcode correctly', () => {

    const tree = renderer.create(<Qrcode />).toJSON();
    expect(tree).toMatchSnapshot();
});