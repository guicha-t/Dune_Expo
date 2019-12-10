import EditPassUser from './../src/screen/userProfil/EditPassUser';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render EditPassUser correctly', () => {

    const tree = renderer.create(<EditPassUser />).toJSON();
    expect(tree).toMatchSnapshot();
});