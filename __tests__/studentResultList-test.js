import studentResultList from './../src/screen/resultsClass/studentResultList';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render studentResultList correctly', () => {

    const tree = renderer.create(<studentResultList />).toJSON();
    expect(tree).toMatchSnapshot();
});