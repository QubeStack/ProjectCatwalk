/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import AddToCart from '../client/src/components/Overview/components/AddToCart';
import ImageGallery from '../client/src/components/Overview/components/ImageGallery';
import ProductInformation from '../client/src/components/Overview/components/ProductInformation';
import StyleSelector from '../client/src/components/Overview/components/StyleSelector';
import Thumbnails from '../client/src/components/Overview/components/Thumbnails';

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

it('renders an add to cart component into the document', () => {
  act(() => {
    render(<AddToCart />, container);
  });
  expect(container.getElementsByClassName('Cart')).toBeDefined();
});

it('renders an image gallery component into the document', () => {
  act(() => {
    render(<ImageGallery />, container);
  });
  expect(container.getElementsByClassName('ImageGallery')).toBeDefined();
});

it('renders a product information component into the document', () => {
  act(() => {
    render(<ProductInformation />, container);
  });
  expect(container.getElementsByClassName('ProductInformation')).toBeDefined();
});

it('renders a collection of styles into the document', () => {
  act(() => {
    render(<StyleSelector />, container);
  });
  expect(container.getElementsByClassName('styles')).toBeDefined();
});

it('renders thumbnails into the document', () => {
  act(() => {
    render(<Thumbnails />, container);
  });
  expect(container.getElementsByClassName('Thumbnails')).toBeDefined();
});
