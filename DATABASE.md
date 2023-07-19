# Database

Database structure of the project.

## Table of Contents

- [User](#user)
- [Product](#product)
- [Product Variant](#product-variant)
- [Review](#review)
- [Order](#order)
- [Order Item](#order-item)
- [Address](#address)
- [Payment Method](#payment-method)
- [Category](#category)
- [Cart](#cart)
- [Cart Item](#cart-item)
- [Wishlist](#wishlist)
- [Wishlist Item](#wishlist-item)
- [Log](#log)

## User

| Field      | Type       | Description                    |
|------------|------------|--------------------------------|
| id         | `int`      | User id                        |
| username   | `string`   | User username                  |
| email      | `string`   | User email                     |
| password   | `string`   | User password                  |
| role       | `string`   | User role                      |
| confirmed  | `boolean`  | User email confirmation status |
| created_at | `datetime` | User creation date             |
| updated_at | `datetime` | User last update date          |

## Product

| Field       | Type       | Description              |
|-------------|------------|--------------------------|
| id          | `int`      | Product id               |
| name        | `string`   | Product name             |
| description | `string`   | Product description      |
| created_at  | `datetime` | Product creation date    |
| updated_at  | `datetime` | Product last update date |

## Product Variant

| Field      | Type       | Description                      |
|------------|------------|----------------------------------|
| id         | `int`      | Product variant id               |
| name       | `string`   | Product variant name             |
| stock      | `int`      | Product variant stock            |
| price      | `real`     | Product variant price            |
| raw_price  | `real`     | Product variant raw price        |
| created_at | `datetime` | Product variant creation date    |
| updated_at | `datetime` | Product variant last update date |

## Review

| Field      | Type       | Description             |
|------------|------------|-------------------------|
| id         | `int`      | Review id               |
| rating     | `int`      | Review rating           |
| comment    | `string`   | Review comment          |
| created_at | `datetime` | Review creation date    |
| updated_at | `datetime` | Review last update date |

## Order

| Field      | Type       | Description            |
|------------|------------|------------------------|
| id         | `int`      | Order id               |
| user_id    | `int`      | Order user id          |
| status     | `string`   | Order status           |
| created_at | `datetime` | Order creation date    |
| updated_at | `datetime` | Order last update date |

## Order Item

| Field      | Type       | Description                 |
|------------|------------|-----------------------------|
| id         | `int`      | Order Item id               |
| quantity   | `int`      | Order Item quantity         |
| order_id   | `int`      | Order Item order id         |
| product_id | `int`      | Order Item product id       |
| variant_id | `int`      | Order Item variant id       |
| price      | `real`     | Order Item price            |
| created_at | `datetime` | Order Item creation date    |
| updated_at | `datetime` | Order Item last update date |

## Address

| Field      | Type       | Description              |
|------------|------------|--------------------------|
| id         | `int`      | Address id               |
| name       | `string`   | Address name             |
| address    | `string`   | Address address          |
| city       | `string`   | Address city             |
| state      | `string`   | Address state            |
| country    | `string`   | Address country          |
| zip        | `string`   | Address zip              |
| phone      | `string`   | Address phone            |
| created_at | `datetime` | Address creation date    |
| updated_at | `datetime` | Address last update date |

## Payment Method

| Field           | Type       | Description                     |
|-----------------|------------|---------------------------------|
| id              | `int`      | Payment Method id               |
| user_id         | `int`      | Payment Method user id          |
| name            | `string`   | Payment Method name             |
| card_number     | `string`   | Payment Method card number      |
| expiration_date | `string`   | Payment Method expiration date  |
| cvv             | `string`   | Payment Method cvv              |
| created_at      | `datetime` | Payment Method creation date    |
| updated_at      | `datetime` | Payment Method last update date |

## Category

| Field      | Type       | Description               |
|------------|------------|---------------------------|
| id         | `int`      | Category id               |
| name       | `string`   | Category name             |
| created_at | `datetime` | Category creation date    |
| updated_at | `datetime` | Category last update date |

## Cart

| Field      | Type       | Description           |
|------------|------------|-----------------------|
| id         | `int`      | Cart id               |
| user_id    | `int`      | Cart user id          |
| created_at | `datetime` | Cart creation date    |
| updated_at | `datetime` | Cart last update date |

## Cart Item

| Field      | Type       | Description                |
|------------|------------|----------------------------|
| id         | `int`      | Cart Item id               |
| quantity   | `int`      | Cart Item quantity         |
| product_id | `int`      | Cart Item product id       |
| cart_id    | `int`      | Cart Item cart id          |
| variant_id | `int`      | Cart Item variant id       |
| created_at | `datetime` | Cart Item creation date    |
| updated_at | `datetime` | Cart Item last update date |

## Wishlist

| Field      | Type       | Description               |
|------------|------------|---------------------------|
| id         | `int`      | Wishlist id               |
| user_id    | `int`      | Wishlist user id          |
| created_at | `datetime` | Wishlist creation date    |
| updated_at | `datetime` | Wishlist last update date |

## Wishlist Item

| Field       | Type       | Description                    |
|-------------|------------|--------------------------------|
| id          | `int`      | Wishlist Item id               |
| product_id  | `int`      | Wishlist Item product id       |
| wishlist_id | `int`      | Wishlist Item wishlist id      |
| created_at  | `datetime` | Wishlist Item creation date    |
| updated_at  | `datetime` | Wishlist Item last update date |

## Log

| Field      | Type       | Description       |
|------------|------------|-------------------|
| id         | `int`      | Log id            |
| message    | `string`   | Log message       |
| created_at | `datetime` | Log creation date |
