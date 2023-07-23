const productsVariants = [
    {
        "id": 1000,
        "product_id": 1000,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 25.99,
        "raw_price": 15.00
    },
    {
        "id": 1001,
        "product_id": 1000,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 30.99,
        "raw_price": 20.00
    },
    {
        "id": 1002,
        "product_id": 1000,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 75,
        "price": 35.99,
        "raw_price": 25.00
    },
    {
        "id": 1003,
        "product_id": 1001,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 30,
        "price": 19.99,
        "raw_price": 12.00
    },
    {
        "id": 1004,
        "product_id": 1001,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 20,
        "price": 24.99,
        "raw_price": 18.00
    },
    {
        "id": 1005,
        "product_id": 1001,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 29.99,
        "raw_price": 22.00
    },
    {
        "id": 1006,
        "product_id": 1002,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 60,
        "price": 22.99,
        "raw_price": 13.00
    },
    {
        "id": 1007,
        "product_id": 1002,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 90,
        "price": 27.99,
        "raw_price": 17.00
    },
    {
        "id": 1008,
        "product_id": 1002,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 32.99,
        "raw_price": 26.00
    },
    {
        "id": 1009,
        "product_id": 1003,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 18.99,
        "raw_price": 11.00
    },
    {
        "id": 1010,
        "product_id": 1003,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 16.00
    },
    {
        "id": 1011,
        "product_id": 1003,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 55,
        "price": 28.99,
        "raw_price": 21.00
    },
    {
        "id": 1012,
        "product_id": 1004,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 21.99,
        "raw_price": 14.00
    },
    {
        "id": 1013,
        "product_id": 1004,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 15,
        "price": 26.99,
        "raw_price": 19.00
    },
    {
        "id": 1014,
        "product_id": 1004,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 25,
        "price": 31.99,
        "raw_price": 24.00
    },
    {
        "id": 1015,
        "product_id": 1005,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 40,
        "price": 24.99,
        "raw_price": 17.00
    },
    {
        "id": 1016,
        "product_id": 1005,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 22.00
    },
    {
        "id": 1017,
        "product_id": 1005,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 27.00
    },
    {
        "id": 1018,
        "product_id": 1006,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1019,
        "product_id": 1006,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1020,
        "product_id": 1006,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1021,
        "product_id": 1007,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1022,
        "product_id": 1007,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1023,
        "product_id": 1007,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1024,
        "product_id": 1008,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 75,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1025,
        "product_id": 1008,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 30,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1026,
        "product_id": 1008,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1027,
        "product_id": 1009,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1028,
        "product_id": 1009,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1029,
        "product_id": 1009,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1030,
        "product_id": 1010,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1031,
        "product_id": 1010,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 55,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1032,
        "product_id": 1010,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 70,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1033,
        "product_id": 1011,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1034,
        "product_id": 1011,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1035,
        "product_id": 1011,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1036,
        "product_id": 1012,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1037,
        "product_id": 1012,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1038,
        "product_id": 1012,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 15,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1039,
        "product_id": 1013,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 90,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1040,
        "product_id": 1013,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1041,
        "product_id": 1013,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1042,
        "product_id": 1014,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1043,
        "product_id": 1014,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1044,
        "product_id": 1014,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1045,
        "product_id": 1015,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1046,
        "product_id": 1015,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1047,
        "product_id": 1015,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1048,
        "product_id": 1016,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1049,
        "product_id": 1016,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1050,
        "product_id": 1016,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1051,
        "product_id": 1017,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1052,
        "product_id": 1017,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1053,
        "product_id": 1017,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1054,
        "product_id": 1018,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1055,
        "product_id": 1018,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1056,
        "product_id": 1018,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1057,
        "product_id": 1019,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1058,
        "product_id": 1019,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1059,
        "product_id": 1019,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1060,
        "product_id": 1020,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1061,
        "product_id": 1020,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1062,
        "product_id": 1020,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1063,
        "product_id": 1021,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1064,
        "product_id": 1021,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1065,
        "product_id": 1021,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1066,
        "product_id": 1022,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1067,
        "product_id": 1022,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 55,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1068,
        "product_id": 1022,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 70,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1069,
        "product_id": 1023,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1070,
        "product_id": 1023,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1071,
        "product_id": 1023,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1072,
        "product_id": 1024,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1073,
        "product_id": 1024,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1074,
        "product_id": 1024,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 15,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1075,
        "product_id": 1025,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 90,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1076,
        "product_id": 1025,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1077,
        "product_id": 1025,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1078,
        "product_id": 1026,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1079,
        "product_id": 1026,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1080,
        "product_id": 1026,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1081,
        "product_id": 1027,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1082,
        "product_id": 1027,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1083,
        "product_id": 1027,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1084,
        "product_id": 1028,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1085,
        "product_id": 1028,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1086,
        "product_id": 1028,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1087,
        "product_id": 1029,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1088,
        "product_id": 1029,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1089,
        "product_id": 1029,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1090,
        "product_id": 1030,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1091,
        "product_id": 1030,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 55,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1092,
        "product_id": 1030,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 70,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1093,
        "product_id": 1031,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1094,
        "product_id": 1031,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1095,
        "product_id": 1031,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1096,
        "product_id": 1032,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1097,
        "product_id": 1032,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1098,
        "product_id": 1032,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1099,
        "product_id": 1033,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1100,
        "product_id": 1033,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1101,
        "product_id": 1033,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1102,
        "product_id": 1034,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1103,
        "product_id": 1034,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1104,
        "product_id": 1034,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1105,
        "product_id": 1035,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1106,
        "product_id": 1035,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1107,
        "product_id": 1035,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1108,
        "product_id": 1036,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1109,
        "product_id": 1036,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1110,
        "product_id": 1036,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1111,
        "product_id": 1037,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1112,
        "product_id": 1037,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1113,
        "product_id": 1037,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1114,
        "product_id": 1038,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1115,
        "product_id": 1038,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1116,
        "product_id": 1038,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1117,
        "product_id": 1039,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1118,
        "product_id": 1039,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1119,
        "product_id": 1039,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1120,
        "product_id": 1040,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1121,
        "product_id": 1040,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1122,
        "product_id": 1040,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1123,
        "product_id": 1041,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1124,
        "product_id": 1041,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1125,
        "product_id": 1041,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1126,
        "product_id": 1042,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1127,
        "product_id": 1042,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 55,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1128,
        "product_id": 1042,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 70,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1129,
        "product_id": 1043,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1130,
        "product_id": 1043,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1131,
        "product_id": 1043,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1132,
        "product_id": 1044,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1133,
        "product_id": 1044,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1134,
        "product_id": 1044,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 15,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1135,
        "product_id": 1045,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 90,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1136,
        "product_id": 1045,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1137,
        "product_id": 1045,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1138,
        "product_id": 1046,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1139,
        "product_id": 1046,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1140,
        "product_id": 1046,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1141,
        "product_id": 1047,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1142,
        "product_id": 1047,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1143,
        "product_id": 1047,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1144,
        "product_id": 1048,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1145,
        "product_id": 1048,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1146,
        "product_id": 1048,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1147,
        "product_id": 1049,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1148,
        "product_id": 1049,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1149,
        "product_id": 1049,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1150,
        "product_id": 1050,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1151,
        "product_id": 1050,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 55,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1152,
        "product_id": 1050,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 70,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1153,
        "product_id": 1051,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1154,
        "product_id": 1051,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1155,
        "product_id": 1051,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 35,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1156,
        "product_id": 1052,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1157,
        "product_id": 1052,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1158,
        "product_id": 1052,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1159,
        "product_id": 1053,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1160,
        "product_id": 1053,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1161,
        "product_id": 1053,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1162,
        "product_id": 1054,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1163,
        "product_id": 1054,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1164,
        "product_id": 1054,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1165,
        "product_id": 1055,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1166,
        "product_id": 1055,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1167,
        "product_id": 1055,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1168,
        "product_id": 1056,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1169,
        "product_id": 1056,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1170,
        "product_id": 1056,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1171,
        "product_id": 1057,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1172,
        "product_id": 1057,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1173,
        "product_id": 1057,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1174,
        "product_id": 1058,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1175,
        "product_id": 1058,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1176,
        "product_id": 1058,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1177,
        "product_id": 1059,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1178,
        "product_id": 1059,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1179,
        "product_id": 1059,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1180,
        "product_id": 1060,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1181,
        "product_id": 1060,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1182,
        "product_id": 1060,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1183,
        "product_id": 1061,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1184,
        "product_id": 1061,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1185,
        "product_id": 1061,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1186,
        "product_id": 1062,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1187,
        "product_id": 1062,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1188,
        "product_id": 1062,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1189,
        "product_id": 1063,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1190,
        "product_id": 1063,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1191,
        "product_id": 1063,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1192,
        "product_id": 1064,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1193,
        "product_id": 1064,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1194,
        "product_id": 1064,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1195,
        "product_id": 1065,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1196,
        "product_id": 1065,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1197,
        "product_id": 1065,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1198,
        "product_id": 1066,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1199,
        "product_id": 1066,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1200,
        "product_id": 1066,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1201,
        "product_id": 1067,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1202,
        "product_id": 1067,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1203,
        "product_id": 1067,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1204,
        "product_id": 1068,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1205,
        "product_id": 1068,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1206,
        "product_id": 1068,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1207,
        "product_id": 1069,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1208,
        "product_id": 1069,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1209,
        "product_id": 1069,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1210,
        "product_id": 1070,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1211,
        "product_id": 1070,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1212,
        "product_id": 1070,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1213,
        "product_id": 1071,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1214,
        "product_id": 1071,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1215,
        "product_id": 1071,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1216,
        "product_id": 1072,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1217,
        "product_id": 1072,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1218,
        "product_id": 1072,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1219,
        "product_id": 1073,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1220,
        "product_id": 1073,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1221,
        "product_id": 1073,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1222,
        "product_id": 1074,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1223,
        "product_id": 1074,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1224,
        "product_id": 1074,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1225,
        "product_id": 1075,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1226,
        "product_id": 1075,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1227,
        "product_id": 1075,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1228,
        "product_id": 1076,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1229,
        "product_id": 1076,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1230,
        "product_id": 1076,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1231,
        "product_id": 1077,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1232,
        "product_id": 1077,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1233,
        "product_id": 1077,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1234,
        "product_id": 1078,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1235,
        "product_id": 1078,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1236,
        "product_id": 1078,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1237,
        "product_id": 1079,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1238,
        "product_id": 1079,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1239,
        "product_id": 1079,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1240,
        "product_id": 1080,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1241,
        "product_id": 1080,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1242,
        "product_id": 1080,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1243,
        "product_id": 1081,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1244,
        "product_id": 1081,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1245,
        "product_id": 1081,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1246,
        "product_id": 1082,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1247,
        "product_id": 1082,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1248,
        "product_id": 1082,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1249,
        "product_id": 1083,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1250,
        "product_id": 1083,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1251,
        "product_id": 1083,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1252,
        "product_id": 1084,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1253,
        "product_id": 1084,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1254,
        "product_id": 1084,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1255,
        "product_id": 1085,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1256,
        "product_id": 1085,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1257,
        "product_id": 1085,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1258,
        "product_id": 1086,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1259,
        "product_id": 1086,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1260,
        "product_id": 1086,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1261,
        "product_id": 1087,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1262,
        "product_id": 1087,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1263,
        "product_id": 1087,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1264,
        "product_id": 1088,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1265,
        "product_id": 1088,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1266,
        "product_id": 1088,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1267,
        "product_id": 1089,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1268,
        "product_id": 1089,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1269,
        "product_id": 1089,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1270,
        "product_id": 1090,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1271,
        "product_id": 1090,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1272,
        "product_id": 1090,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1273,
        "product_id": 1091,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1274,
        "product_id": 1091,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1275,
        "product_id": 1091,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1276,
        "product_id": 1092,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 25,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1277,
        "product_id": 1092,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 70,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1278,
        "product_id": 1092,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 90,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1279,
        "product_id": 1093,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 35,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1280,
        "product_id": 1093,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 100,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1281,
        "product_id": 1093,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 45,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1282,
        "product_id": 1094,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 50,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1283,
        "product_id": 1094,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1284,
        "product_id": 1094,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 40,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1285,
        "product_id": 1095,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 70,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1286,
        "product_id": 1095,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 25,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1287,
        "product_id": 1095,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 65,
        "price": 28.99,
        "raw_price": 23.00
    },
    {
        "id": 1288,
        "product_id": 1096,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 55,
        "price": 21.99,
        "raw_price": 16.00
    },
    {
        "id": 1289,
        "product_id": 1096,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 80,
        "price": 26.99,
        "raw_price": 21.00
    },
    {
        "id": 1290,
        "product_id": 1096,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 30,
        "price": 31.99,
        "raw_price": 26.00
    },
    {
        "id": 1291,
        "product_id": 1097,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 45,
        "price": 24.99,
        "raw_price": 19.00
    },
    {
        "id": 1292,
        "product_id": 1097,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 95,
        "price": 29.99,
        "raw_price": 24.00
    },
    {
        "id": 1293,
        "product_id": 1097,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 50,
        "price": 34.99,
        "raw_price": 29.00
    },
    {
        "id": 1294,
        "product_id": 1098,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 65,
        "price": 20.99,
        "raw_price": 15.00
    },
    {
        "id": 1295,
        "product_id": 1098,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 40,
        "price": 25.99,
        "raw_price": 20.00
    },
    {
        "id": 1296,
        "product_id": 1098,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 80,
        "price": 30.99,
        "raw_price": 25.00
    },
    {
        "id": 1297,
        "product_id": 1099,
        "name": "Variant 1",
        "image_url": "https://example.com/variant1.jpg",
        "stock": 20,
        "price": 18.99,
        "raw_price": 13.00
    },
    {
        "id": 1298,
        "product_id": 1099,
        "name": "Variant 2",
        "image_url": "https://example.com/variant2.jpg",
        "stock": 85,
        "price": 23.99,
        "raw_price": 18.00
    },
    {
        "id": 1299,
        "product_id": 1099,
        "name": "Variant 3",
        "image_url": "https://example.com/variant3.jpg",
        "stock": 60,
        "price": 28.99,
        "raw_price": 23.00
    }
]

export default productsVariants;
