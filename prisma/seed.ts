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
    'rolePermissions': prisma.rolePermission,
}

async function main() {
    console.log('Start seeding ...')

    for (const entityName in seeders) {

        const func = seedMap[entityName];

        if (!func) {
            console.info(`Invalid entity name: ${entityName}`);
            continue;
        }

        for (const seeder of seeders[entityName]) {
            const existing = await func.findUnique({ where: { id: seeder.id } });

            if (existing) {
                console.debug(`Skipping existing ${entityName} with id: ${seeder.id}`);
                continue;
            }

            await func.create({
                data: seeder
            });
        }
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

