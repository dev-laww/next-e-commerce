const reviews = [
    {
        id: 1000,
        user_id: 1000,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Nice product, I recommend it!"
    },
    {
        id: 1001,
        user_id: 1000,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's okay, could have been better."
    },
    {
        id: 1002,
        user_id: 1000,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product, exceeded my expectations!"
    },
    {
        id: 1003,
        user_id: 1000,
        product_id: 1000,
        variant_id: 1000,
        rating: 2,
        comment: "Not satisfied with the quality."
    },
    {
        id: 1004,
        user_id: 1001,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "This is a great product!"
    },
    {
        id: 1005,
        user_id: 1001,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product but could be better."
    },
    {
        id: 1006,
        user_id: 1001,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Average product, not too impressed."
    },
    {
        id: 1007,
        user_id: 1001,
        product_id: 1000,
        variant_id: 1000,
        rating: 2,
        comment: "Could have been better."
    },
    {
        id: 1008,
        user_id: 1002,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "The product is good, but the delivery was slow."
    },
    {
        id: 1009,
        user_id: 1002,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Great quality and value for money!"
    },
    {
        id: 1010,
        user_id: 1002,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It was okay, but I expected more."
    },
    {
        id: 1011,
        user_id: 1002,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product, but the packaging could be improved."
    },
    {
        id: 1012,
        user_id: 1003,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Totally worth it! I love it!"
    },
    {
        id: 1013,
        user_id: 1003,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "The product is decent, nothing special."
    },
    {
        id: 1014,
        user_id: 1003,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "I'm mostly satisfied, but there were a few issues."
    },
    {
        id: 1015,
        user_id: 1003,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Amazing product! Can't recommend it enough!"
    },
    {
        id: 1016,
        user_id: 1004,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase!"
    },
    {
        id: 1017,
        user_id: 1004,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! Will buy from this seller again!"
    },
    {
        id: 1018,
        user_id: 1004,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but not exceptional either."
    },
    {
        id: 1019,
        user_id: 1004,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good! But I had some minor issues."
    },
    {
        id: 1020,
        user_id: 1005,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Absolutely fantastic! I'm thrilled with my purchase!"
    },
    {
        id: 1021,
        user_id: 1005,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very good product. I highly recommend it."
    },
    {
        id: 1022,
        user_id: 1005,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but not the best."
    },
    {
        id: 1023,
        user_id: 1005,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm loving it! The product exceeded my expectations."
    },
    {
        id: 1024,
        user_id: 1006,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "The product is good. I have no major complaints."
    },
    {
        id: 1025,
        user_id: 1006,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Extremely satisfied! The product arrived on time and in perfect condition."
    },
    {
        id: 1026,
        user_id: 1006,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's okay, but I expected more features."
    },
    {
        id: 1027,
        user_id: 1006,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Overall a good product for the price."
    },
    {
        id: 1028,
        user_id: 1007,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Fantastic product! I'm very happy with my purchase."
    },
    {
        id: 1029,
        user_id: 1007,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good, but it could be improved."
    },
    {
        id: 1030,
        user_id: 1007,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "The product is decent, but not exceptional."
    },
    {
        id: 1031,
        user_id: 1007,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Amazing product! It met all my expectations."
    },
    {
        id: 1032,
        user_id: 1008,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "I would recommend this product to others."
    },
    {
        id: 1033,
        user_id: 1008,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product and fast delivery!"
    },
    {
        id: 1034,
        user_id: 1008,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's okay, but I had some issues with it."
    },
    {
        id: 1035,
        user_id: 1008,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Overall a good product. It served its purpose."
    },
    {
        id: 1036,
        user_id: 1009,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm in love with this product! Highly recommended!"
    },
    {
        id: 1037,
        user_id: 1009,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good! The product lived up to its description."
    },
    {
        id: 1038,
        user_id: 1009,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "The product is decent, but it has some downsides."
    },
    {
        id: 1039,
        user_id: 1009,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Superb product! I'm completely satisfied!"
    },
    {
        id: 1040,
        user_id: 1010,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "The product is good, but it could use some improvements."
    },
    {
        id: 1041,
        user_id: 1010,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! It exceeded my expectations."
    },
    {
        id: 1042,
        user_id: 1010,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but not perfect either."
    },
    {
        id: 1043,
        user_id: 1010,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Overall, a decent product for the price."
    },
    {
        id: 1044,
        user_id: 1011,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Fantastic purchase! I'm really happy with it."
    },
    {
        id: 1045,
        user_id: 1011,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good product. It met my expectations."
    },
    {
        id: 1046,
        user_id: 1011,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's okay, but it has some minor flaws."
    },
    {
        id: 1047,
        user_id: 1011,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Amazing product! I highly recommend it!"
    },
    {
        id: 1048,
        user_id: 1012,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase."
    },
    {
        id: 1049,
        user_id: 1012,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! It was exactly what I needed."
    },
    {
        id: 1050,
        user_id: 1012,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could be better."
    },
    {
        id: 1051,
        user_id: 1012,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product for everyday use."
    },
    {
        id: 1052,
        user_id: 1013,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm extremely happy with my purchase!"
    },
    {
        id: 1053,
        user_id: 1013,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good product. It exceeded my expectations."
    },
    {
        id: 1054,
        user_id: 1013,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but it has some room for improvement."
    },
    {
        id: 1055,
        user_id: 1013,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Highly recommended! The product is top-notch!"
    },
    {
        id: 1056,
        user_id: 1014,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with the product."
    },
    {
        id: 1057,
        user_id: 1014,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent purchase! I'm impressed with the quality."
    },
    {
        id: 1058,
        user_id: 1014,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "The product is decent, but it has some flaws."
    },
    {
        id: 1059,
        user_id: 1014,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Overall, a good product for the price."
    },
    {
        id: 1060,
        user_id: 1015,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Absolutely fantastic! I'm thrilled with my purchase!"
    },
    {
        id: 1061,
        user_id: 1015,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very good product. I highly recommend it."
    },
    {
        id: 1062,
        user_id: 1015,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but not the best."
    },
    {
        id: 1063,
        user_id: 1015,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm loving it! The product exceeded my expectations."
    },
    {
        id: 1064,
        user_id: 1016,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase!"
    },
    {
        id: 1065,
        user_id: 1016,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! Will buy from this seller again!"
    },
    {
        id: 1066,
        user_id: 1016,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could use some improvements."
    },
    {
        id: 1067,
        user_id: 1016,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good! But I had some minor issues."
    },
    {
        id: 1068,
        user_id: 1017,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Absolutely fantastic! I'm thrilled with my purchase!"
    },
    {
        id: 1069,
        user_id: 1017,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very good product. I highly recommend it."
    },
    {
        id: 1070,
        user_id: 1017,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but not the best."
    },
    {
        id: 1071,
        user_id: 1017,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm loving it! The product exceeded my expectations."
    },
    {
        id: 1072,
        user_id: 1018,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase."
    },
    {
        id: 1073,
        user_id: 1018,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! It was exactly what I needed."
    },
    {
        id: 1074,
        user_id: 1018,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could be better."
    },
    {
        id: 1075,
        user_id: 1018,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product for everyday use."
    },
    {
        id: 1076,
        user_id: 1019,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm extremely happy with my purchase!"
    },
    {
        id: 1077,
        user_id: 1019,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good product. It exceeded my expectations."
    },
    {
        id: 1078,
        user_id: 1019,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but it has some room for improvement."
    },
    {
        id: 1079,
        user_id: 1019,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Highly recommended! The product is top-notch!"
    },
    {
        id: 1080,
        user_id: 1020,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase!"
    },
    {
        id: 1081,
        user_id: 1020,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! Will buy from this seller again!"
    },
    {
        id: 1082,
        user_id: 1020,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could use some improvements."
    },
    {
        id: 1083,
        user_id: 1020,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good! But I had some minor issues."
    },
    {
        id: 1084,
        user_id: 1021,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Absolutely fantastic! I'm thrilled with my purchase!"
    },
    {
        id: 1085,
        user_id: 1021,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very good product. I highly recommend it."
    },
    {
        id: 1086,
        user_id: 1021,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but not the best."
    },
    {
        id: 1087,
        user_id: 1021,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm loving it! The product exceeded my expectations."
    },
    {
        id: 1088,
        user_id: 1022,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase."
    },
    {
        id: 1089,
        user_id: 1022,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! It was exactly what I needed."
    },
    {
        id: 1090,
        user_id: 1022,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could be better."
    },
    {
        id: 1091,
        user_id: 1022,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product for everyday use."
    },
    {
        id: 1092,
        user_id: 1023,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "I'm extremely happy with my purchase!"
    },
    {
        id: 1093,
        user_id: 1023,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Pretty good product. It exceeded my expectations."
    },
    {
        id: 1094,
        user_id: 1023,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "It's decent, but it has some room for improvement."
    },
    {
        id: 1095,
        user_id: 1023,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Highly recommended! The product is top-notch!"
    },
    {
        id: 1096,
        user_id: 1024,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Very satisfied with my purchase!"
    },
    {
        id: 1097,
        user_id: 1024,
        product_id: 1000,
        variant_id: 1000,
        rating: 5,
        comment: "Excellent product! It was exactly what I needed."
    },
    {
        id: 1098,
        user_id: 1024,
        product_id: 1000,
        variant_id: 1000,
        rating: 3,
        comment: "Not bad, but it could be better."
    },
    {
        id: 1099,
        user_id: 1024,
        product_id: 1000,
        variant_id: 1000,
        rating: 4,
        comment: "Good product for everyday use."
    }
]

export default reviews;
