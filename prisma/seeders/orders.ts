const orders = [
    {
        "id": 1000,
        "user_id": 1000,
        "shipping_id": 1000,
        "address_id": 1000,
        "order_number": "ORD1000",
        "status": "PROCESSING",
        "total": 59.99,
        "created_at": "2023-07-22T12:34:56Z",
        "updated_at": "2023-07-22T12:34:56Z"
    },
    {
        "id": 1001,
        "user_id": 1001,
        "shipping_id": 1000,
        "address_id": 1001,
        "order_number": "ORD1001",
        "status": "SHIPPED",
        "total": 34.99,
        "created_at": "2023-07-23T08:15:30Z",
        "updated_at": "2023-07-23T08:15:30Z"
    },
    {
        "id": 1002,
        "user_id": 1002,
        "shipping_id": 1000,
        "address_id": 1002,
        "order_number": "ORD1002",
        "status": "PROCESSING",
        "total": 49.99,
        "created_at": "2023-07-24T15:45:20Z",
        "updated_at": "2023-07-24T15:45:20Z"
    },
    {
        "id": 1003,
        "user_id": 1003,
        "shipping_id": 1000,
        "address_id": 1003,
        "order_number": "ORD1003",
        "status": "DELIVERED",
        "total": 74.99,
        "created_at": "2023-07-25T11:22:18Z",
        "updated_at": "2023-07-25T11:22:18Z"
    },
    {
        "id": 1004,
        "user_id": 1004,
        "shipping_id": 1000,
        "address_id": 1004,
        "order_number": "ORD1004",
        "status": "PROCESSING",
        "total": 62.99,
        "created_at": "2023-07-26T14:09:45Z",
        "updated_at": "2023-07-26T14:09:45Z"
    },
    {
        "id": 1005,
        "user_id": 1005,
        "shipping_id": 1000,
        "address_id": 1005,
        "order_number": "ORD1005",
        "status": "SHIPPED",
        "total": 45.99,
        "created_at": "2023-07-27T09:33:55Z",
        "updated_at": "2023-07-27T09:33:55Z"
    },
    {
        "id": 1006,
        "user_id": 1006,
        "shipping_id": 1000,
        "address_id": 1006,
        "order_number": "ORD1006",
        "status": "PROCESSING",
        "total": 55.99,
        "created_at": "2023-07-28T16:27:12Z",
        "updated_at": "2023-07-28T16:27:12Z"
    },
    {
        "id": 1007,
        "user_id": 1007,
        "shipping_id": 1000,
        "address_id": 1007,
        "order_number": "ORD1007",
        "status": "DELIVERED",
        "total": 29.99,
        "created_at": "2023-07-29T10:18:39Z",
        "updated_at": "2023-07-29T10:18:39Z"
    },
    {
        "id": 1008,
        "user_id": 1008,
        "shipping_id": 1000,
        "address_id": 1008,
        "order_number": "ORD1008",
        "status": "PROCESSING",
        "total": 67.99,
        "created_at": "2023-07-30T13:54:21Z",
        "updated_at": "2023-07-30T13:54:21Z"
    },
    {
        "id": 1009,
        "user_id": 1009,
        "shipping_id": 1000,
        "address_id": 1009,
        "order_number": "ORD1009",
        "status": "SHIPPED",
        "total": 39.99,
        "created_at": "2023-07-31T08:40:05Z",
        "updated_at": "2023-07-31T08:40:05Z"
    },
    {
        "id": 1010,
        "user_id": 1010,
        "shipping_id": 1000,
        "address_id": 1010,
        "order_number": "ORD1010",
        "status": "PROCESSING",
        "total": 52.99,
        "created_at": "2023-08-01T15:14:29Z",
        "updated_at": "2023-08-01T15:14:29Z"
    },
    {
        "id": 1011,
        "user_id": 1011,
        "shipping_id": 1000,
        "address_id": 1011,
        "order_number": "ORD1011",
        "status": "DELIVERED",
        "total": 79.99,
        "created_at": "2023-08-02T11:09:07Z",
        "updated_at": "2023-08-02T11:09:07Z"
    },
    {
        "id": 1012,
        "user_id": 1012,
        "shipping_id": 1000,
        "address_id": 1012,
        "order_number": "ORD1012",
        "status": "PROCESSING",
        "total": 61.99,
        "created_at": "2023-08-03T14:38:56Z",
        "updated_at": "2023-08-03T14:38:56Z"
    },
    {
        "id": 1013,
        "user_id": 1013,
        "shipping_id": 1000,
        "address_id": 1013,
        "order_number": "ORD1013",
        "status": "SHIPPED",
        "total": 42.99,
        "created_at": "2023-08-04T09:57:44Z",
        "updated_at": "2023-08-04T09:57:44Z"
    },
    {
        "id": 1014,
        "user_id": 1014,
        "shipping_id": 1000,
        "address_id": 1014,
        "order_number": "ORD1014",
        "status": "PROCESSING",
        "total": 58.99,
        "created_at": "2023-08-05T17:05:32Z",
        "updated_at": "2023-08-05T17:05:32Z"
    },
    {
        "id": 1015,
        "user_id": 1015,
        "shipping_id": 1000,
        "address_id": 1015,
        "order_number": "ORD1015",
        "status": "DELIVERED",
        "total": 37.99,
        "created_at": "2023-08-06T11:38:09Z",
        "updated_at": "2023-08-06T11:38:09Z"
    },
    {
        "id": 1016,
        "user_id": 1016,
        "shipping_id": 1000,
        "address_id": 1016,
        "order_number": "ORD1016",
        "status": "PROCESSING",
        "total": 53.99,
        "created_at": "2023-08-07T16:09:57Z",
        "updated_at": "2023-08-07T16:09:57Z"
    },
    {
        "id": 1017,
        "user_id": 1017,
        "shipping_id": 1000,
        "address_id": 1017,
        "order_number": "ORD1017",
        "status": "SHIPPED",
        "total": 48.99,
        "created_at": "2023-08-08T10:50:36Z",
        "updated_at": "2023-08-08T10:50:36Z"
    },
    {
        "id": 1018,
        "user_id": 1018,
        "shipping_id": 1000,
        "address_id": 1018,
        "order_number": "ORD1018",
        "status": "PROCESSING",
        "total": 68.99,
        "created_at": "2023-08-09T15:28:12Z",
        "updated_at": "2023-08-09T15:28:12Z"
    },
    {
        "id": 1019,
        "user_id": 1019,
        "shipping_id": 1000,
        "address_id": 1019,
        "order_number": "ORD1019",
        "status": "DELIVERED",
        "total": 40.99,
        "created_at": "2023-08-10T09:17:49Z",
        "updated_at": "2023-08-10T09:17:49Z"
    },
    {
        "id": 1020,
        "user_id": 1020,
        "shipping_id": 1000,
        "address_id": 1020,
        "order_number": "ORD1020",
        "status": "PROCESSING",
        "total": 57.99,
        "created_at": "2023-08-11T17:33:25Z",
        "updated_at": "2023-08-11T17:33:25Z"
    },
    {
        "id": 1021,
        "user_id": 1021,
        "shipping_id": 1000,
        "address_id": 1021,
        "order_number": "ORD1021",
        "status": "SHIPPED",
        "total": 32.99,
        "created_at": "2023-08-12T11:45:02Z",
        "updated_at": "2023-08-12T11:45:02Z"
    },
    {
        "id": 1022,
        "user_id": 1022,
        "shipping_id": 1000,
        "address_id": 1022,
        "order_number": "ORD1022",
        "status": "PROCESSING",
        "total": 64.99,
        "created_at": "2023-08-13T14:55:41Z",
        "updated_at": "2023-08-13T14:55:41Z"
    },
    {
        "id": 1023,
        "user_id": 1023,
        "shipping_id": 1000,
        "address_id": 1023,
        "order_number": "ORD1023",
        "status": "DELIVERED",
        "total": 35.99,
        "created_at": "2023-08-14T09:22:18Z",
        "updated_at": "2023-08-14T09:22:18Z"
    },
    {
        "id": 1024,
        "user_id": 1024,
        "shipping_id": 1000,
        "address_id": 1024,
        "order_number": "ORD1024",
        "status": "PROCESSING",
        "total": 61.99,
        "created_at": "2023-08-15T16:49:55Z",
        "updated_at": "2023-08-15T16:49:55Z"
    }
]

export default orders;
