# Routes
List of all routes within the application.

## Table of Contents
- [Auth](#auth)
- [User](#user)
- [Cart](#cart)
- [Product](#product)
- [Order](#order)
- [Checkout](#checkout)
- [Search](#search)
- [Admin](#admin)
- [Miscellaneous](#miscellaneous)

## Auth
- `/auth/login`: Login a user
- `/auth/register`: Register a user
- `/auth/confirmation`: Confirm a user's email
- `/auth/forgot-password`: Send a password reset email

## User
- `/user/me`: Get the current user
- `/user/:id`: Get a user by id
- `/user/:id/orders`: Get a user's orders
- `/user/:id/cart`: Get a user's cart
- `/user/:id/wishlist`: Get a user's wishlist
- `/user/:id/reviews`: Get a user's reviews
- `/user/:id/addresses`: Get a user's addresses
- `/user/:id/payment-methods`: Get a user's payment methods

## Cart
- `/cart`: Get the current user's cart
- `/cart/add`: Add an item to the current user's cart

## Product
- `/products`: Get all products
- `/products/:id`: Get a product by id
- `/products/:id/reviews`: Get a product's reviews

## Order
- `/orders`: Get the current user's orders
- `/orders/:id`: Get an order by id

## Checkout
- `/checkout`: Checkout the current user's cart

## Search
- `/search`: Search for products

## Admin
- `/admin`: Admin dashboard
- `/admin/products`: Admin products dashboard
- `/admin/products/add`: Add a product
- `/admin/products/:id`: Get a product by id
- `/admin/products/:id/edit`: Edit a product
- `/admin/orders`: Admin orders dashboard
- `/admin/orders/:id`: Get an order by id
- `/admin/users`: Admin users dashboard
- `/admin/users/:id`: Get a user by id
- `/admin/users/:id/edit`: Edit a user
- `/admin/reviews`: Admin reviews dashboard
- `/admin/reviews/:id`: Get a review by id
- `/admin/categories`: Admin categories dashboard
- `/admin/categories/add`: Add a category
- `/admin/categories/:id`: Get a category by id
- `/admin/categories/:id/edit`: Edit a category
- `/admin/address`: Admin address dashboard
- `/admin/address/add`: Add an address
- `/admin/address/:id`: Get an address by id
- `/admin/address/:id/edit`: Edit an address
- `/admin/payment-methods`: Admin payment methods dashboard
- `/admin/payment-methods/add`: Add a payment method
- `/admin/payment-methods/:id`: Get a payment method by id
- `/admin/payment-methods/:id/edit`: Edit a payment method
- `/admin/logs`: Admin logs dashboard

## Miscellaneous
- `/`: Home page

## Notes
- This is a work in progress, routes will be added as they are implemented

