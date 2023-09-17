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
import CouponRepository from "@repository/coupon.repo";

namespace Repository {
    export const address = new AddressRepository();
    export const cart = new CartRepository();
    export const category = new CategoryRepository();
    export const coupon = new CouponRepository();
    export const log = new LogRepository();
    export const order = new OrderRepository();
    export const payment = new PaymentRepository();
    export const paymentMethod = new PaymentMethodRepository();
    export const permission = new PermissionRepository();
    export const product = new ProductRepository();
    export const productVariant = new ProductVariantRepository();
    export const review = new ReviewRepository();
    export const role = new RoleRepository();
    export const user = new UserRepository();
    export const wishlist = new WishlistRepository();
}

export default Repository;