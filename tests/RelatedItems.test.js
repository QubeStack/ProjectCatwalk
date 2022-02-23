/**
 * @jest-environment jsdom
 */
/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from 'react';
import { ReactDom, render, unmountComponentAtNode } from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';

import RelatedItems from '../client/src/components/RelatedItems/RelatedItems';
import CarouselItem from '../client/src/components/RelatedItems/CarouselItem';
import MultiDisplayCarousel from '../client/src/components/RelatedItems/MultiDisplayCarousel';
import SimilarItems from '../client/src/components/RelatedItems/SimilarItems';
import OutfitItems from '../client/src/components/RelatedItems/OutfitItems';
import Modal from '../client/src/components/RelatedItems/Modal';

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
        <CarouselItem id={40348} product={{ name: 'air force 1', category: 'shoes', default_price: 90 }} actionButton="+" />
      </Router>, container);
  });
  expect(container.getElementsByClassName('card')[0]).toBeDefined();
});

it('renders the modal', () => {
  act(() => {
    render(
      <Modal product={{ features: [{ feature: 'sole', value: 'rubber' }] }} currentProduct={{ features: [{ feature: 'sole', value: 'rubber' }] }} />, container);
  });

  expect(container.getElementsByClassName('modal')[0]).toBeDefined();
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

it('renders a carousel for similar items into the document', () => {
  act(() => {
    render(
      <Router>
        <SimilarItems id={40348} products={[{ name: 'air force 1', category: 'shoes', default_price: 90 }, { name: 'summer shoes', category: 'shoes', default_price: 110 }]} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('similarItems')[0]).toBeDefined();
});

it('renders a carousel for outfit items into the document', () => {
  act(() => {
    render(
      <Router>
        <OutfitItems id={40348} products={[{ name: 'air force 1', category: 'shoes', default_price: 90 }, { name: 'summer shoes', category: 'shoes', default_price: 110 }]} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('outfitItems')[0]).toBeDefined();
});

it('renders two carousels into the document', () => {
  act(() => {
    render(
      <Router>
        <RelatedItems id={40348} products={[{ name: 'air force 1', category: 'shoes', default_price: 90 }, { name: 'summer shoes', category: 'shoes', default_price: 110 }]} />
      </Router>, container);
  });
  expect(container.getElementsByClassName('similarItems')[0]).toBeDefined();
  expect(container.getElementsByClassName('outfitItems')[0]).toBeDefined();
  expect(container.getElementsByClassName('carousel').length).toBe(2);
});
