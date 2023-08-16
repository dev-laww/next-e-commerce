import { PrismaClient } from '@prisma/client';

import seeders from './seeders';

const prisma = new PrismaClient()

interface SeedMap {
    [key: string]: any;
}

const seedMap: SeedMap = {
    'addresses': prisma.address,
    'cart': prisma.cartItem,
    'categories': prisma.category,
    'coupons': prisma.coupon,
    'logs': prisma.log,
    'orderItems': prisma.orderItem,
    'orders': prisma.order,
    'paymentMethods': prisma.paymentMethod,
    'payments': prisma.payment,
    'productCategories': prisma.productCategory,
    'productVariants': prisma.productVariant,
    'products': prisma.product,
    'shippingMethods': prisma.shippingMethod,
    'users': prisma.user,
    'userRoles': prisma.userRole,
    'reviews': prisma.review,
    'wishlist': prisma.wishlistItem,
    'roles': prisma.role,
    'permissions': prisma.permission,
}

async function main() {
    console.log('Start seeding ...')

    for (const entityName in seeders) {

        const func = seedMap[entityName];

        if (!func) {
            console.log(`Invalid entity name: ${entityName}`);
            return;
        }

        const entity = await func.findMany({
            take: 1
        });

        if (entity.length === 1) return;

        await func.createMany({data: seeders[entityName]});
    }
}

main()
    .then(async () => {
        console.info('Seeding done.')
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        console.error(e)
        process.exit(1)
    })

