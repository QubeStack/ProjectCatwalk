/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import SearchQuestions from '../client/src/components/QandA/SearchQuestions';
import AddAnswer from '../client/src/components/QandA/AddAnswer';
import AskQuestion from '../client/src/components/QandA/AskQuestion';
import QAListEntry from '../client/src/components/QandA/QAListEntry';
import QuestionsView from '../client/src/components/QandA/QuestionsView';
import AnswerListEntry from '../client/src/components/QandA/AnswerListEntry';

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
// SEARCH QUESTIONS
it('renders a search bar into the document', () => {
  act(() => {
    render(<SearchQuestions />, container);
  });
  expect(container.getElementsByClassName('search')).toBeDefined();
});
// ADD ANSWERS
it('renders an Add Answer Button into the document', () => {
  act(() => {
    render(<AddAnswer />, container);
  });
  expect(container.getElementsByClassName('add')).toBeDefined();
});

it('renders an Add Answer Modal into the document', () => {
  act(() => {
    render(<AddAnswer />, container);
  });
  expect(container.getElementsByClassName('modal')).toBeDefined();
});

it('renders an Ask Question Modal into the document', () => {
  act(() => {
    render(<AddAnswer />, container);
  });
  expect(container.getElementsByClassName('modal')).toBeDefined();
});
// ASK QUESTION
it('renders an Ask Question Buttom into the document', () => {
  act(() => {
    render(<AskQuestion />, container);
  });
  expect(container.getElementsByClassName('ask')).toBeDefined();
});


// QA LIST ENTRY
it('renders a helpful? button into the document', () => {
  act(() => {
    render(<QAListEntry />, container);
  });
  expect(container.getElementsByClassName('helpful')).toBeDefined();
});

it('renders a yes button into the document', () => {
  act(() => {
    render(<QAListEntry />, container);
  });
  expect(container.getElementsByClassName('yes')).toBeDefined();
});
// QUESTIONS VIEW
it('renders a question div into the document', () => {
  act(() => {
    render(<QuestionsView questions={[{ body: 'test' }, { body: 'test2' }]} />, container);
  });
  expect(container.getElementsByClassName('questions')).toBeDefined();
});

// ANSWERS LIST ENTRY
it('renders an answer into the document', () => {
  act(() => {
    render(<AnswerListEntry date="1" />, container);
  });
  expect(container.getElementsByClassName('answer')).toBeDefined();
});
