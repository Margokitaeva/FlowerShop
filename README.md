# FlowerShop

FlowerShop is a multi-page frontend website for a flower shop, built with HTML, SCSS, and vanilla JavaScript.

The project includes a landing page, a shop page with dynamically rendered product cards, a product details page, and pages for master classes and registration. It focuses on clean page structure, reusable product data, and small interactive UI features.

## Features

- Multi-page website structure
- Product catalog rendered from JavaScript data
- Product details page generated based on URL parameters
- Hover image switching for product cards
- Burger menu with overlay and smooth navigation
- Newsletter subscription form
- Master classes page and registration page
- Reusable styling with SCSS

## Technologies

- HTML5
- SCSS / CSS
- JavaScript (ES6 modules)

## Project structure

- `index.html` — landing page
- `shop.html` — product catalog
- `item.html` — product details page
- `master_classes.html` — master classes page
- `master_class_registration.html` — registration page
- `scripts/` — JavaScript modules
- `scss/` — source styles
- `css/` — compiled styles

## JavaScript functionality

The project uses JavaScript modules to organize functionality across pages. Product data is stored separately and reused for catalog rendering and product details. The shop page renders cards dynamically, and the item page loads the selected product using query parameters from the URL.

Interactive elements include:
- product card click navigation
- image switching on hover
- burger menu opening and closing
- newsletter subscription handling
- navigation between pages using URL parameters

## What I practiced in this project

- Building a multi-page frontend website
- Working with reusable JavaScript data structures
- Rendering UI content dynamically
- Organizing project structure into separate HTML, SCSS, and JS files
- Implementing interactive UI behavior with vanilla JavaScript
- Creating a consistent visual style for a small commercial website

## How to run

Clone the repository and open `index.html` in the browser.