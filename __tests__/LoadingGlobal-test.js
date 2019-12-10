import Loading from './../src/global/loading/Loading';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Loading correctly', () => {

    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
});