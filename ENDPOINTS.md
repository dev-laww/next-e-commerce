# Endpoints
List of all the endpoints in the API.

## Table of Contents
- [Auth](#auth)
- [Account](#account)
- [Address](#address)
- [Payment Methods](#payment-methods)
- [Products](#products)
- [Variants](#variants)
- [Categories](#categories)
- [Orders](#orders)
- [Payments](#payments)
- [Reviews](#reviews)
- [Shipping](#shipping)
- [Admin](#admin)
- [Wishlist](#wishlist)
- [Cart](#cart)
- [Coupons](#coupons)
- [Common Response](#common-response)
- [Notes](#notes)

## Auth
- `POST /auth/signup`: Create a new user account.
    - **Request**:
        ```http request
        POST /auth/signup
      
        Content-Type: application/json
      
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "secretpassword"
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "User created successfully",
                "data": {
                    "id": "<id>",
                    "name": "John Doe",
                    "email": "johndoe@mail.com"
                }
            } 
            ```
    - **Error Response**
        - Status: 400 BAD REQUEST
        - Body:
            ```json
            {
              "status": "fail",
              "message": "Email already exists"
            }
            ```
    
- `POST /auth/login`: Login to an existing user account.
    - **Request**:
        ```http request
        POST /auth/login
      
        Content-Type: application/json

        {
            "email": "john.doe@example.com",
            "password": "secretpassword"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
           ```json
           {
              "status": "success",
              "message": "User logged in successfully"
           }
           ```
    - **Error Response**
        - Status: 401 UNAUTHORIZED
        - Body:
            ```json
            {
                "status": "fail",
                "message": "Invalid email or password"
            }
            ```
- `POST /auth/logout`: Logout from an existing user account.
    - **Request**:
        ```http request
        POST /auth/logout
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
      - Status: 200 OK
      - Body:
        ```json
         {
             "status": "success",
             "message": "User logged out successfully"
         }
        ```
- `POST /auth/reset-password`: Send a password reset token to the user's email.
    - **Request**:
        ```http request
        POST /auth/reset-password
      
        Content-Type: application/json
    
       {
            "email": "john.doe@example.com"
       }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Password reset token sent to email"
            }
            ```
- `POST /auth/confirm-email`: Confirm a user's email address.
    - **Request**:
        ```http request
        POST /auth/confirm-email
      
        Content-Type: application/json
      
        {
            "token": "<token>"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Email confirmed successfully"
            }
            ```
    - **Error Response**
        - Status: 400 BAD REQUEST
        - Body:
            ```json
            {
              "status": "fail",
              "message": "Invalid token"
            }
            ```
- `POST /auth/resend-confirmation-email`: Resend a confirmation email to the user's email address.
    - **Request**:
        ```http request
        POST /auth/resend-confirmation-email
      
        Content-Type: application/json
      
        {
            "email": "johndoe@mail.com"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Confirmation email sent successfully"
            }
            ```
      
## Account
- `GET /account/profile`: Get the user's profile information.
    - **Request**:
        ```http request
        GET /account/profile
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": "<id>",
                    "name": "John Doe",
                    "email": "johndoe@mail.com"
                }
            } 
            ```
- `PUT /account/profile`: Update the user's profile information.
    - **Request**:
        ```http request
        PUT /account/profile
      
        Authorization: Bearer <access_token>
        Content-Type: application/json

        {
            "name": "John Doe",
            "email": "john.doe@example.com",
        }
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "User profile updated successfully",
                "data": {
                    "id": "<id>",
                    "name": "John Doe",
                    "email": "johndoe@mail.com"
                }
            } 
            ```
- `PUT /account/change-password`: Change the user's password.
    - **Request**:
        ```http request
        PUT /account/change-password
      
        Authorization: Bearer <access_token>
        Content-Type: application/json

        {
            "currentPassword": "secretpassword",
            "newPassword": "newsecretpassword"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Password changed successfully"
            }
            ```

## Address
- `GET /address`: Get a list of all addresses for the current user
    - NOTE: If the user is an admin, this will return all addresses for all users.
    - **Request**
        ```http request
        GET /address
        
        Authorization: Bearer <access_token>
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                   "id": 1,
                   "userId": 1,
                   "name": "John Doe",
                   "address": "123 Main St",
                   "city": "New York",
                   "state": "NY",
                   "zip": "10001",
                   "country": "US",
                   "phone": "1234567890"
                }, {
                   "id": 2,
                   "userId": 1,
                   "name": "Jane Doe",
                   "address": "123 Main St",
                   "city": "New York",
                   "state": "NY",
                   "zip": "10001",
                   "country": "US",
                   "phone": "1234567890"
                }]
            }
            ```
- `GET /address/:id`: Get the details of a specific address
   - **Request**
        ```http request
        GET /address/1
        
        Authorization: Bearer <access_token>
        ```
   - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                   "id": 1,
                   "userId": 1,
                   "name": "John Doe",
                   "address": "123 Main St",
                   "city": "New York",
                   "state": "NY",
                   "zip": "10001",
                   "country": "US",
                   "phone": "1234567890"
                }
            }
            ```
- `POST /address`: Create a new address
    - **Request**
        ```http request
        POST /address
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "John Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "country": "US",
            "phone": "1234567890"
        }
        ```
    - **Response**
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Address created successfully",
                "data": {
                   "id": "<id>",
                   "userId": 1,
                   "name": "John Doe",
                   "address": "123 Main St",
                   "city": "New York",
                   "state": "NY",
                   "zip": "10001",
                   "country": "US",
                   "phone": "1234567890"
                }
            }
            ```
- `PUT /address/:id`: Update an existing address
    - **Request**
        ```http request
        PUT /address/1
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "John Doe",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "country": "US",
            "phone": "1234567890"
        }
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Address updated successfully",
                "data": {
                   "id": 1,
                   "userId": 1,
                   "name": "John Doe",
                   "address": "123 Main St",
                   "city": "New York",
                   "state": "NY",
                   "zip": "10001",
                   "country": "US",
                   "phone": "1234567890"
                }
            }
            ```
- `DELETE /address/:id`: Delete a specific address.
    - **Request**:
        ```http request
        DELETE /address/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Address deleted successfully"
            } 
            ```
          
## Payment Methods
- `GET /payment-methods`: Get a list of all products.
    - **Request**:
        ```http request
        GET /payment-methods
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "data": [{
                "id": 1,
                "userId": 1,
                "name": "John Doe",
                "cardNumber": "1234567890123456",
                "expirationMonth": "01",
                "expirationYear": "2020",
                "cvv": "123"
              }, {
                "id": 2,
                "userId": 1,
                "name": "John Doe",
                "cardNumber": "1234567890123456",
                "expirationMonth": "01",
                "expirationYear": "2020",
                "cvv": "123"
              }]
            }
            ```
- `GET /payment-methods/:id`: Get the details of a specific payment method.
    - **Request**:
        ```http request
        GET /payment-methods/1
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment method created successfully",
                "data": {
                    "id": 1,
                    "userId": 1,
                    "name": "John Doe",
                    "cardNumber": "1234567890123456",
                    "expirationMonth": "01",
                    "expirationYear": "2020",
                    "cvv": "123"
                }
            } 
            ```
- `POST /payment-methods`: Create a new product
    - **Request**:
        ```http request
        POST /payment-methods
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "id": 1,
            "userId": 1,
            "name": "New Name",
            "cardNumber": "1234567890123456",
            "expirationMonth": "01",
            "expirationYear": "2020",
            "cvv": "123"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment method created successfully",
                "data": {
                    "id": "<id>",
                    "userId": 1,
                    "name": "New Name",
                    "cardNumber": "1234567890123456",
                    "expirationMonth": "01",
                    "expirationYear": "2020",
                    "cvv": "123"
                }
            }
            ```
- `PUT /payment-methods/:id`: Update the details of a specific product.
    - **Request**:
        ```http request
        PUT /payment-methods
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "id": 1,
            "userId": 1,
            "name": "Updated Name",
            "cardNumber": "1234567890123456",
            "expirationMonth": "01",
            "expirationYear": "2020",
            "cvv": "123"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment method updated successfully",
                "data": {
                    "id": 1,
                    "userId": 1,
                    "name": "Updated Name",
                    "cardNumber": "1234567890123456",
                    "expirationMonth": "01",
                    "expirationYear": "2020",
                    "cvv": "123"
                }
            }
            ```
- `DELETE /payment-methods/:id`: Delete a specific product.
    - **Request**:
        ```http request
        DELETE /payment-methods/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment method deleted successfully"
            } 
            ```

## Products
- `GET /products`: Get a list of all products.
    - **Request**:
        ```http request
        GET /products
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "data": [
               {
                  "id": 1,
                  "name": "Product 1",
                  "description": "Sample description",
                  "image": "https://example.com/image.jpg"
               }, {
                  "id": 2,
                  "name": "Product 2",
                  "description": "Sample description",
                  "image": "https://example.com/image.jpg"
               }
              ]
            }
            ```
- `GET /products/:id`: Get the details of a specific product.
    - **Request**:
        ```http request
        GET /products/1
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product created successfully",
                "data": {
                    "id": "1",
                    "name": "Product 1",
                    "description": "Sample description",
                    "image": "https://example.com/image.jpg"
                }
            } 
            ```
- `POST /products`: Create a new product
    - **Request**:
        ```http request
        POST /products
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "name": "New Product",
            "description": "Sample description"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product created successfully",
                "data": {
                    "id": "<id>",
                    "name": "Product 1",
                    "description": "Sample description",
                    "image": "https://example.com/image.jpg"
                }
            }
            ```
- `PUT /products/:id`: Update the details of a specific product.
    - **Request**:
        ```http request
        PUT /products/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
           "name": "Updated Product",
           "description": "Updated Description"
           "image": "https://example.com/image.jpg"
        }
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product updated successfully",
                "data": {
                    "id": "<id>",
                    "name": "Updated Product",
                    "description": "Updated Description"
                }
            } 
            ```
- `DELETE /products/:id`: Delete a specific product.
    - **Request**:
        ```http request
        DELETE /products/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product deleted successfully"
            } 
            ```
          
## Variants
- `GET /variants`: Get a list of all variants.
    - **Request**:
        ```http request
        GET /variants
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "name": "Variant 1",
                    "price": 199.99,
                    "rawPrice": 150.99,
                    "productId": 1,
                    "quantity": 10,
                    "sold": 0
                }, {
                    "id": 2,
                    "name": "Variant 2",
                    "price": 199.99,
                    "rawPrice": 150.99,
                    "productId": 1,
                    "quantity": 10,
                    "sold": 0
                }]
            } 
            ```
- `GET /variants/:id`: Get the details of a specific variant.
     - **Request**
         ```http request
            GET /variants/1
         ```
     - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "name": "Variant 1",
                    "price": 199.99,
                    "rawPrice": 150.99,
                    "productId": 1,
                    "quantity": 10,
                    "sold": 0
                }
            } 
            ```
- `POST /variants`: Create a new variant. (admin-only)
    - **Request**
        ```http request
        POST /variants
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "Variant 1",
            "price": 199.99,
            "rawPrice": 150.99,
            "productId": 1,
            "quantity": 10,
            "sold": 0
        }
        ```
    - **Response**
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Variant created successfully",
                "data": {
                    "id": "<id>",
                    "name": "Variant 1",
                    "price": 199.99,
                    "rawPrice": 150.99,
                    "productId": 1,
                    "quantity": 10,
                    "sold": 0
                }
            } 
            ```
- `PUT /variants/:id`: Update the details of a specific variant. (admin-only)
    - **Request**
        ```http request
        PUT /variants/1
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "Updated Variant",
            "price": 199.99,
            "rawPrice": 150.99,
            "productId": 1,
            "quantity": 10,
            "sold": 0
        }
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Variant updated successfully",
                "data": {
                    "id": 1,
                    "name": "Updated Variant",
                    "price": 199.99,
                    "rawPrice": 150.99,
                    "productId": 1,
                    "quantity": 10,
                    "sold": 0
                } 
            }
            ```
- `DELETE /variants/:id`: Delete a specific variant. (admin-only)
    - **Request**
        ```http request
        DELETE /variants/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Variant deleted successfully"
            } 
            ```

## Categories
- `GET /categories`: Get a list of all categories.
    - **Request**:
        ```http request
        GET /categories
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
               "data": [{
                  "id": 1,
                  "name": "Category 1"
               }, {
                  "id": 2,
                  "name": "Category 2"
               }]
            } 
            ```
- `GET /categories/:id`: Get the details of a specific category.
    - **Request**:
        ```http request
        GET /categories/1
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                   "id": 1,
                   "name": "Category 1"
                }
            } 
            ```
- `POST /categories`: Create a new category. (admin-only)
    - **Request**:
        ```http request
        POST /categories
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "name": "New Category"
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
               "status": "success",
               "message": "Category created successfully",
               "data": {
                  "id": 3,
                  "name": "New Category"
               }
            }
            ```
- `PUT /categories/:id`: Update the details of a specific category. (admin-only)
    - **Request**:
        ```http request
        PUT /categories/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "name": "Updated Category"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
               "status": "success",
               "message": "Category updated successfully",
               "data": {
                  "id": 3,
                  "name": "Updated Category"
               }
            }
            ```
- `DELETE /categories/:id`: Delete a specific category. (admin-only)
    - **Request**:
        ```http request
        DELETE /categories/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
               "status": "success",
               "message": "Category deleted successfully"
            }
            ```

## Orders
- `GET /orders`: Get a list of all orders.
    - **Request**:
        ```http request
        GET /orders
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "order_number": "ORD-001",
                    "total_amount": 99.99,
                    "status": "Processing"
                }, {
                    "id": 2,
                    "order_number": "ORD-002",
                    "total_amount": 79.99,
                    "status": "Delivered"
                }]
            }
            ```
- `GET /orders/:id`: Get the details of a specific order.
    - **Request**:
        ```http request
        GET /orders/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "order_number": "ORD-001",
                    "total_amount": 99.99,
                    "status": "Processing"
                }
            } 
            ```
- `POST /orders`: Create a new order.
    - **Request**:
        ```http request
        POST /orders
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "total_amount": 119.99,
            "status": "Processing"
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Order created successfully",
                "data": {
                    "id": 3,
                    "order_number": "ORD-003",
                    "total_amount": 119.99,
                    "status": "Processing"
                }
            }
            ```
- `PUT /orders/:id`: Update the details of a specific order.
    - **Request**:
        ```http request
        PUT /orders/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "status": "Delivered"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Order updated successfully",
                "data": {
                "id": 1,
                    "order_number": "ORD-001",
                    "total_amount": 89.99,
                    "status": "Delivered"
                }
            }
            ```
- `PUT /orders/:id/cancel`: Cancel a specific order.
    - **Request**:
        ```http request
        PUT /orders/1/cancel
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Order cancelled",
                "data": {
                "id": 1,
                    "order_number": "ORD-001",
                    "total_amount": 89.99,
                    "status": "Cancelled"
                }
            }
            ```
- `DELETE /orders/:id`: Delete a specific order. (admin-only)
    - **Request**:
        ```http request
        DELETE /orders/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Order deleted successfully"
            } 
            ```

## Payments
- `GET /payments`: Get a list of all payments.
    - **Request**:
        ```http request
        GET /payments
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "amount": 99.99,
                    "status": "Paid"
                }, {
                    "id": 2,
                    "amount": 79.99,
                    "status": "Refunded"
                }]
            }
            ```
- `GET /payments/:id`: Get the details of a specific payment.
    - **Request**:
        ```http request
        GET /payments/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                      "id": 2,
                      "amount": 79.99,
                      "status": "Refunded"
                }
            } 
            ```
- `POST /payments`: Create a new payment.
    - **Request**:
        ```http request
        POST /payments
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "amount": 119.99,
            "status": "Paid"
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment created successfully",
                "data": {
                      "id": 3,
                      "amount": 119.99,
                      "status": "Paid"
                }
            }
            ```
- `PUT /payments/:id`: Update the details of a specific payment.
    - **Request**:
        ```http request
        PUT /payments/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "amount": 89.99,
            "status": "Refunded"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment updated successfully",
                "data": {
                      "id": 1,
                      "amount": 89.99,
                      "status": "Refunded"
                }
            }
            ```
- `DELETE /payments/:id`: Delete a specific payment. (admin-only)
    - **Request**:
        ```http request
        DELETE /payments/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Payment deleted successfully"
            }
            ```

## Reviews
- `GET /reviews`: Get a list of all reviews.
    - **Request**:
        ```http request
        GET /reviews
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "productId": 1,
                    "rating": 4,
                    "comment": "Great product"
                }, {
                    "id": 2,
                    "productId": 2,
                    "rating": 5,
                    "comment": "Excellent product"
                }]
            }
            ```
- `GET /reviews/:id`: Get the details of a specific review.
    - **Request**:
        ```http request
       GET /reviews/1
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "productId": 1,
                    "rating": 4,
                    "comment": "Great product"
                }
            }
            ```
- `POST /reviews`: Create a new review.
    - **Request**:
        ```http request
        POST /reviews
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "productId": 1,
            "rating": 4,
            "comment": "Great product"
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Review created successfully",
                "data": {
                    "id": 3,
                    "productId": 1,
                    "rating": 4,
                    "comment": "Great product"
                }
            }
            ```
- `PUT /reviews/:id`: Update the details of a specific review.
    - **Request**:
        ```http request
        PUT /reviews/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "rating": 5,
            "comment": "Excellent product"
        }
        ```
    - **Response**:
        - Status: 20O OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Review created successfully",
                "data": {
                    "id": 1,
                    "productId": 1,
                    "rating": 5,
                    "comment": "Excellent product"
                }
            }
            ```
- `DELETE /reviews/:id`: Delete a specific review.
    - **Request**:
        ```http request
        DELETE /reviews/1
        
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "message": "Review deleted successfully"
            } 
            ```

## Shipping
- `GET /shipping/methods`: Get a list of available shipping methods.
    - **Request**:
        ```http request
        GET /shipping/methods
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "name": "Standard Shipping",
                    "price": 4.99
                }, {
                    "id": 1,
                    "name": "Express Shipping",
                    "price": 9.99
                }]
            }
            ```
- `GET /shipping/methods/:id`: Get the details of a specific shipping method.
    - **Request**:
        ```http request
         GET /shipping/methods/1
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "name": "Standard Shipping",
                    "price": 4.99
                }
            } 
            ```
- `POST /shipping/methods`: Create a new shipping method. (admin-only)
    - **Request**:
        ```http request
        POST /shipping/methods
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "name": "New Shipping",
            "price": 4.99
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Shipping method created successfully",
                "data": {
                    "id": 1,
                    "name": "New Shipping",
                    "price": 4.99
                }
            }
            ```
- `PUT /shipping/methods/:id`: Update the details of a specific shipping method. (admin-only)
    - **Request**:
        ```http request
        PUT /shipping/methods/1
      
        Authoriztion: Bearer <access_token>
        Content-Type: application/json
        
        {
            "name": "Updated Shipping",
            "price": 4.99
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Shipping method updated successfully",
                "data": {
                    "id": 1,
                    "name": "Updated Shipping",
                    "price": 4.99
                }
            } 
            ```
- `DELETE /shipping/methods/:id`: Delete a specific shipping method. (admin-only)****
    - **Request**:
        ```http request
        DELETE /shipping/methods/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
              "status": "success",
              "message": "Shipping method deleted successfully"
            } 
            ```

## Admin
- `GET /admin/dashboard`: Get the dashboard information for the admin.
- `GET /admin/users`: Get a list of all users (admin-only).
- `GET /admin/users/:id`: Get the details of a specific user (admin-only).
- `PUT /admin/users/:id`: Update the details of a specific user (admin-only).
- `DELETE /admin/users/:id`: Delete a specific user (admin-only).


## Wishlist
- `GET /wishlist`: Get the user's wishlist.
    - **Request**:
        ```http request
        GET /wishlist
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "name": "Product 1",
                    "price": 9.99,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }, {
                    "id": 2,
                    "name": "Product 2",
                    "price": 19.99,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }]
            }
            ```
- `POST /wishlist`: Add a product to the user's wishlist.
    - **Request**:
        ```http request
        POST /wishlist
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "productId": 1
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product added to wishlist successfully"
            }
            ```
    - **Error**:
        - Status: 400 BAD REQUEST
        - Body:
            ```json
            {
                "status": "error",
                "message": "Product already in wishlist"
            }
            ```
- `GET /wishlist/:id`: Check if a product is in the user's wishlist.
    - **Request**:
        ```http request
        GET /wishlist/1
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "name": "Product 1",
                    "price": 9.99,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }
            }
            ```
- `DELETE /wishlist/:id`: Remove a product from the user's wishlist.
    - **Request**:
        ```http request
        DELETE /wishlist/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product removed from wishlist successfully"
            }
            ```
- `DELETE /wishlist`: Clear the user's wishlist.
    - **Request**:
        ```http request
        DELETE /wishlist
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Wishlist cleared successfully"
            }
            ```

## Cart
- `GET /cart`: Get the user's shopping cart.
    - **Request**:
        ```http request
        GET /cart
        
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "name": "Product 1",
                    "price": 9.99,
                    "quantity": 1,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }, {
                    "id": 2,
                    "name": "Product 2",
                    "price": 19.99,
                    "quantity": 2,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }]
            }
            ```
- `POST /cart`: Add a product to the user's shopping cart.
    - **Request**:
        ```http request
        POST /cart
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "productId": 1,
            "quantity": 2
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product added to cart successfully"
            } 
            ```
- `PUT /cart/:id`: Update the quantity of a product in the user's shopping cart.
    - **Request**:
        ```http request
        PUT /cart/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "quantity": 2
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "User created successfully",
                "data": {
                    "id": 2,
                    "name": "Product 2",
                    "price": 19.99,
                    "quantity": 2,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }
            } 
            ```
- `DELETE /cart/:id`: Remove a product from the user's shopping cart.
    - **Request**:
        ```http request
        DELETE /cart/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product removed from cart successfully"
            } 
            ```
- `DELETE /cart`: Clear the user's shopping cart.
    - **Request**:
        ```http request
        DELETE /cart
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "message": "Cleared cart successfully"
            } 
            ```

## Coupons
- `GET /coupons`: Get a list of all available coupons. (admin-only)
    - **Request**:
        ```http request
        GET /coupons
        
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "code": "COUPON1",
                    "discount": 10
                }, {
                    "id": 2,
                    "code": "COUPON2",
                    "discount": 20
                }]
            } 
            ```
- `GET /coupons/{code}`: Get the details of a specific coupon.
    - **Request**:
        ```http request
        GET /coupons/COUPON1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "code": "COUPON1",
                    "discount": 10
                }
            }
            ```
- `POST /coupons`: Create a new coupon. (admin-only)
    - **Request**:
        ```http request
        POST /coupons
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "code": "COUPON1",
            "discount": 10
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Coupon created successfully",
                "data": {
                    "id": 1,
                    "code": "COUPON1",
                    "discount": 10
                }
            }
            ```
- `PUT /coupons/{code}`: Update the details of a specific coupon. (admin-only)
    - **Request**:
        ```http request
        PUT /coupons/COUPON1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "discount": 20
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Coupon updated successfully",
                "data": {
                    "id": 1,
                    "code": "COUPON1",
                    "discount": 20
                }
            }
            ```
- `DELETE /coupons/{code}`: Delete a specific coupon. (admin-only)
    - **Request**:
        ```http request
        DELETE /coupons/COUPON1
        
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Coupon deleted successfully"
            }
            ```
          
## Logs
(Admin only)
- `GET /logs`: Get a list of all logs.
    - **Request**:
        ```http request
        GET /logs
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "user_id": 1,
                    "action": "login",
                    "created_at": "2021-01-01 00:00:00"
                }, {
                    "id": 2,
                    "user_id": 1,
                    "action": "logout",
                    "created_at": "2021-01-01 00:00:00"
                }]
            }
            ```
## Common Response
- Status: 401 UNAUTHORIZED
    ```json
    {
        "status": "error",
        "message": "Unauthenticated. Please login"
    }
    ```
- Status: 403 FORBIDDEN
    ```json
    {
        "status": "error",
        "message": "Forbidden"
    }
    ```
- Status: 404 NOT FOUND
    ```json
    {
        "status": "error",
        "message": "Not found"
    }
    ```
- Status: 422 UNPROCESSABLE ENTITY
    ```json
    {
        "status": "error",
        "message": "The given data was invalid.",
        "errors": {
            "email": [
                "The email field is required."
            ],
            "password": [
                "The password field is required."
            ]
        }
    }
    ```
- Status: 500 INTERNAL SERVER ERROR
    ```json
    {
        "status": "error",
        "message": "Internal server error"
    }
    ```
  
## Notes
- All endpoints are prefixed with `/api`.
- All list endpoints are paginated.
- All list endpoints must include filters and/or search.
- All endpoints that require authentication must include the `Authorization` header with the value `Bearer <access_token>`.