import gameList from './../src/screen/resultsClass/gameList';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render gameList correctly', () => {

    const tree = renderer.create(<gameList />).toJSON();
    expect(tree).toMatchSnapshot();
});