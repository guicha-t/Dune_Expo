import TermsOfUse from './../src/screen/dashboard/TermsOfUse';
import 'isomorphic-fetch';
import React from 'react';

import renderer from 'react-test-renderer'

jest.useFakeTimers();

test('render ToU correctly', () => {

    const tree = renderer.create(<TermsOfUse />).toJSON();
    expect(tree).toMatchSnapshot();
});