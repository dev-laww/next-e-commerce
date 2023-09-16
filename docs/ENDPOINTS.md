# API Endpoints

List of all API endpoints.

## Table of Contents

- [Auth](#auth)
- [Account](#account)
- [Profile](#profile)
- [Roles](#roles)
- [Permissions](#permissions)
- [Products](#products)
- [Product Variants](#product-variants)
- [Categories](#categories)
- [Orders](#orders)
- [Shipping](#shipping)
- [Admin](#admin)
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
            "firstName": "John",
            "lastName": "Doe",
            "username": "johndoe",
            "imageUrl": "https://example.com/profile.jpg",
            "email": "johndoe@mail.com",
            "password": "secretpassword",
            "confirmPassword": "secretpassword"
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
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com",
                    "accessToken": "<access_token>",
                    "refreshToken": "<refresh_token>"
                }
            } 
            ```
    - **Error Response**
        - Status: 400 BAD REQUEST
        - Body:
            ```json
            {
              "status": "fail",
              "message": "Email or username already exists"
            }
            ```
- `POST /auth/login`: Login to an existing user account.
    - NOTE: Username can be used instead of email.
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
              "message": "User logged in successfully",
              "data": {
                    "id": "<id>",
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com",
                    "accessToken": "<access_token>",
                    "refreshToken": "<refresh_token>"
              }
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
- `POST /auth/reset-password`: Send a password reset token to the user's email.
    - NOTE: Username can be used instead of email.
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
- `PUT /auth/confirm-reset-password`: Send a password reset token to the user's email.
    - NOTE: Username can be used instead of email.
    - **Request**:
        ```http request
        POST /auth/confirm-reset-password
      
        Content-Type: application/json
    
       {
            "token": "<reset_token>",
            "password": "newpassword",
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
            "email": "johndoe@mail.com",
            "type": "otp" // or "token"
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
- `POST /auth/refresh`: Gets new access token for the user
    - **Request**:
        ```http request
        POST /auth/refresh
      
        Content-Type: application/json
      
        {
            "token": "<refresh_token>"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "accessToken": "<access_token>"
                } 
            }
            ```

## Account

- (admin-only)
- Always include authorization header with access token.
- `GET /accounts`: Get a list of all users.
    - **Request**:
        ```http request
        GET /accounts
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": [{
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com"
                }, {
                    "id": 2,
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "username": "janesmith",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "janesmith@mail.com"
                }]
            }
            ```
- `POST /accounts`: Create a new user.
    - **Request**:
        ```http request
        POST /accounts
      
        Content-Type: application/json
      
        {
            "firstName": "John",
            "lastName": "Doe",
            "username": "johndoe",
            "imageUrl": "https://example.com/profile.jpg",
            "email": "johndoe@mail.com",
            "password": "secretpassword",
            "confirmPassword": "secretpassword"
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
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
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
              "message": "Email or username already exists"
            }
            ```
- `GET /accounts/:id`: Get the details of a specific user.
    - **Request**:
        ```http request
        GET /accounts/1
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com"
                }
            }
            ```
- `DELETE /accounts/:id`: Delete a user
    - **Request**:
        ```http request
        DELETE /accounts/1
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "message": "User deleted successfully"
            }
            ```
- `PUT /accounts/:id`: Update the details of a specific user.
    - **Request**:
        ```http request
        PUT /accounts/1

        Content-Type: application/json
      
        {
            "firstName": "John",
            "lastName": "Doe",
            "username": "johndoe",
            "imageUrl": "https://example.com/profile.jpg",
            "email": "johndoe@mail.com",
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
                    "id": "<id>",
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
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
              "message": "Email or username already exists"
            }
            ```
- `GET /accounts/:id/roles`: Get the list user's roles
    - **Request**:
        ```http request
        GET /accounts/:id/roles
        
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
                    "name": "Admin",
                    "description": "Admin role"
                }, {
                    "id": 2,
                    "name": "User",
                    "description": "User role"
                }]
            }
            ```
- `PUT /accounts/:id/roles`: Updates user roles
    - **Request**:
        ```http request
        PUT /accounts/:id/roles
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "roles": [1, 2]
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "User roles updated successfully",
                "data": [{
                    "id": 1,
                    "name": "Admin",
                    "description": "Admin role"
                }, {
                    "id": 2,
                    "name": "User",
                    "description": "User role"
                }]
            }
            ```
- NOTE: Provide endpoints for the following. See equivalent endpoints on their respective sections.
    - **Payment Methods**
        - `GET /accounts/:id/payment-methods`: Get a list of all payment methods for a specific user.
        - `GET /accounts/:id/payment-methods/:paymentMethodId`: Get a specific payment method for a specific user.
    - **Addresses**
        - `GET /accounts/:id/addresses`: Get a list of all addresses for a specific user.
        - `GET /accounts/:id/addresses/:addressId`: Get a specific address for a specific user.
    - **Orders**
        - `GET /accounts/:id/orders`:  Get a list of all orders for a specific user.
        - `GET /accounts/:id/orders/:orderId`: Get a specific order for a specific user.
    - **Wishlist**
        - `GET /accounts/:id/wishlist`: Get a list of all wishlist items for a specific user.
        - `GET /accounts/:id/wishlist/:wishlistItemId`: Get a specific wishlist item for a specific user.
    - **Cart**
        - `GET /accounts/:id/cart`: Get a list of all cart items for a specific user.
        - `GET /accounts/:id/cart/:cartItemId`: Get a specific cart item for a specific user.
    - **Reviews**
        - `GET /accounts/:id/reviews`: Get a list of all reviews for a specific user.
        - `GET /accounts/:id/reviews/:reviewId`: Get a specific review for a specific user.
  - **Payments**
      - `GET /accounts/:id/payments`: Get a list of all reviews for a specific user.
      - `GET /accounts/:id/payments/:paymentId`: Get a specific review for a specific user.

## Profile

- `GET /profile`: Get the user's profile information.
    - **Request**:
        ```http request
        GET /profile
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com"
                }
            } 
            ```
- `PUT /profile`: Update the user's profile information.
    - **Request**:
        ```http request
        PUT /profile
      
        Authorization: Bearer <access_token>
        Content-Type: application/json

        {
            "firstName": "John",
            "lastName": "Doe",
            "username": "johndoe",
            "imageUrl": "https://example.com/profile.jpg",
            "email": "johndoe@mail.com"
            "password": "secretpassword"
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
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "username": "johndoe",
                    "imageUrl": "https://example.com/profile.jpg",
                    "email": "johndoe@mail.com"
                }
            } 
            ```
- `PUT /profile/change-email`: Change the user's email address.
    - **Request**:
        ```http request
        PUT /profile/change-email
      
        Authorization: Bearer <access_token>
        Content-Type: application/json

        {
            "email": "test@mail.com",
            "password": "currentpassword"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Email changed successfully"
            }
            ```
- `PUT /profile/change-username`: Change the user's username.
    - **Request**:
        ```http request
        PUT /profile/change-username
      
        Authorization: Bearer <access_token>
        Content-Type: application/json

        {
            "username": "username",
            "password": "currentpassword"
        }
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Username changed successfully"
            }
          ```
- `PUT /profile/change-password`: Change the user's password.
    - **Request**:
        ```http request
        PUT /profile/change-password
      
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
- `GET /profile/address`: Get a list of all addresses for the current user.
    - **Request**
        ```http request
        GET /profile/address
        
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
- `DELETE /profile/address`: Delete all address
    - **Request**:
       ```http request
       DELETE /profile/address
     
       Authorization: Bearer <access_token>
       ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Addresses deleted successfully"
            } 
            ```
- `POST /profile/address`: Create new address
    - **Request**
        ```http request
        POST /profile/address
        
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
- `GET /profile/address/:id`: Get the details of a specific address.
    - **Request**
         ```http request
         GET /profile/address/1
         
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
- `PUT /profile/address/:id`: Update an existing address
    - **Request**
        ```http request
        PUT /profile/address/1
        
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
- `DELETE /profile/address/:id`: Delete a specific address.
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
- `GET /profile/payment-methods`: Get a list of current user's payment methods.
    - **Request**:
        ```http request
        GET /profile/payment-methods
      
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
- `GET /profile/payment-methods/:id`: Get the details of a specific payment method. (admin-only)
    - **Request**:
        ```http request
        GET /profile/payment-methods/1
      
        Authorization: Bearer <access_token>
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
- `POST /profile/payment-methods`: Create a new payment method
    - **Request**:
        ```http request
        POST /profile/payment-methods
      
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
- `PUT /profile/payment-methods/:id`: Update the details of a specific product.
    - **Request**:
        ```http request
        PUT /profile/payment-methods/1
      
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
- `DELETE /profile/payment-methods/:id`: Delete a specific product.
    - **Request**:
        ```http request
        DELETE /profile/payment-methods/1
      
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
- `GET /profile/orders`: Get a list of all orders.
    - **Request**:
        ```http request
        GET /profile/orders
      
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
                    "shipping_address_id": 1,
                    "shipping_method_id": 1,
                    "total_amount": 99.99,
                    "status": "Processing"
                }, {
                    "id": 2,
                    "order_number": "ORD-002",
                    "payment_id": 2,
                    "shipping_address_id": 2,
                    "shipping_method_id": 2,
                    "total_amount": 79.99,
                    "status": "Delivered"
                }]
            }
            ```
- `GET /profile/orders/:id`: Get the details of a specific order.
    - **Request**:
        ```http request
        GET /profile/orders/1
      
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
                    "shipping_address_id": 1,
                    "shipping_method_id": 1,
                    "total_amount": 99.99,
                    "status": "Processing"
                }
            } 
            ```
- `PUT /profile/orders/:id/cancel`: Cancel a specific order.
    - **Request**:
        ```http request
        PUT /profile/orders/1/cancel
      
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
                    "shipping_address_id": 1,
                    "shipping_method_id": 1,
                    "total_amount": 89.99,
                    "status": "Cancelled"
                }
            }
            ```
- `GET /profile/wishlist`: Get the user's wishlist.
    - **Request**:
        ```http request
        GET /profile/wishlist
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
- `POST /profile/wishlist`: Add a product to the user's wishlist.
    - **Request**:
        ```http request
        POST /profile/wishlist
        
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
- `GET /profile/wishlist/:id`: Check if a product is in the user's wishlist.
    - **Request**:
        ```http request
        GET /profile/wishlist/1
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
- `DELETE /profile/wishlist/:id`: Remove a product from the user's wishlist.
    - **Request**:
        ```http request
        DELETE /profile/wishlist/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product removed from wishlist successfully"
            }
            ```
- `DELETE /profile/wishlist`: Clear the user's wishlist.
    - **Request**:
        ```http request
        DELETE /profile/wishlist
      
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Wishlist cleared successfully"
            }
            ```
- `PUT /profile/wishlist/:id/move-to-cart`: Move a product from the user's wishlist to cart.
    - **Request**:
        ```http request
        PUT /profile/wishlist/1/move-to-cart
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "variantId": 1,
            "quantity": 1
        }
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Product moved to cart"
            }
            ```

- `GET /profile/cart`: Get the user's shopping cart.
    - **Request**:
        ```http request
        GET /profile/cart
        
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
                    "variantId": 1,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }, {
                    "id": 2,
                    "name": "Product 2",
                    "price": 19.99,
                    "quantity": 2,
                    "variantId": 2,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }]
            }
            ```
- `GET /profile/cart/:id`: Get the user's shopping cart.
    - **Request**:
        ```http request
        GET /profile/cart/1
        
        Authorization: Bearer <access_token>
        ```
    - **Response**:
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "name": "Product 1",
                    "price": 9.99,
                    "quantity": 1,
                    "description": "Lorem ipsum dolor sit amet",
                    "image": "https://via.placeholder.com/150"
                }
            }
            ```
- `PUT /profile/cart/:id`: Update the quantity of a product in the user's shopping cart.
    - **Request**:
        ```http request
        PUT /profile/cart/1
      
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
- `DELETE /profile/cart/:id`: Remove a product from the user's shopping cart.
    - **Request**:
        ```http request
        DELETE /profile/cart/1
      
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
- `DELETE /profile/cart`: Clear the user's shopping cart.
    - **Request**:
        ```http request
        DELETE /profile/cart
      
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
- `POST /profile/cart/checkout`: Checkout the user's shopping cart.
    - **Request**
        ```http request
        POST /profile/cart/checkout
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "items": [1, 2, 3], // cart item ids to checkout (optional)
            "shippingMethodId": 1,
            "paymentMethodId": 1,
            "couponCode": "COUPON1"
        }
        ```
- `GET /profile/reviews`: Get a list of all reviews. (admin-only)
    - **Request**:
        ```http request
        GET /profile/reviews
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
                    "productId": 1,
                    "variantId": 1,
                    "rating": 4,
                    "comment": "Great product"
                }, {
                    "id": 2,
                    "userId": 1,
                    "productId": 2,
                    "variantId": 2,
                    "rating": 5,
                    "comment": "Excellent product"
                }]
            }
            ```
- `GET /profile/reviews/:id`: Get the details of a specific review.
    - **Request**:
        ```http request
       GET /profile/reviews/1
        ```
    - **Response**:
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "data": {
                    "id": 1,
                    "userId": 1,
                    "productId": 1,
                    "variantId": 1,
                    "rating": 4,
                    "comment": "Great product"
                }
            }
            ```
- `DELETE /profile/reviews/:id`: Delete a specific review.
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

- `GET /profile/payments`: Get a list of all payments.
    - **Request**:
        ```http request
        GET /profile/payments
      
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
- `GET /profile/payments/:id`: Get the details of a specific payment.
    - **Request**:
        ```http request
        GET /profile/payments/1
      
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

## Roles

- `GET /roles`: Get a list of all roles. (admin-only)
    - **Request**
        ```http request
        GET /roles
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
              "status": "success",
              "data": [{
                "id": 1,
                "name": "Admin",
                "description": "Admin role"
              }, {
                "id": 2,
                "name": "User",
                "description": "User role"
              }]
            }
            ```
- `GET /roles/:id`: Get the details of a specific role. (admin-only)
    - **Request**
        ```http request
        GET /roles/1
        
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
                    "name": "Admin",
                    "description": "Admin role"
                }
            }
            ```
- `POST /roles`: Create a new role. (admin-only)
    - **Request**
        ```http request
        POST /roles
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "New Role",
            "description": "New role description"
        }
        ```
    - **Response**
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Role created successfully",
                "data": {
                    "id": "<id>",
                    "name": "New Role",
                    "description": "New role description"
                }
            }
            ```
- `PUT /roles/:id`: Update an existing role. (admin-only)
    - **Request**
        ```http request
        PUT /roles/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "Updated Role",
            "description": "Updated role description"
        }
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Role updated successfully",
                "data": {
                    "id": 1,
                    "name": "Updated Role",
                    "description": "Updated role description"
                }
            }
            ```
- `DELETE /roles/:id`: Delete an existing role. (admin-only)
    - **Request**
        ```http request
        DELETE /roles/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Role deleted successfully"
            }
            ```
- NOTE: Provide endpoints for the following. See equivalent endpoints on their respective sections.
    - **Permissions**
        - Format: `REQ /roles/:id/permissions`
            - `GET`: Get a list of all permissions for a specific role.
        - Format: `REQ /roles/:id/permissions/:id`
            - `POST`: Link a specific permission to a specific role.
            - `DELETE`: Unlink a specific permission from a specific role.
    - **Users**
        - Format: `REQ /roles/:id/users`
            - `GET`: Get a list of all users for a specific role.
        - Format: `REQ /roles/:id/users/:id`
            - `POST`: Link a specific user to a specific role.
            - `DELETE`: Unlink a specific user from a specific role.

## Permissions

- `GET /permissions`: Get list of all permissions (admin-only)
    - **Request**
        ```http request
        GET /permissions
        
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
                    "name": "CLIENT_VIEW_ACCOUNTS",
                    "description": "View accounts"
                }, {
                    "id": 2,
                    "name": "CLIENT_CREATE_ACCOUNTS",
                    "description": "Create accounts"
                }]
            }
            ```
- `GET /permissions/:id`: Get details of specific permission. (admin-only)
    - **Request**
        ```http request
        GET /permissions/1
      
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
                "name": "CLIENT_VIEW_ACCOUNTS",
                "description": "View accounts"
              }
            }
            ```
- `POST /permissions`: Create a new permission. (admin-only)
    - **Request**
        ```http request
        POST /permissions
        
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "New Permission",
            "description": "New permission description"
        }
        ```
    - **Response**
        - Status: 201 CREATED
        - Body:
            ```json
            {
                "status": "success",
                "message": "Permission created successfully",
                "data": {
                    "id": "<id>",
                    "name": "CLIENT_VIEW_ACCOUNTS",
                    "description": "View accounts"
                }
            }
            ```
- `PUT /permissions/:id`: Update an existing permission (admin-only)
    - **Request**
        ```http request
        PUT /permissions/1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
      
        {
            "name": "Updated Permission",
            "description": "Updated permission description"
        }
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Permission updated successfully",
                "data": {
                    "id": 1,
                    "name": "Updated Permission",
                    "description": "Updated permission description"
                }
            }
            ```
- `DELETE /permissions/:id`: Delete an existing permission (admin-only)
    - **Request**
        ```http request
        DELETE /permissions/1
      
        Authorization: Bearer <access_token>
        ```
    - **Response**
        - Status: 200 OK
        - Body:
            ```json
            {
                "status": "success",
                "message": "Permission deleted successfully"
            }
            ```
- NOTE: Provide endpoints for the following. See equivalent endpoints on their respective sections.
    - **Roles**
        - Format: `REQ /permissions/:id/roles`
            - `GET`: Get a list of all roles for a specific permission.
        - Format: `REQ /permissions/:id/roles/:id`
            - `POST`: Link a specific role to a specific permission.
            - `DELETE`: Unlink a specific role from a specific permission.

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
- NOTE: Provide endpoints for the following. See equivalent endpoints on their respective sections.
    - **Variants**
        - Format: `REQ /products/:id/variants`
            - `GET`: Get a list of all variants for a specific product.
            - `POST`: Create a new variant for a specific product.
            - `DELETE`: Delete all variant for a specific product.
        - Format: `REQ /products/:id/variants/:id`
            - `PUT`: Update a specific variant for a specific product.
            - `DELETE`: Delete a specific variant for a specific product.
    - **Categories**
        - Format: `REQ /products/:id/categories`
            - `GET`: Get a list of all categories for a specific product.
        - Format: `REQ /products/:id/categories/:id`
            - `POST`: Link a specific category to a specific product.
            - `DELETE`: Unlink a specific category from a specific product.
    - **Reviews**
        - Format: `REQ /products/:id/reviews`
            - `GET`: Get a list of all reviews for a specific product.
            - `POST`: Create a new review for a specific product.
            - `DELETE`: Delete all reviews for a specific product.
        - Format: `REQ /products/:id/reviews/:id`
            - `PUT`: Update a specific review for a specific product.
            - `DELETE`: Delete a specific review for a specific product.

## Product Variants

- `GET /variants`: Get a list of all variants. (admin-only)
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
                    "productId": 2,
                    "quantity": 10,
                    "sold": 0
                }]
            } 
            ```
- `GET variants/:id`: Get the details of a specific variant.
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
- NOTE: Provide endpoints for the following. See equivalent endpoints on their respective sections.
    - **Reviews**
        - Format: `REQ /variants/:id/reviews`
            - `GET`: Get a list of all reviews for a specific variant.
            - `POST`: Create a new review for a specific variant.
            - `DELETE`: Delete all reviews for a specific variant.
        - Format: `REQ /variants/:id/reviews/:id`
            - `PUT`: Update a specific review for a specific variant.
            - `DELETE`: Delete a specific review for a specific variant.

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

- `GET /orders`: Get a list of all orders. (admin-only)
    - **Request**:
        ```http request
        GET /orders
      
        Auhtorization: Bearer <access_token>
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
                "shippingMethodId": 1,
                "paymentMethodId": 1,
                "couponId": 1,
                "status": "Pending",
                "total": 99.99
              }, {
                "id": 2,
                "userId": 1,
                "shippingMethodId": 1,
                "paymentMethodId": 1,
                "couponId": 1,
                "status": "Pending",
                "total": 99.99
              }]
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

## Shipping

- `GET /shipping-methods`: Get a list of available shipping methods.
    - **Request**:
        ```http request
        GET /shipping-methods
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
- `GET /shipping-methods/:id`: Get the details of a specific shipping method.
    - **Request**:
        ```http request
         GET /shipping-methods/1
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
- `POST /shipping-methods`: Create a new shipping method. (admin-only)
    - **Request**:
        ```http request
        POST /shipping-methods
      
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
- `PUT /shipping-methods/:id`: Update the details of a specific shipping method. (admin-only)
    - **Request**:
        ```http request
        PUT /shipping-methods/1
      
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
- `DELETE /shipping-methods/:id`: Delete a specific shipping method. (admin-only)****
    - **Request**:
        ```http request
        DELETE /shipping-methods/1
      
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

- `GET /admin/statistics`: TODO

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
                    "type": "percentage",
                    "expired_at": "2021-01-01 00:00:00",
                    "discount": 10
                }, {
                    "id": 2,
                    "code": "COUPON2",
                    "type": "percentage",
                    "expired_at": "2021-01-01 00:00:00",
                    "discount": 20
                }]
            } 
            ```
- `GET /coupons/:code`: Get the details of a specific coupon.
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
                    "type": "percentage",
                    "expired_at": "2021-01-01 00:00:00",
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
            "expired_at": "2021-01-01 00:00:00",
            "type": "percentage",
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
                    "type": "percentage",
                    "expired_at": "2021-01-01 00:00:00",
                    "discount": 10
                }
            }
            ```
- `PUT /coupons/:code`: Update the details of a specific coupon. (admin-only)
    - **Request**:
        ```http request
        PUT /coupons/COUPON1
      
        Authorization: Bearer <access_token>
        Content-Type: application/json
        
        {
            "expired_at": "2021-01-01 00:00:00",
            "type": "percentage",
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
                    "type": "percentage",
                    "expired_at": "2021-01-01 00:00:00",
                    "discount": 20
                }
            }
            ```
- `DELETE /coupons/:code`: Delete a specific coupon. (admin-only)
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
                    "message": "User logged in with email: <email>",
                    "level": "info",
                    "created_at": "2021-01-01 00:00:00"
                }, {
                    "id": 2,     
                    "message": "User logged out with email: <email>",
                    "level": "info",
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

- May be edited as needed.
- All endpoints are prefixed with `/api`.
- All list endpoints are paginated.
- All list endpoints must include filters and/or search.
- All endpoints that require authentication must include the `Authorization` header with the
  value `Bearer <access_token>`.