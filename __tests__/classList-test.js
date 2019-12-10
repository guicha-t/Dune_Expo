import classList from './../src/screen/resultsClass/classList';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render classList correctly', () => {

    const tree = renderer.create(<classList />).toJSON();
    expect(tree).toMatchSnapshot();
});