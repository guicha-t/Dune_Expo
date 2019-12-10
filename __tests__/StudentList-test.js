import StudentList from './../src/screen/trombinoscope/StudentList';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render StudentList correctly', () => {

    const tree = renderer.create(<StudentList />).toJSON();
    expect(tree).toMatchSnapshot();
});