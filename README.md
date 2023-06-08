# EasyBuy

## Project Description

EasyBuy is an online store, built with React and Express, showcasing a selection of products. Users can view the available products, add them to their cart, and modify their cart as needed. The product data is pulled from the Dummy Products API. This application also offers extended functionality of suggesting similar products based on the contents of the user's cart and the item they are currently viewing. The cart state is managed using browser cookies.

This project is hosted on Netlify and adheres to good design principles. The codebase is well-documented and features a public-facing API that provides endpoints for retrieving the list of available products and the details of specific items.

## Table of Contents

1. [Installation](#installation)
2. [How to Use Project](#how-to-use-project)
3. [Features and Functionalities](#features-and-functionalities)
4. [Status of Features](#status-of-features)
5. [API Endpoints](#api-endpoints)
6. [Credits](#credits)

## Installation❓

Please follow the steps below to install and run the project:

1. Ensure that Node.js is installed on your machine.
2. Clone the repository using Git.
3. Navigate to the project directory via your terminal.
4. Execute `npm install` to install the necessary dependencies.
5. Start the project with `npm start`. The application should now be accessible at `http://localhost:3000`.

## How to Use Project

1. Visit the homepage to see the list of products.
2. Add the desired products to your cart by selecting the "Add to Cart" button.
3. View and modify your cart as required.
4. Checkout when you're ready.

## Features and Functionalities ❓

- Display Products: Users can view a list of available products.
- Add to Cart: Users can add items to their cart.
- Edit Cart: The contents of the cart can be edited by the user.
- Recommended Items: The application suggests similar products based on the user's cart or the currently viewed item.
- Persistent Cart: The application uses browser cookies to persist the cart state across page refreshes.

## Status of Features❓

## API Endpoints

- `app-name.herokuapp.com/items/all`: Returns the list of available products.
- `app-name.herokuapp.com/item/<item id>`: Returns details for a specific item.

## Technologies Used

- React.js
- Express.js
- Firebase
- Dummy Products API
- Browser Cookies

## Credits

This project was successfully implemented thanks to the commitment and dedication of:

- Nolan Hill [GitHub](https://github.com/NolanReedHill)
- Ethan Haller [GitHub](https://github.com/EthanHaller)
- Marina Lin [GitHub](https://github.com/Lamarina0612)
- Alexander Talreja [GitHub](https://github.com/AlexTalreja)
- Mohammed Alwosaibi [GitHub](https://github.com/hst6pw)

We want to extend our gratitude to all contributors to this project. Your contributions have been pivotal to its success.
