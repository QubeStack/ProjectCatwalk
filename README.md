# ProjectCatwalk
QubeStack
FEC

Project Catwalk is a front end development project designed to showcase a e-commerce website
with modern features.

Developers:
- Waylon Marble - Product Overviev
- Kat Bakalova
- Joe Wagstaff
- Trevor Leung

## Table of Contents
1. Description
2. Installation Guide
3. Component Features
  - Overview
  - Reviews and Ratings
  - Questions and Answers
  - Related Items

### Description

Project Catwalk is an E-commerce web app with several features. It uses server routing to provide
a easily readable and sectioned URL for easy access. The app is broken down into 4 distinct widgets,
each with their own set of modular components. The features of each widget will be broken down in
their respective sections below.

### Installation Guide

1. Fork and clone this repo on to your local machine.
2. Run the following scripts in order:
  - npm install
  - npm run react-dev
  - npm run server-dev

This will compile the files with webpack and set up the express server that is included. Navigate your
browser to localhost:3000/products/"product_id here". We suggest using product_id 40511 in your url for
best results.

## Component Features


### Product Overview:

The Product Overview Module is comprised of 4 primary components

**Main Image Gallery:** The main image gallery prominently displays a large image of the currently selected style for the current product. If the current style has more than one associated picture arrow buttons will appear to either side of the main image. Upon clicking the right arrow button the gallery will display the next available image in the collection until the end of the collection is reached at which time the right arrow button will be removed from the screen. The left arrow button performs an identical function but for displaying the previous image in the collection or if the beginning of the collection is reached it is removed form the screen. Clicking on the main image expands the image gallery to the full width of the screen, clicking again while expanded collapses the view back to normal. Near the bottom of the gallery is a smaller tumbnail gallery of all available photos in the collection. Clicking on a thumbnail changes the main image to match that of the tumbnail selected.

**Product Information:** The product information component displays the review rating, category, name, price, description and style for the currently selected product style. The review rating appears as a series of filled stars according to the average rating and a link to the right of the stars displays how many reviews the product has and redirects the user to the reviews and ratings section upon clicking. If the current item is on sale the original price is striken-through and the sale price displayed in red. All of the product information changes accordingly when a new product or style is selected.

**Style Selector:** The style selector component is a collection of thumbnails each corresponding to an available style for the current product. Upon hovering the thumbnail is changed slightly to indicated to the user that their cursor is currently over that style. A checkmark will appear in the top left corner of the currently selected style's thumbnail to indicate to the user that is the style that is currently selected. When a new style is selected the main image gallery, product information and cart components will change accordingly.

**Add To Cart:** The add to cart component is made up of two dropdown selection boxes and two buttons. The first selection box is populated with the currently available sizes for the selected product style. If their are no sizes in stock the box displays "OUT OF STOCK". The second selection box is a quantity selection populated with an incremental list of the available quantity of the selected style and size, this is capped to display a maximium of 15. If no style size has not been selected this box remains greyed out and non-interactive. The first button, Add To Cart, when clicked adds the current SKU and quantity to the users cart. If no selections have been made the user is prompted to make selections when the button is clicked. If there is no stock available the cart button is not visible.


### Questions and Answers

This aspect of the app creates a section where users are able to see a list of questions about the currently
showcased product. Each question has it's own set of answers, and users have the ability to both ask and
answer questions. User also have the ability to search for keywords in existing questions. The component break down
is as follows:

1. Questions
  - Questions are displayed 4 at a time and for most efficient rendering and most appealing aesthetic.
  - Each question is initially displayed with two answers.
  - Questions are sorted by most helpful, a metric voted on by users. There is a button to do so next to each question.
  - Each question has a "report" button incase in contains any insensitive language or is not appropriate in some way.
  - More questions can be displayed by a button at the bottom of the list. This button disappears when there are no
    more questions to display.
  - There is a button at the bottom of the list to ask a question, which requires proper form validation and renders the
    new question in real time.
2. Answers
  - Answers are displayed 2 per question initally.
  - If there are more than two answers for any particular question, a show more answers button appears. When clicked, it
    renders the next two answers in real time.
  - Each answer has similar "Helpful" and "report" buttons with the same functionality as the questions.
  - Answers are sorted by whether or not they are from the "Seller" of the product firstly, and secondly by helpfulness.
  - Each question has a button to add an answer, which requires form validation and renders the new answer in real time.
3. Search Bar
  - At the top of the list there is a search bar component.
  - Once 3 or more characters are typed into the bar, the questions list automatically rerenders in real time to
    display only questions that include those characters.

![Q&A in action](http://g.recordit.co/GvysfwsTcR.gif)

### Related Items And Outfits
![alt text](https://i.imgur.com/NE3HxeG.png)
#### Related Items
- features a carousel of product cards that display the picture, name, category, price and rating to the user
- has a star button which, when pressed, displays a comparison modal
- clicking on any product card will re-route to that product's page
#### Outfits
- features a similar carousel to the Related Items section, this time with an 'add to outfit' card which adds the product on the current page to your outfit
- instead of a star button, there is an 'X' button to remove the corresponding product off of the list
- clicking on any product card will re-route to that product's page


