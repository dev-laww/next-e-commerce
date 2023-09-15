import { DeepMockProxy, mockDeep } from "jest-mock-extended";

import AddressRepository from "@repository/address.repo";
import CartRepository from "@repository/cart.repo";
import CategoryRepository from "@repository/category.repo";
import LogRepository from "@repository/log.repo";
import OrderRepository from "@repository/order.repo";
import PaymentRepository from "@repository/payment.repo";
import PaymentMethodRepository from "@repository/payment-method.repo";
import PermissionRepository from "@repository/permission.repo";
import ProductRepository from "@repository/product.repo";
import ProductVariantRepository from "@repository/product-variant.repo";
import ReviewRepository from "@repository/review.repo";
import RoleRepository from "@repository/role.repo";
import UserRepository from "@repository/user.repo";
import WishlistRepository from "@repository/wishlist.repo";
import Repository from "@src/repository";

const AddressRepositoryMock = mockDeep<AddressRepository>();
const CartRepositoryMock = mockDeep<CartRepository>();
const CategoryRepositoryMock = mockDeep<CategoryRepository>();
const LogRepositoryMock = mockDeep<LogRepository>();
const OrderRepositoryMock = mockDeep<OrderRepository>();
const PaymentRepositoryMock = mockDeep<PaymentRepository>();
const PaymentMethodRepositoryMock = mockDeep<PaymentMethodRepository>();
const PermissionRepositoryMock = mockDeep<PermissionRepository>();
const ProductRepositoryMock = mockDeep<ProductRepository>();
const ProductVariantRepositoryMock = mockDeep<ProductVariantRepository>();
const ReviewRepositoryMock = mockDeep<ReviewRepository>();
const RoleRepositoryMock = mockDeep<RoleRepository>();
const UserRepositoryMock = mockDeep<UserRepository>();
const WishlistRepositoryMock = mockDeep<WishlistRepository>();

namespace RepositoryMock {
    export const address = AddressRepositoryMock;
    export const cart = CartRepositoryMock;
    export const category = CategoryRepositoryMock;
    export const log = LogRepositoryMock;
    export const order = OrderRepositoryMock;
    export const payment = PaymentRepositoryMock;
    export const paymentMethod = PaymentMethodRepositoryMock;
    export const permission = PermissionRepositoryMock;
    export const product = ProductRepositoryMock;
    export const productVariant = ProductVariantRepositoryMock;
    export const review = ReviewRepositoryMock;
    export const role = RoleRepositoryMock;
    export const user = UserRepositoryMock;
    export const wishlist = WishlistRepositoryMock;
}

module.exports = {
    __esModule: true,
    default: RepositoryMock as unknown as DeepMockProxy<typeof Repository>
}