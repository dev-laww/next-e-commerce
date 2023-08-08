const users = [
    {
        "id": 1000,
        "first_name": "Admin",
        "last_name": "",
        "email": process.env.EMAIL_USERNAME,
        "username": "admin",
        "password": "$2a$10$zCIfV2tmfH//ix8CcIuZEOeWmxwvDheMLKZqsZS/61fG2kQpLVKDW",
        "confirmed": true
    },
    {
        "id": 1001,
        "first_name": "Alice",
        "last_name": "Smith",
        "image_url": "https://example.com/user2.jpg",
        "email": "alice.smith@example.com",
        "username": "alicesmith",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1002,
        "first_name": "Emma",
        "last_name": "Brown",
        "image_url": "https://example.com/user101.jpg",
        "email": "emma.brown@example.com",
        "username": "emmabrown",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1003,
        "first_name": "Michael",
        "last_name": "Davis",
        "image_url": "https://example.com/user102.jpg",
        "email": "michael.davis@example.com",
        "username": "michaeldavis",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1004,
        "first_name": "Sophia",
        "last_name": "Garcia",
        "image_url": "https://example.com/user3.jpg",
        "email": "sophia.garcia@example.com",
        "username": "sophiagarcia",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1005,
        "first_name": "James",
        "last_name": "Wilson",
        "image_url": "https://example.com/user4.jpg",
        "email": "james.wilson@example.com",
        "username": "jameswilson",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1006,
        "first_name": "Olivia",
        "last_name": "Johnson",
        "image_url": "https://example.com/user5.jpg",
        "email": "olivia.johnson@example.com",
        "username": "oliviajohnson",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1007,
        "first_name": "William",
        "last_name": "Smith",
        "image_url": "https://example.com/user6.jpg",
        "email": "william.smith@example.com",
        "username": "williamsmith",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1008,
        "first_name": "Isabella",
        "last_name": "Davis",
        "image_url": "https://example.com/user7.jpg",
        "email": "isabella.davis@example.com",
        "username": "isabelladavis",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1009,
        "first_name": "Benjamin",
        "last_name": "Anderson",
        "image_url": "https://example.com/user8.jpg",
        "email": "benjamin.anderson@example.com",
        "username": "benjaminanderson",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1010,
        "first_name": "Mia",
        "last_name": "Martinez",
        "image_url": "https://example.com/user9.jpg",
        "email": "mia.martinez@example.com",
        "username": "miamartinez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1011,
        "first_name": "Ethan",
        "last_name": "Gonzalez",
        "image_url": "https://example.com/user10.jpg",
        "email": "ethan.gonzalez@example.com",
        "username": "ethangonzalez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1012,
        "first_name": "Camila",
        "last_name": "Miller",
        "image_url": "https://example.com/user11.jpg",
        "email": "camila.miller@example.com",
        "username": "camilamiller",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1013,
        "first_name": "Alexander",
        "last_name": "Lopez",
        "image_url": "https://example.com/user12.jpg",
        "email": "alexander.lopez@example.com",
        "username": "alexanderlopez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1014,
        "first_name": "Abigail",
        "last_name": "Hernandez",
        "image_url": "https://example.com/user13.jpg",
        "email": "abigail.hernandez@example.com",
        "username": "abigailhernandez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1015,
        "first_name": "Daniel",
        "last_name": "Moore",
        "image_url": "https://example.com/user14.jpg",
        "email": "daniel.moore@example.com",
        "username": "danielmoore",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1016,
        "first_name": "Emily",
        "last_name": "Gonzalez",
        "image_url": "https://example.com/user15.jpg",
        "email": "emily.gonzalez@example.com",
        "username": "emilygonzalez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1017,
        "first_name": "Matthew",
        "last_name": "Garcia",
        "image_url": "https://example.com/user16.jpg",
        "email": "matthew.garcia@example.com",
        "username": "matthewgarcia",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1018,
        "first_name": "Harper",
        "last_name": "Martinez",
        "image_url": "https://example.com/user17.jpg",
        "email": "harper.martinez@example.com",
        "username": "harpermartinez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1019,
        "first_name": "Aiden",
        "last_name": "Taylor",
        "image_url": "https://example.com/user18.jpg",
        "email": "aiden.taylor@example.com",
        "username": "aidentaylor",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1020,
        "first_name": "Sofia",
        "last_name": "Hernandez",
        "image_url": "https://example.com/user19.jpg",
        "email": "sofia.hernandez@example.com",
        "username": "sofiahernandez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1021,
        "first_name": "Elijah",
        "last_name": "Garcia",
        "image_url": "https://example.com/user20.jpg",
        "email": "elijah.garcia@example.com",
        "username": "elijahgarcia",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1022,
        "first_name": "Scarlett",
        "last_name": "Johnson",
        "image_url": "https://example.com/user21.jpg",
        "email": "scarlett.johnson@example.com",
        "username": "scarlettjohnson",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1023,
        "first_name": "Grayson",
        "last_name": "Brown",
        "image_url": "https://example.com/user22.jpg",
        "email": "grayson.brown@example.com",
        "username": "graysonbrown",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    },
    {
        "id": 1024,
        "first_name": "Madison",
        "last_name": "Lopez",
        "image_url": "https://example.com/user23.jpg",
        "email": "madison.lopez@example.com",
        "username": "madisonlopez",
        "password": "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        "confirmed": true
    }
]

export default users;
