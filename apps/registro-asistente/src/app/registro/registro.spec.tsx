import React from 'react';
import { render } from '@testing-library/react';

import Registro from './registro';

describe('Registro', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Registro />);
    expect(baseElement).toBeTruthy();
  });
});
