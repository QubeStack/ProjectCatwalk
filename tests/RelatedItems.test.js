/**
 * @jest-environment jsdom
 */
/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import CarouselItem from '../client/src/components/RelatedItems/CarouselItem';
import MultiDisplayCarousel from '../client/src/components/RelatedItems/MultiDisplayCarousel';

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

it('renders a CarouselItem into the document', () => {
  act(() => {
    render(
      <Router>
        <CarouselItem product={{ name: 'air force 1', category: 'shoes', default_price: 90 }} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('card')[0]).toBeDefined();
});

it('renders multiple CarouselItems into the document', () => {
  act(() => {
    render(
      <Router>
        <MultiDisplayCarousel products={[{ name: 'air force 1', category: 'shoes', default_price: 90 }, { name: 'summer shoes', category: 'shoes', default_price: 110 }]} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('card').length).toBe(2);
});

it('renders multiple CarouselItems into the document', () => {
  act(() => {
    render(
      <Router>
        <MultiDisplayCarousel products={[{ name: 'air force 1', category: 'shoes', default_price: 90 }, { name: 'summer shoes', category: 'shoes', default_price: 110 }]} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('card').length).toBe(2);
});
