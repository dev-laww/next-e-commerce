import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import ProfileController from "@controller/profile.controller";
import Repository from "@src/repository";
import { NextRequest } from "next/server";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import {
    Address,
    CartItem,
    Coupon,
    Order,
    Payment,
    PaymentMethod,
    ProductVariant,
    Review,
    ShippingMethod,
    WishlistItem
} from "@prisma/client";


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
            (Repository.address.deleteUserAddresses as jest.Mock).mockResolvedValueOnce({ count: 1 });

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
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
        });


        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(address);
            (Repository.address.delete as jest.Mock).mockResolvedValueOnce(address);

            const res = await controller.deleteAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if address not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteAddress(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getPaymentMethods", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([{
                id: 1
            }]);

            const res = await controller.getPaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getPaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no payment methods found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getPaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deletePaymentMethods", () => {
        const paymentMethod = {
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123",
            type: "payment-method:credit_card"
        } as PaymentMethod;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([paymentMethod]);
            (Repository.paymentMethod.deleteByUserId as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deletePaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deletePaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no payment methods found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deletePaymentMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test addPaymentMethod", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "Name",
                    email: "test@mail.com",
                    type: "payment-method:google"
                })
            })
        })

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.create as jest.Mock).mockResolvedValueOnce({});

            const res = await controller.addPaymentMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addPaymentMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            })
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.addPaymentMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            })
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.create as jest.Mock).mockRejectedValueOnce(new Error(""));

            const res = await controller.addPaymentMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getPaymentMethod", () => {
        const params = { id: "1" }
        const paymentMethod = {
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123",
            type: "payment-method:credit_card"
        } as PaymentMethod;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([paymentMethod]);

            const res = await controller.getPaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getPaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if payment method not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getPaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updatePaymentMethod", () => {
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "Updated name",
                    email: "updated@mail.com",
                    type: "payment-method:google"
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce({});
            (Repository.paymentMethod.update as jest.Mock).mockResolvedValueOnce({});

            const res = await controller.updatePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updatePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updatePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if payment method not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updatePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce({});

            const res = await controller.updatePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deletePaymentMethod", () => {
        const params = { id: "1" }
        const paymentMethod = {
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123",
            type: "payment-method:credit_card"
        } as PaymentMethod;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payment-methods/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce(paymentMethod);
            (Repository.paymentMethod.delete as jest.Mock).mockResolvedValueOnce(paymentMethod);

            const res = await controller.deletePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deletePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if payment method not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deletePaymentMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getOrders", () => {
        const order = {
            id: 1,
            shipping_id: 1,
            address_id: 1,
            order_number: "1234567890",
            status: "processing",
            total: 59.99,
            payment_id: null,
            order_items: []
        } as unknown as Order

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([order]);

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });
        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
        });

        it("returns 404 if no orders found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getOrder", () => {
        const order = {
            id: 1,
            shipping_id: 1,
            address_id: 1,
            order_number: "1234567890",
            status: "processing",
            total: 59.99,
            payment_id: null,
            order_items: []
        } as unknown as Order
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/orders/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([order]);

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if order not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test cancelOrder", () => {
        const order = {
            id: 1,
            shipping_id: 1,
            address_id: 1,
            order_number: "1234567890",
            status: "processing",
            total: 59.99,
            payment_id: null,
            order_items: []
        } as unknown as Order
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/orders/1/cancel", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(order);
            (Repository.order.update as jest.Mock).mockResolvedValueOnce(order);

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if order is not processing", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce({
                ...order,
                status: "shipped"
            });

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if order not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getWishlist", () => {
        const wishlistItem = {
            id: 1,
            product_id: 1
        } as WishlistItem;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([wishlistItem]);

            const res = await controller.getWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no wishlist items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getWishlistItem", () => {
        const wishlistItem = {
            id: 1,
            product_id: 1
        } as WishlistItem;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([wishlistItem]);

            const res = await controller.getWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if wishlist item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteWishlistItem", () => {
        const wishlistItem = {
            id: 1,
            product_id: 1
        } as WishlistItem;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(wishlistItem);
            (Repository.wishlist.delete as jest.Mock).mockResolvedValueOnce(wishlistItem);

            const res = await controller.deleteWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no wishlist item found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteWishlistItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test moveToCart", () => {
        const wishlistItem = {
            id: 1,
            product_id: 1
        } as WishlistItem;
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            quantity: 1,
            total_price: 59.99,
        } as CartItem
        const variant = {
            id: 1,
            product_id: 1,
            name: "test",
            price: 59.99,
        } as ProductVariant;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist/1/move-to-cart", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    variantId: 1,
                    quantity: 1
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(wishlistItem);
            (Repository.cart.create as jest.Mock).mockResolvedValueOnce(cartItem);
            (Repository.cart.getAll as jest.Mock).mockResolvedValueOnce([]);
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist/1/move-to-cart", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if cart item already exists", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(wishlistItem);
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.cart.getAll as jest.Mock).mockResolvedValueOnce([cartItem]);

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if wishlist item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(wishlistItem);
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist/1/move-to-cart", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.wishlist.getById as jest.Mock).mockResolvedValueOnce(wishlistItem);
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.moveWishlistItemToCart(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteWishlist", () => {
        const wishlistItem = {
            id: 1,
            product_id: 1
        } as WishlistItem;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/wishlist", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([wishlistItem]);
            (Repository.wishlist.deleteUserWishlist as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no wishlist items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteWishlist(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getCart", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);

            const res = await controller.getCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
        });

        it("returns 404 if no cart items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getCartItem", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/cart/1", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);

            const res = await controller.getCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if cart item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateQuantity", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/cart/1/quantity", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    quantity: 20
                })
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.cart.getById as jest.Mock).mockResolvedValueOnce(cartItem);
            (Repository.cart.update as jest.Mock).mockResolvedValueOnce(cartItem);

            const res = await controller.updateQuantity(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/cart/1/quantity", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateQuantity(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateQuantity(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if cart item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.cart.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateQuantity(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/cart/1/quantity", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.cart.getById as jest.Mock).mockResolvedValueOnce(cartItem);

            const res = await controller.updateQuantity(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteCartItem", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/cart/1", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.cart.getById as jest.Mock).mockResolvedValueOnce(cartItem);
            (Repository.cart.delete as jest.Mock).mockResolvedValueOnce(cartItem);

            const res = await controller.deleteCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no cart item found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.cart.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteCartItem(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteCart", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/cart", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.cart.deleteUserCart as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no cart items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteCart(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test checkout", () => {
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 9.99,
            quantity: 1
        } as CartItem;
        const address = {
            id: 1,
            user_id: 1,
            name: "test",
            country: "test",
            city: "test",
            address: "test",
            zip: "test",
        } as Address;
        const shipping = {
            id: 1,
            name: "test",
            price: 9.99,
        } as ShippingMethod;
        const paymentMethod = {
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123",
            type: "payment-method:credit_card"
        } as PaymentMethod;
        const coupon = {
            id: 1,
            code: "test",
            discount: 10,
            type: "percentage",
        } as Coupon;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/checkout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    addressId: 1,
                    shippingId: 1,
                    paymentMethodId: 1,
                    couponCode: "test"
                })
            });
        });

        it("returns 201 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.cart.getByUserId as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(address);
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shipping);
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce(paymentMethod);
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(coupon);
            (Repository.order.create as jest.Mock).mockResolvedValueOnce({} as Order);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if request body is invalid", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/checkout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no cart items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if address not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if shipping not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(address);
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if payment not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);
            (Repository.address.getById as jest.Mock).mockResolvedValueOnce(address);
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shipping);
            (Repository.paymentMethod.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/profile/checkout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);

            const res = await controller.checkout(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getReviews", () => {
        const review = {
            id: 1,
            product_id: 1,
            user_id: 1,
            variant_id: 1,
            rating: 5,
        } as Review;

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([review]);

            const res = await controller.getReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no reviews found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteReviews", () => {
        const review = {
            id: 1,
            product_id: 1,
            user_id: 1,
            variant_id: 1,
            rating: 5,
        } as Review;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/reviews", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([review]);
            (Repository.review.deleteUserReviews as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no reviews found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteReviews(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getReview", () => {
        const review = {
            id: 1,
            product_id: 1,
            user_id: 1,
            variant_id: 1,
            rating: 5,
        } as Review;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/reviews/1", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([review]);

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteReview", () => {
        const review = {
            id: 1,
            product_id: 1,
            user_id: 1,
            variant_id: 1,
            rating: 5,
        } as Review;
        const params = { id: "1" }

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);
            (Repository.review.delete as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getPayments", () => {
        const payment = {
            id: 1,
            order_id: 1,
            method_id: 1,
            amount: 19.99,
            status: "paid"
        } as Payment;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payments", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([payment]);

            const res = await controller.getPayments(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getPayments(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no payments found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getPayments(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getPayment", () => {
        const payment = {
            id: 1,
            order_id: 1,
            method_id: 1,
            amount: 19.99,
            status: "paid"
        } as Payment;
        const params = { id: "1" }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/profile/payments/1", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it("returns 200 if user is logged in with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([payment]);

            const res = await controller.getPayment(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user is not logged in", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getPayment(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if payment not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getPayment(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

