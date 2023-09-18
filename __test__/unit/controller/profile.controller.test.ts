import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import ProfileController from "@controller/profile.controller";
import Repository from "@src/repository";
import { NextRequest } from "next/server";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import { Address } from "@prisma/client";


const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("ProfileController", () => {
    let controller: ProfileController;
    let req: NextRequest;
    const user = { id: 1, username: "test" };
    const token = generateAccessToken(user as UserSession)

    beforeEach(() => {
        controller = new ProfileController();
    });

    describe("Test getProfile", () => {

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 when user is logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.getProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 when user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateProfile", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: "test",
                    password: "test"
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(true);

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if wrong password", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(false);

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockRejectedValueOnce(new Error(""));

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateEmail", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/change-email", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: "test@mail.com",
                    password: "test"
                })
            });
        });


        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(true);

            const res = await controller.updateEmail(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateEmail(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if wrong password", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(false);

            const res = await controller.updateProfile(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/change-email", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateEmail(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/change-email", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockRejectedValueOnce(new Error(""));

            const res = await controller.updateEmail(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateUsername", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/change-username", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: "test",
                    password: "test"
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(true);

            const res = await controller.updateUsername(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateUsername(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if wrong password", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(false);

            const res = await controller.updateUsername(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/change-username", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateUsername(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/change-username", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockRejectedValueOnce(new Error(""));

            const res = await controller.updateUsername(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updatePassword", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/change-email", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: "test",
                    newPassword: "new test"
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(true);

            const res = await controller.updatePassword(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updatePassword(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if wrong password", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.verifyPassword as jest.Mock).mockResolvedValueOnce(false);

            const res = await controller.updatePassword(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updatePassword(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockRejectedValueOnce(new Error(""));

            const res = await controller.updatePassword(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getAddresses", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([{
                id: 1
            }]);

            const res = await controller.getAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no addresses found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test addAddress", () => {
        const address = {
            user_id: 1,
            name: "test",
            address: "test",
            city: "test",
            state: "test",
            country: "test",
            zip: "1234",
            phone: "1234567890"
        } as Address;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(address)
            });
        });

        it("returns 201 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.address.create as jest.Mock).mockResolvedValueOnce(address);

            const res = await controller.addAddress(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.addAddress(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addAddress(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.addAddress(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteAddresses", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses/1", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);
            (Repository.address.deleteUserAddresses as jest.Mock).mockResolvedValueOnce({});

            const res = await controller.deleteAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no addresses found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteAddresses(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getAddress", () => {
        const address = {
            id: 1,
            user_id: 1,
            name: "test",
            address: "test",
            city: "test",
            state: "test",
            country: "test",
            zip: "1234",
            phone: "1234567890"
        } as Address;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([address]);

            const res = await controller.getAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if address not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateAddress", () => {
        const address = {
            name: "test",
            address: "test",
            city: "test",
            state: "test",
            country: "test",
            zip: "1234",
            phone: "1234567890"
        } as Address;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses/1", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(address)
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(address);
            (Repository.address.update as jest.Mock).mockResolvedValueOnce(address);

            const res = await controller.updateAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/addresses/1", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if address not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.updateAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteAddress", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if address not found");
    });

    describe("Test getPaymentMethods", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no payment methods found");
    });

    describe("Test addPaymentMethod", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 422 if wrong body");
    });

    describe("Test getPaymentMethod", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if payment method not found");
    });

    describe("Test updatePaymentMethod", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 404 if payment method not found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deletePaymentMethod", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if payment method not found");
    });

    describe("Test getOrders", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no orders found");
    });

    describe("Test getOrder", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if order not found");
    });

    describe("Test cancelOrder", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
    });

    describe("Test getWishlist", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no wishlist items found");
    });

    describe("Test getWishlistItem", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if wishlist item not found");
    });

    describe("Test deleteWishlistItem", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no wishlist item found");
    });

    describe("Test moveToCart", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deleteWishlist", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no wishlist items found");
    });

    describe("Test getCart", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no cart items found");
    });

    describe("Test addToCart", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 422 if wrong body");
    });

    describe("Test getCartItem", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if cart item not found");
    });

    describe("Test updateQuantity", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if cart item not found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deleteCartItem", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no cart item found");
    });

    describe("Test deleteCart", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no cart items found");
    });

    describe("Test checkout", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 400 if request body is invalid");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no cart items found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test getReviews", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no reviews found");
    });

    describe("Test deleteReviews", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no reviews found");
    });

    describe("Test getReview", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if review not found");
    });

    describe("Test deleteReview", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if review not found");
    });

    describe("Test getPayments", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if no payments found");
    });

    describe("Test getPayment", () => {
        it.todo("returns 200 if user is logged in with data");
        it.todo("returns 401 if user is not logged in");
        it.todo("returns 404 if payment not found");
    });
});

