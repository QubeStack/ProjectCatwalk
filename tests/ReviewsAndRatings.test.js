/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import HelpfulCount from '../client/src/components/RatingsAndReviews/HelpfulCount';
import ProductBreakdown from '../client/src/components/RatingsAndReviews/ProductBreakdown';
import Stars from '../client/src/components/RatingsAndReviews/ReviewStars';
import WriteNewReview from '../client/src/components/RatingsAndReviews/WriteNewReview';
import Modal from '../client/src/components/RatingsAndReviews/Modal';
import RatingBreakdown from '../client/src/components/RatingsAndReviews/RatingBreakdown';
import RatingsAndReviews from '../client/src/components/RatingsAndReviews/RatingsAndReviews';
import ReviewItem from '../client/src/components/RatingsAndReviews/ReviewItem';
import ReviewsList from '../client/src/components/RatingsAndReviews/ReviewsList';
import data from '../client/src/components/RatingsAndReviews/dummy_data';

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

it('renders a visual representation of characteristics for a product', () => {
  act(() => {
    render(<ProductBreakdown />, container);
  });
  expect(container.getElementsByClassName('productBreakdown')).toBeDefined();
});

it('renders stars onto the document', () => {
  act(() => {
    render(<Stars rating={0.25} />, container);
    render(<Stars rating={0.50} />, container);
    render(<Stars rating={0.75} />, container);
  });
  expect(container.getElementsByClassName('stars')).toBeDefined();
});

it('renders an option to write a new review', () => {
  act(() => {
    render(<WriteNewReview />, container);
  });
  expect(container.getElementsByClassName('newReview')).toBeDefined();
});

it('renders a modal', () => {
  act(() => {
    render(<Modal />, container);
  });
  expect(container.getElementsByClassName('modal')).toBeDefined();
});

it('renders a rating breakdown', () => {
  act(() => {
    render(<RatingBreakdown reviews={data.results} />, container);
  });
  expect(container.getElementsByClassName('ratingBreakdown')).toBeDefined();
});

it('renders a list of reviews', () => {
  act(() => {
    render(<ReviewsList reviews={data.results} />, container);
  });
  expect(container.getElementsByClassName('reviewsList')).toBeDefined();
});

it('renders a review item', () => {
  act(() => {
    const review = data.results[0];
    render(<ReviewItem
      summary={review.summary}
      username={review.reviewer_name}
      date={review.date}
      body={review.body}
      recommend={review.recommend}
      response={review.response}
      photos={review.photos}
      rating={review.rating}
    />, container);
  });
  expect(container.getElementsByClassName('reviewItem')).toBeDefined();
});

it('renders the ratings and reviews module', () => {
  act(() => {
    render(<RatingsAndReviews setRef={null} />, container);
  });
  expect(container.getElementsByClassName('ratingsAndReviews')).toBeDefined();
});
