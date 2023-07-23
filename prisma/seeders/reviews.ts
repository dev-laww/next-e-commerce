const reviews = [
    {
        "id": 1000,
        "user_id": 1000,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Nice product, I recommend it!",
        "created_at": "2023-07-23T09:10:15Z",
        "updated_at": "2023-07-23T09:10:15Z"
    },
    {
        "id": 1001,
        "user_id": 1000,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's okay, could have been better.",
        "created_at": "2023-07-24T11:20:30Z",
        "updated_at": "2023-07-24T11:20:30Z"
    },
    {
        "id": 1002,
        "user_id": 1000,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product, exceeded my expectations!",
        "created_at": "2023-07-25T13:45:40Z",
        "updated_at": "2023-07-25T13:45:40Z"
    },
    {
        "id": 1003,
        "user_id": 1000,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 2,
        "comment": "Not satisfied with the quality.",
        "created_at": "2023-07-26T15:55:50Z",
        "updated_at": "2023-07-26T15:55:50Z"
    },
    {
        "id": 1004,
        "user_id": 1001,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "This is a great product!",
        "created_at": "2023-07-27T10:05:20Z",
        "updated_at": "2023-07-27T10:05:20Z"
    },
    {
        "id": 1005,
        "user_id": 1001,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product but could be better.",
        "created_at": "2023-07-28T12:15:30Z",
        "updated_at": "2023-07-28T12:15:30Z"
    },
    {
        "id": 1006,
        "user_id": 1001,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Average product, not too impressed.",
        "created_at": "2023-07-29T14:25:40Z",
        "updated_at": "2023-07-29T14:25:40Z"
    },
    {
        "id": 1007,
        "user_id": 1001,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 2,
        "comment": "Could have been better.",
        "created_at": "2023-07-30T16:35:50Z",
        "updated_at": "2023-07-30T16:35:50Z"
    },
    {
        "id": 1008,
        "user_id": 1002,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "The product is good, but the delivery was slow.",
        "created_at": "2023-07-31T09:50:20Z",
        "updated_at": "2023-07-31T09:50:20Z"
    },
    {
        "id": 1009,
        "user_id": 1002,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Great quality and value for money!",
        "created_at": "2023-08-01T11:15:30Z",
        "updated_at": "2023-08-01T11:15:30Z"
    },
    {
        "id": 1010,
        "user_id": 1002,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It was okay, but I expected more.",
        "created_at": "2023-08-02T13:25:40Z",
        "updated_at": "2023-08-02T13:25:40Z"
    },
    {
        "id": 1011,
        "user_id": 1002,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product, but the packaging could be improved.",
        "created_at": "2023-08-03T15:30:50Z",
        "updated_at": "2023-08-03T15:30:50Z"
    },
    {
        "id": 1012,
        "user_id": 1003,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Totally worth it! I love it!",
        "created_at": "2023-08-04T09:40:20Z",
        "updated_at": "2023-08-04T09:40:20Z"
    },
    {
        "id": 1013,
        "user_id": 1003,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "The product is decent, nothing special.",
        "created_at": "2023-08-05T11:55:30Z",
        "updated_at": "2023-08-05T11:55:30Z"
    },
    {
        "id": 1014,
        "user_id": 1003,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "I'm mostly satisfied, but there were a few issues.",
        "created_at": "2023-08-06T14:10:40Z",
        "updated_at": "2023-08-06T14:10:40Z"
    },
    {
        "id": 1015,
        "user_id": 1003,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Amazing product! Can't recommend it enough!",
        "created_at": "2023-08-07T16:25:50Z",
        "updated_at": "2023-08-07T16:25:50Z"
    },
    {
        "id": 1016,
        "user_id": 1004,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase!",
        "created_at": "2023-08-08T09:15:20Z",
        "updated_at": "2023-08-08T09:15:20Z"
    },
    {
        "id": 1017,
        "user_id": 1004,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! Will buy from this seller again!",
        "created_at": "2023-08-09T11:30:30Z",
        "updated_at": "2023-08-09T11:30:30Z"
    },
    {
        "id": 1018,
        "user_id": 1004,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but not exceptional either.",
        "created_at": "2023-08-10T13:45:40Z",
        "updated_at": "2023-08-10T13:45:40Z"
    },
    {
        "id": 1019,
        "user_id": 1004,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good! But I had some minor issues.",
        "created_at": "2023-08-11T15:55:50Z",
        "updated_at": "2023-08-11T15:55:50Z"
    },
    {
        "id": 1020,
        "user_id": 1005,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Absolutely fantastic! I'm thrilled with my purchase!",
        "created_at": "2023-08-12T09:05:20Z",
        "updated_at": "2023-08-12T09:05:20Z"
    },
    {
        "id": 1021,
        "user_id": 1005,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very good product. I highly recommend it.",
        "created_at": "2023-08-13T11:15:30Z",
        "updated_at": "2023-08-13T11:15:30Z"
    },
    {
        "id": 1022,
        "user_id": 1005,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but not the best.",
        "created_at": "2023-08-14T13:25:40Z",
        "updated_at": "2023-08-14T13:25:40Z"
    },
    {
        "id": 1023,
        "user_id": 1005,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm loving it! The product exceeded my expectations.",
        "created_at": "2023-08-15T15:30:50Z",
        "updated_at": "2023-08-15T15:30:50Z"
    },
    {
        "id": 1024,
        "user_id": 1006,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "The product is good. I have no major complaints.",
        "created_at": "2023-08-16T09:40:20Z",
        "updated_at": "2023-08-16T09:40:20Z"
    },
    {
        "id": 1025,
        "user_id": 1006,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Extremely satisfied! The product arrived on time and in perfect condition.",
        "created_at": "2023-08-17T11:55:30Z",
        "updated_at": "2023-08-17T11:55:30Z"
    },
    {
        "id": 1026,
        "user_id": 1006,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's okay, but I expected more features.",
        "created_at": "2023-08-18T14:10:40Z",
        "updated_at": "2023-08-18T14:10:40Z"
    },
    {
        "id": 1027,
        "user_id": 1006,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Overall a good product for the price.",
        "created_at": "2023-08-19T16:25:50Z",
        "updated_at": "2023-08-19T16:25:50Z"
    },
    {
        "id": 1028,
        "user_id": 1007,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Fantastic product! I'm very happy with my purchase.",
        "created_at": "2023-08-20T09:15:20Z",
        "updated_at": "2023-08-20T09:15:20Z"
    },
    {
        "id": 1029,
        "user_id": 1007,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good, but it could be improved.",
        "created_at": "2023-08-21T11:30:30Z",
        "updated_at": "2023-08-21T11:30:30Z"
    },
    {
        "id": 1030,
        "user_id": 1007,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "The product is decent, but not exceptional.",
        "created_at": "2023-08-22T13:45:40Z",
        "updated_at": "2023-08-22T13:45:40Z"
    },
    {
        "id": 1031,
        "user_id": 1007,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Amazing product! It met all my expectations.",
        "created_at": "2023-08-23T15:55:50Z",
        "updated_at": "2023-08-23T15:55:50Z"
    },
    {
        "id": 1032,
        "user_id": 1008,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "I would recommend this product to others.",
        "created_at": "2023-08-24T09:05:20Z",
        "updated_at": "2023-08-24T09:05:20Z"
    },
    {
        "id": 1033,
        "user_id": 1008,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product and fast delivery!",
        "created_at": "2023-08-25T11:15:30Z",
        "updated_at": "2023-08-25T11:15:30Z"
    },
    {
        "id": 1034,
        "user_id": 1008,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's okay, but I had some issues with it.",
        "created_at": "2023-08-26T13:25:40Z",
        "updated_at": "2023-08-26T13:25:40Z"
    },
    {
        "id": 1035,
        "user_id": 1008,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Overall a good product. It served its purpose.",
        "created_at": "2023-08-27T15:30:50Z",
        "updated_at": "2023-08-27T15:30:50Z"
    },
    {
        "id": 1036,
        "user_id": 1009,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm in love with this product! Highly recommended!",
        "created_at": "2023-08-28T09:40:20Z",
        "updated_at": "2023-08-28T09:40:20Z"
    },
    {
        "id": 1037,
        "user_id": 1009,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good! The product lived up to its description.",
        "created_at": "2023-08-29T11:55:30Z",
        "updated_at": "2023-08-29T11:55:30Z"
    },
    {
        "id": 1038,
        "user_id": 1009,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "The product is decent, but it has some downsides.",
        "created_at": "2023-08-30T14:10:40Z",
        "updated_at": "2023-08-30T14:10:40Z"
    },
    {
        "id": 1039,
        "user_id": 1009,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Superb product! I'm completely satisfied!",
        "created_at": "2023-08-31T16:25:50Z",
        "updated_at": "2023-08-31T16:25:50Z"
    },
    {
        "id": 1040,
        "user_id": 1010,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "The product is good, but it could use some improvements.",
        "created_at": "2023-09-01T09:15:20Z",
        "updated_at": "2023-09-01T09:15:20Z"
    },
    {
        "id": 1041,
        "user_id": 1010,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! It exceeded my expectations.",
        "created_at": "2023-09-02T11:30:30Z",
        "updated_at": "2023-09-02T11:30:30Z"
    },
    {
        "id": 1042,
        "user_id": 1010,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but not perfect either.",
        "created_at": "2023-09-03T13:45:40Z",
        "updated_at": "2023-09-03T13:45:40Z"
    },
    {
        "id": 1043,
        "user_id": 1010,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Overall, a decent product for the price.",
        "created_at": "2023-09-04T15:55:50Z",
        "updated_at": "2023-09-04T15:55:50Z"
    },
    {
        "id": 1044,
        "user_id": 1011,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Fantastic purchase! I'm really happy with it.",
        "created_at": "2023-09-05T09:05:20Z",
        "updated_at": "2023-09-05T09:05:20Z"
    },
    {
        "id": 1045,
        "user_id": 1011,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good product. It met my expectations.",
        "created_at": "2023-09-06T11:15:30Z",
        "updated_at": "2023-09-06T11:15:30Z"
    },
    {
        "id": 1046,
        "user_id": 1011,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's okay, but it has some minor flaws.",
        "created_at": "2023-09-07T13:25:40Z",
        "updated_at": "2023-09-07T13:25:40Z"
    },
    {
        "id": 1047,
        "user_id": 1011,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Amazing product! I highly recommend it!",
        "created_at": "2023-09-08T15:30:50Z",
        "updated_at": "2023-09-08T15:30:50Z"
    },
    {
        "id": 1048,
        "user_id": 1012,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase.",
        "created_at": "2023-09-09T09:40:20Z",
        "updated_at": "2023-09-09T09:40:20Z"
    },
    {
        "id": 1049,
        "user_id": 1012,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! It was exactly what I needed.",
        "created_at": "2023-09-10T11:55:30Z",
        "updated_at": "2023-09-10T11:55:30Z"
    },
    {
        "id": 1050,
        "user_id": 1012,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could be better.",
        "created_at": "2023-09-11T14:10:40Z",
        "updated_at": "2023-09-11T14:10:40Z"
    },
    {
        "id": 1051,
        "user_id": 1012,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product for everyday use.",
        "created_at": "2023-09-12T16:25:50Z",
        "updated_at": "2023-09-12T16:25:50Z"
    },
    {
        "id": 1052,
        "user_id": 1013,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm extremely happy with my purchase!",
        "created_at": "2023-09-13T09:15:20Z",
        "updated_at": "2023-09-13T09:15:20Z"
    },
    {
        "id": 1053,
        "user_id": 1013,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good product. It exceeded my expectations.",
        "created_at": "2023-09-14T11:30:30Z",
        "updated_at": "2023-09-14T11:30:30Z"
    },
    {
        "id": 1054,
        "user_id": 1013,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but it has some room for improvement.",
        "created_at": "2023-09-15T13:45:40Z",
        "updated_at": "2023-09-15T13:45:40Z"
    },
    {
        "id": 1055,
        "user_id": 1013,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Highly recommended! The product is top-notch!",
        "created_at": "2023-09-16T15:55:50Z",
        "updated_at": "2023-09-16T15:55:50Z"
    },
    {
        "id": 1056,
        "user_id": 1014,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with the product.",
        "created_at": "2023-09-17T09:05:20Z",
        "updated_at": "2023-09-17T09:05:20Z"
    },
    {
        "id": 1057,
        "user_id": 1014,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent purchase! I'm impressed with the quality.",
        "created_at": "2023-09-18T11:15:30Z",
        "updated_at": "2023-09-18T11:15:30Z"
    },
    {
        "id": 1058,
        "user_id": 1014,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "The product is decent, but it has some flaws.",
        "created_at": "2023-09-19T13:25:40Z",
        "updated_at": "2023-09-19T13:25:40Z"
    },
    {
        "id": 1059,
        "user_id": 1014,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Overall, a good product for the price.",
        "created_at": "2023-09-20T15:30:50Z",
        "updated_at": "2023-09-20T15:30:50Z"
    },
    {
        "id": 1060,
        "user_id": 1015,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Absolutely fantastic! I'm thrilled with my purchase!",
        "created_at": "2023-09-21T09:40:20Z",
        "updated_at": "2023-09-21T09:40:20Z"
    },
    {
        "id": 1061,
        "user_id": 1015,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very good product. I highly recommend it.",
        "created_at": "2023-09-22T11:55:30Z",
        "updated_at": "2023-09-22T11:55:30Z"
    },
    {
        "id": 1062,
        "user_id": 1015,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but not the best.",
        "created_at": "2023-09-23T14:10:40Z",
        "updated_at": "2023-09-23T14:10:40Z"
    },
    {
        "id": 1063,
        "user_id": 1015,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm loving it! The product exceeded my expectations.",
        "created_at": "2023-09-24T16:25:50Z",
        "updated_at": "2023-09-24T16:25:50Z"
    },
    {
        "id": 1064,
        "user_id": 1016,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase!",
        "created_at": "2023-09-25T09:15:20Z",
        "updated_at": "2023-09-25T09:15:20Z"
    },
    {
        "id": 1065,
        "user_id": 1016,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! Will buy from this seller again!",
        "created_at": "2023-09-26T11:30:30Z",
        "updated_at": "2023-09-26T11:30:30Z"
    },
    {
        "id": 1066,
        "user_id": 1016,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could use some improvements.",
        "created_at": "2023-09-27T13:45:40Z",
        "updated_at": "2023-09-27T13:45:40Z"
    },
    {
        "id": 1067,
        "user_id": 1016,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good! But I had some minor issues.",
        "created_at": "2023-09-28T15:55:50Z",
        "updated_at": "2023-09-28T15:55:50Z"
    },
    {
        "id": 1068,
        "user_id": 1017,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Absolutely fantastic! I'm thrilled with my purchase!",
        "created_at": "2023-09-29T09:05:20Z",
        "updated_at": "2023-09-29T09:05:20Z"
    },
    {
        "id": 1069,
        "user_id": 1017,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very good product. I highly recommend it.",
        "created_at": "2023-09-30T11:15:30Z",
        "updated_at": "2023-09-30T11:15:30Z"
    },
    {
        "id": 1070,
        "user_id": 1017,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but not the best.",
        "created_at": "2023-10-01T13:25:40Z",
        "updated_at": "2023-10-01T13:25:40Z"
    },
    {
        "id": 1071,
        "user_id": 1017,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm loving it! The product exceeded my expectations.",
        "created_at": "2023-10-02T15:30:50Z",
        "updated_at": "2023-10-02T15:30:50Z"
    },
    {
        "id": 1072,
        "user_id": 1018,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase.",
        "created_at": "2023-10-03T09:40:20Z",
        "updated_at": "2023-10-03T09:40:20Z"
    },
    {
        "id": 1073,
        "user_id": 1018,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! It was exactly what I needed.",
        "created_at": "2023-10-04T11:55:30Z",
        "updated_at": "2023-10-04T11:55:30Z"
    },
    {
        "id": 1074,
        "user_id": 1018,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could be better.",
        "created_at": "2023-10-05T14:10:40Z",
        "updated_at": "2023-10-05T14:10:40Z"
    },
    {
        "id": 1075,
        "user_id": 1018,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product for everyday use.",
        "created_at": "2023-10-06T16:25:50Z",
        "updated_at": "2023-10-06T16:25:50Z"
    },
    {
        "id": 1076,
        "user_id": 1019,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm extremely happy with my purchase!",
        "created_at": "2023-10-07T09:15:20Z",
        "updated_at": "2023-10-07T09:15:20Z"
    },
    {
        "id": 1077,
        "user_id": 1019,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good product. It exceeded my expectations.",
        "created_at": "2023-10-08T11:30:30Z",
        "updated_at": "2023-10-08T11:30:30Z"
    },
    {
        "id": 1078,
        "user_id": 1019,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but it has some room for improvement.",
        "created_at": "2023-10-09T13:45:40Z",
        "updated_at": "2023-10-09T13:45:40Z"
    },
    {
        "id": 1079,
        "user_id": 1019,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Highly recommended! The product is top-notch!",
        "created_at": "2023-10-10T15:55:50Z",
        "updated_at": "2023-10-10T15:55:50Z"
    },
    {
        "id": 1080,
        "user_id": 1020,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase!",
        "created_at": "2023-10-11T09:05:20Z",
        "updated_at": "2023-10-11T09:05:20Z"
    },
    {
        "id": 1081,
        "user_id": 1020,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! Will buy from this seller again!",
        "created_at": "2023-10-12T11:15:30Z",
        "updated_at": "2023-10-12T11:15:30Z"
    },
    {
        "id": 1082,
        "user_id": 1020,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could use some improvements.",
        "created_at": "2023-10-13T13:25:40Z",
        "updated_at": "2023-10-13T13:25:40Z"
    },
    {
        "id": 1083,
        "user_id": 1020,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good! But I had some minor issues.",
        "created_at": "2023-10-14T15:30:50Z",
        "updated_at": "2023-10-14T15:30:50Z"
    },
    {
        "id": 1084,
        "user_id": 1021,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Absolutely fantastic! I'm thrilled with my purchase!",
        "created_at": "2023-10-15T09:40:20Z",
        "updated_at": "2023-10-15T09:40:20Z"
    },
    {
        "id": 1085,
        "user_id": 1021,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very good product. I highly recommend it.",
        "created_at": "2023-10-16T11:55:30Z",
        "updated_at": "2023-10-16T11:55:30Z"
    },
    {
        "id": 1086,
        "user_id": 1021,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but not the best.",
        "created_at": "2023-10-17T14:10:40Z",
        "updated_at": "2023-10-17T14:10:40Z"
    },
    {
        "id": 1087,
        "user_id": 1021,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm loving it! The product exceeded my expectations.",
        "created_at": "2023-10-18T16:25:50Z",
        "updated_at": "2023-10-18T16:25:50Z"
    },
    {
        "id": 1088,
        "user_id": 1022,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase.",
        "created_at": "2023-10-19T09:15:20Z",
        "updated_at": "2023-10-19T09:15:20Z"
    },
    {
        "id": 1089,
        "user_id": 1022,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! It was exactly what I needed.",
        "created_at": "2023-10-20T11:30:30Z",
        "updated_at": "2023-10-20T11:30:30Z"
    },
    {
        "id": 1090,
        "user_id": 1022,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could be better.",
        "created_at": "2023-10-21T13:45:40Z",
        "updated_at": "2023-10-21T13:45:40Z"
    },
    {
        "id": 1091,
        "user_id": 1022,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product for everyday use.",
        "created_at": "2023-10-22T15:55:50Z",
        "updated_at": "2023-10-22T15:55:50Z"
    },
    {
        "id": 1092,
        "user_id": 1023,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "I'm extremely happy with my purchase!",
        "created_at": "2023-10-23T09:05:20Z",
        "updated_at": "2023-10-23T09:05:20Z"
    },
    {
        "id": 1093,
        "user_id": 1023,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Pretty good product. It exceeded my expectations.",
        "created_at": "2023-10-24T11:15:30Z",
        "updated_at": "2023-10-24T11:15:30Z"
    },
    {
        "id": 1094,
        "user_id": 1023,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "It's decent, but it has some room for improvement.",
        "created_at": "2023-10-25T13:25:40Z",
        "updated_at": "2023-10-25T13:25:40Z"
    },
    {
        "id": 1095,
        "user_id": 1023,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Highly recommended! The product is top-notch!",
        "created_at": "2023-10-26T15:30:50Z",
        "updated_at": "2023-10-26T15:30:50Z"
    },
    {
        "id": 1096,
        "user_id": 1024,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Very satisfied with my purchase!",
        "created_at": "2023-10-27T09:40:20Z",
        "updated_at": "2023-10-27T09:40:20Z"
    },
    {
        "id": 1097,
        "user_id": 1024,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 5,
        "comment": "Excellent product! It was exactly what I needed.",
        "created_at": "2023-10-28T11:55:30Z",
        "updated_at": "2023-10-28T11:55:30Z"
    },
    {
        "id": 1098,
        "user_id": 1024,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 3,
        "comment": "Not bad, but it could be better.",
        "created_at": "2023-10-29T14:10:40Z",
        "updated_at": "2023-10-29T14:10:40Z"
    },
    {
        "id": 1099,
        "user_id": 1024,
        "product_id": 1000,
        "variant_id": 1000,
        "rating": 4,
        "comment": "Good product for everyday use.",
        "created_at": "2023-10-30T16:25:50Z",
        "updated_at": "2023-10-30T16:25:50Z"
    }
]

export default reviews;
