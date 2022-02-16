/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import HelpfulCount from '../client/src/components/RatingsAndReviews/HelpfulCount';

let container;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders a count of helpful reviews into the document', () => {
  act(() => {
    render(<HelpfulCount />, container);
  });
  expect(container.getElementsByClassName('helpful')).toBeDefined();
});
