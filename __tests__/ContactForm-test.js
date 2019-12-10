import ContactForm from './../src/screen/dashboard/ContactForm';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render ContactForm correctly', () => {

    const tree = renderer.create(<ContactForm />).toJSON();
    expect(tree).toMatchSnapshot();
});