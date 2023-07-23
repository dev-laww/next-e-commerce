const orderItems = [
    {
        "id": 1000,
        "order_id": 1000,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 19.99,
        "created_at": "2023-07-22T12:34:56Z",
        "updated_at": "2023-07-22T12:34:56Z"
    },
    {
        "id": 1001,
        "order_id": 1000,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 12.99,
        "created_at": "2023-07-22T14:15:30Z",
        "updated_at": "2023-07-22T14:15:30Z"
    },
    {
        "id": 1002,
        "order_id": 1001,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 3,
        "price": 25.99,
        "created_at": "2023-07-23T08:15:30Z",
        "updated_at": "2023-07-23T08:15:30Z"
    },
    {
        "id": 1003,
        "order_id": 1001,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 2,
        "price": 19.99,
        "created_at": "2023-07-23T10:45:20Z",
        "updated_at": "2023-07-23T10:45:20Z"
    },
    {
        "id": 1004,
        "order_id": 1002,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 12.99,
        "created_at": "2023-07-24T14:05:15Z",
        "updated_at": "2023-07-24T14:05:15Z"
    },
    {
        "id": 1005,
        "order_id": 1002,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 2,
        "price": 29.99,
        "created_at": "2023-07-24T16:30:45Z",
        "updated_at": "2023-07-24T16:30:45Z"
    },
    {
        "id": 1006,
        "order_id": 1003,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-07-25T12:20:30Z",
        "updated_at": "2023-07-25T12:20:30Z"
    },
    {
        "id": 1007,
        "order_id": 1003,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 14.99,
        "created_at": "2023-07-25T14:40:55Z",
        "updated_at": "2023-07-25T14:40:55Z"
    },
    {
        "id": 1008,
        "order_id": 1004,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 12.99,
        "created_at": "2023-07-26T09:15:10Z",
        "updated_at": "2023-07-26T09:15:10Z"
    },
    {
        "id": 1009,
        "order_id": 1004,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 25.99,
        "created_at": "2023-07-26T11:20:25Z",
        "updated_at": "2023-07-26T11:20:25Z"
    },
    {
        "id": 1010,
        "order_id": 1005,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-07-27T16:45:30Z",
        "updated_at": "2023-07-27T16:45:30Z"
    },
    {
        "id": 1011,
        "order_id": 1005,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-07-27T18:30:10Z",
        "updated_at": "2023-07-27T18:30:10Z"
    },
    {
        "id": 1012,
        "order_id": 1006,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-07-28T11:55:45Z",
        "updated_at": "2023-07-28T11:55:45Z"
    },
    {
        "id": 1013,
        "order_id": 1006,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-07-28T13:20:25Z",
        "updated_at": "2023-07-28T13:20:25Z"
    },
    {
        "id": 1014,
        "order_id": 1007,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 19.99,
        "created_at": "2023-07-29T08:10:20Z",
        "updated_at": "2023-07-29T08:10:20Z"
    },
    {
        "id": 1015,
        "order_id": 1007,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 29.99,
        "created_at": "2023-07-29T09:50:45Z",
        "updated_at": "2023-07-29T09:50:45Z"
    },
    {
        "id": 1016,
        "order_id": 1008,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-07-30T14:55:30Z",
        "updated_at": "2023-07-30T14:55:30Z"
    },
    {
        "id": 1017,
        "order_id": 1008,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-07-30T16:20:10Z",
        "updated_at": "2023-07-30T16:20:10Z"
    },
    {
        "id": 1018,
        "order_id": 1009,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-07-31T10:40:15Z",
        "updated_at": "2023-07-31T10:40:15Z"
    },
    {
        "id": 1019,
        "order_id": 1009,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-07-31T12:15:20Z",
        "updated_at": "2023-07-31T12:15:20Z"
    },
    {
        "id": 1020,
        "order_id": 1010,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 12.99,
        "created_at": "2023-08-01T09:20:50Z",
        "updated_at": "2023-08-01T09:20:50Z"
    },
    {
        "id": 1021,
        "order_id": 1010,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 25.99,
        "created_at": "2023-08-01T10:45:15Z",
        "updated_at": "2023-08-01T10:45:15Z"
    },
    {
        "id": 1022,
        "order_id": 1011,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-08-02T16:25:30Z",
        "updated_at": "2023-08-02T16:25:30Z"
    },
    {
        "id": 1023,
        "order_id": 1011,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-08-02T18:00:10Z",
        "updated_at": "2023-08-02T18:00:10Z"
    },
    {
        "id": 1024,
        "order_id": 1012,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-08-03T11:45:45Z",
        "updated_at": "2023-08-03T11:45:45Z"
    },
    {
        "id": 1025,
        "order_id": 1012,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-08-03T13:20:25Z",
        "updated_at": "2023-08-03T13:20:25Z"
    },
    {
        "id": 1026,
        "order_id": 1013,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 19.99,
        "created_at": "2023-08-04T08:10:20Z",
        "updated_at": "2023-08-04T08:10:20Z"
    },
    {
        "id": 1027,
        "order_id": 1013,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 29.99,
        "created_at": "2023-08-04T09:50:45Z",
        "updated_at": "2023-08-04T09:50:45Z"
    },
    {
        "id": 1028,
        "order_id": 1014,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-08-05T14:55:30Z",
        "updated_at": "2023-08-05T14:55:30Z"
    },
    {
        "id": 1029,
        "order_id": 1014,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-08-05T16:20:10Z",
        "updated_at": "2023-08-05T16:20:10Z"
    },
    {
        "id": 1030,
        "order_id": 1015,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-08-06T10:40:15Z",
        "updated_at": "2023-08-06T10:40:15Z"
    },
    {
        "id": 1031,
        "order_id": 1015,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-08-06T12:15:20Z",
        "updated_at": "2023-08-06T12:15:20Z"
    },
    {
        "id": 1032,
        "order_id": 1016,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 12.99,
        "created_at": "2023-08-07T09:20:50Z",
        "updated_at": "2023-08-07T09:20:50Z"
    },
    {
        "id": 1033,
        "order_id": 1016,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 25.99,
        "created_at": "2023-08-07T10:45:15Z",
        "updated_at": "2023-08-07T10:45:15Z"
    },
    {
        "id": 1034,
        "order_id": 1017,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-08-08T16:25:30Z",
        "updated_at": "2023-08-08T16:25:30Z"
    },
    {
        "id": 1035,
        "order_id": 1017,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-08-08T18:00:10Z",
        "updated_at": "2023-08-08T18:00:10Z"
    },
    {
        "id": 1036,
        "order_id": 1018,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-08-09T11:45:45Z",
        "updated_at": "2023-08-09T11:45:45Z"
    },
    {
        "id": 1037,
        "order_id": 1018,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-08-09T13:20:25Z",
        "updated_at": "2023-08-09T13:20:25Z"
    },
    {
        "id": 1038,
        "order_id": 1019,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 19.99,
        "created_at": "2023-08-10T08:10:20Z",
        "updated_at": "2023-08-10T08:10:20Z"
    },
    {
        "id": 1039,
        "order_id": 1019,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 29.99,
        "created_at": "2023-08-10T09:50:45Z",
        "updated_at": "2023-08-10T09:50:45Z"
    },
    {
        "id": 1040,
        "order_id": 1020,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-08-11T14:55:30Z",
        "updated_at": "2023-08-11T14:55:30Z"
    },
    {
        "id": 1041,
        "order_id": 1020,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-08-11T16:20:10Z",
        "updated_at": "2023-08-11T16:20:10Z"
    },
    {
        "id": 1042,
        "order_id": 1021,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-08-12T10:40:15Z",
        "updated_at": "2023-08-12T10:40:15Z"
    },
    {
        "id": 1043,
        "order_id": 1021,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-08-12T12:15:20Z",
        "updated_at": "2023-08-12T12:15:20Z"
    },
    {
        "id": 1044,
        "order_id": 1022,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 12.99,
        "created_at": "2023-08-13T09:20:50Z",
        "updated_at": "2023-08-13T09:20:50Z"
    },
    {
        "id": 1045,
        "order_id": 1022,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 25.99,
        "created_at": "2023-08-13T10:45:15Z",
        "updated_at": "2023-08-13T10:45:15Z"
    },
    {
        "id": 1046,
        "order_id": 1023,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 1,
        "price": 29.99,
        "created_at": "2023-08-14T16:25:30Z",
        "updated_at": "2023-08-14T16:25:30Z"
    },
    {
        "id": 1047,
        "order_id": 1023,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 2,
        "price": 14.99,
        "created_at": "2023-08-14T18:00:10Z",
        "updated_at": "2023-08-14T18:00:10Z"
    },
    {
        "id": 1048,
        "order_id": 1024,
        "product_id": 1001,
        "variant_id": 1001,
        "quantity": 3,
        "price": 19.99,
        "created_at": "2023-08-15T11:45:45Z",
        "updated_at": "2023-08-15T11:45:45Z"
    },
    {
        "id": 1049,
        "order_id": 1024,
        "product_id": 1000,
        "variant_id": 1000,
        "quantity": 1,
        "price": 25.99,
        "created_at": "2023-08-15T13:20:25Z",
        "updated_at": "2023-08-15T13:20:25Z"
    }
]

export default orderItems;
