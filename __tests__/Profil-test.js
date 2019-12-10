import Profil from './../src/screen/userProfil/Profil';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render Profil correctly', () => {

    const tree = renderer.create(<Profil />).toJSON();
    expect(tree).toMatchSnapshot();
});