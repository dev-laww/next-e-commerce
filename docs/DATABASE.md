# Database

Database structure of the project.

## Table of Contents

- [User](#user)
- [Role](#role)
- [User Role](#user-role)
- [Permission](#permission)
- [Role Permission](#role-permission)
- [Address](#address)
- [Payment Method](#payment-method)
- [Product](#product)
- [Product Variant](#product-variant)
- [Shipping Method](#shipping-method)
- [Review](#review)
- [Order](#order)
- [Order Item](#order-item)
- [Payment](#payment)
- [Category](#category)
- [Product Category](#product-category)
- [Cart Item](#cart-item)
- [Wishlist Item](#wishlist-item)
- [Coupon](#coupon)
- [Log](#log)
- [TokenOTP](#tokenotp)

## User

| Field      | Type       | Description                    |
|------------|------------|--------------------------------|
| id         | `int`      | User id                        |
| first_name | `string`   | User first name                |
| last_name  | `string`   | User last name                 |
| image_url  | `string`   | User profile image url         |
| username   | `string`   | User username                  |
| email      | `string`   | User email                     |
| password   | `string`   | User password                  |
| confirmed  | `boolean`  | User email confirmation status |
| created_at | `datetime` | User creation date             |
| updated_at | `datetime` | User last update date          |

## Role

| Field      | Type       | Description           |
|------------|------------|-----------------------|
| id         | `int`      | Role id               |
| code       | `string`   | Role code             |
| name       | `string`   | Role name             |
| created_at | `datetime` | Role creation date    |
| updated_at | `datetime` | Role last update date |

## User Role

| Field      | Type       | Description                |
|------------|------------|----------------------------|
| id         | `int`      | User Role id               |
| user_id    | `int`      | User Role user id          |
| role_id    | `int`      | User Role role id          |
| created_at | `datetime` | User Role creation date    |
| updated_at | `datetime` | User Role last update date |

## Permission

| Field      | Type       | Description                 |
|------------|------------|-----------------------------|
| id         | `int`      | Permission id               |
| code       | `string`   | Permission code             |
| name       | `string`   | Permission name             |
| action     | `string`   | Permission action           |
| resource   | `string`   | Permission resource         |
| created_at | `datetime` | Permission creation date    |
| updated_at | `datetime` | Permission last update date |

## Role Permission

| Field         | Type       | Description                   |
|---------------|------------|-------------------------------|
| id            | `int`      | Role Permission id            |
| role_id       | `int`      | Role Permission role id       |
| permission_id | `int`      | Role Permission permission id |
| created_at    | `datetime` | Role Permission creation date |

## Address

| Field      | Type       | Description              |
|------------|------------|--------------------------|
| id         | `int`      | Address id               |
| user_id    | `int`      | Address user id          |
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
| email           | `string`   | Payment Method email            |
| phone_number    | `string`   | Payment Method phone            |
| card_number     | `string`   | Payment Method card number      |
| expiration_date | `string`   | Payment Method expiration date  |
| cvv             | `string`   | Payment Method cvv              |
| created_at      | `datetime` | Payment Method creation date    |
| updated_at      | `datetime` | Payment Method last update date |

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
| image_url  | `string`   | Product variant image            |
| stock      | `int`      | Product variant stock            |
| product_id | `int`      | Product variant product id       |
| price      | `real`     | Product variant price            |
| raw_price  | `real`     | Product variant raw price        |
| created_at | `datetime` | Product variant creation date    |
| updated_at | `datetime` | Product variant last update date |

## Shipping Method

| Field      | Type       | Description                      |
|------------|------------|----------------------------------|
| id         | `int`      | Shipping Method id               |
| name       | `string`   | Shipping Method name             |
| price      | `real`     | Shipping Method price            |
| created_at | `datetime` | Shipping Method creation date    |
| updated_at | `datetime` | Shipping Method last update date |

## Review

| Field      | Type       | Description             |
|------------|------------|-------------------------|
| id         | `int`      | Review id               |
| user_id    | `int`      | Review user id          |
| product_id | `int`      | Review product id       |
| variant_id | `int`      | Review variant id       |
| rating     | `int`      | Review rating           |
| comment    | `string`   | Review comment          |
| created_at | `datetime` | Review creation date    |
| updated_at | `datetime` | Review last update date |

## Order

| Field        | Type       | Description            |
|--------------|------------|------------------------|
| id           | `int`      | Order id               |
| user_id      | `int`      | Order user id          |
| address_id   | `int`      | Order address id       |
| shipping_id  | `int`      | Order shipping id      |
| order_number | `string`   | Order number           |
| status       | `string`   | Order status           |
| total        | `real`     | Order total            |
| created_at   | `datetime` | Order creation date    |
| updated_at   | `datetime` | Order last update date |

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

## Payment

| Field      | Type       | Description              |
|------------|------------|--------------------------|
| id         | `int`      | Payment id               |
| amount     | `real`     | Payment amount           |
| user_id    | `int`      | Payment user id          |
| order_id   | `int`      | Payment order id         |
| method_id  | `int`      | Payment method id        |
| status     | `string`   | Payment status           |
| created_at | `datetime` | Payment creation date    |
| updated_at | `datetime` | Payment last update date |

## Category

| Field      | Type       | Description               |
|------------|------------|---------------------------|
| id         | `int`      | Category id               |
| name       | `string`   | Category name             |
| created_at | `datetime` | Category creation date    |
| updated_at | `datetime` | Category last update date |

## Product Category

| Field       | Type       | Description                       |
|-------------|------------|-----------------------------------|
| id          | `int`      | Product Category id               |
| product_id  | `int`      | Product Category product id       |
| category_id | `int`      | Product Category category id      |
| created_at  | `datetime` | Product Category creation date    |
| updated_at  | `datetime` | Product Category last update date |

## Cart Item

| Field       | Type       | Description                |
|-------------|------------|----------------------------|
| id          | `int`      | Cart Item id               |
| quantity    | `int`      | Cart Item quantity         |
| total_price | `real`     | Cart Item total price      |
| product_id  | `int`      | Cart Item product id       |
| user_id     | `int`      | Cart Item user id          |
| variant_id  | `int`      | Cart Item variant id       |
| created_at  | `datetime` | Cart Item creation date    |
| updated_at  | `datetime` | Cart Item last update date |

## Wishlist Item

| Field      | Type       | Description                    |
|------------|------------|--------------------------------|
| id         | `int`      | Wishlist Item id               |
| product_id | `int`      | Wishlist Item product id       |
| user_id    | `int`      | Wishlist Item user id          |
| created_at | `datetime` | Wishlist Item creation date    |
| updated_at | `datetime` | Wishlist Item last update date |

## Coupon

| Field      | Type       | Description             |
|------------|------------|-------------------------|
| id         | `int`      | Coupon id               |
| code       | `string`   | Coupon code             |
| type       | `string`   | Coupon type             |
| amount     | `real`     | Coupon amount           |
| created_at | `datetime` | Coupon creation date    |
| updated_at | `datetime` | Coupon last update date |
| expired_at | `datetime` | Coupon expired date     |

## Log

| Field      | Type       | Description       |
|------------|------------|-------------------|
| id         | `int`      | Log id            |
| level      | `string`   | Log level         |
| message    | `string`   | Log message       |
| created_at | `datetime` | Log creation date |

## TokenOTP

| Field      | Type       | Description         |
|------------|------------|---------------------|
| id         | `int`      | Token id            |
| token      | `string`   | Token string        |
| user_id    | `int`      | User id             |
| type       | `string`   | Token type          |
| created_at | `datetime` | Token creation date |