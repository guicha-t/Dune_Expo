import EditEmailUser from './../src/screen/userProfil/EditEmailUser';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render EditEmailUser correctly', () => {

    const tree = renderer.create(<EditEmailUser />).toJSON();
    expect(tree).toMatchSnapshot();
});