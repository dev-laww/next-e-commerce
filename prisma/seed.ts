import { PrismaClient } from '@prisma/client';

import seeders from './seeders';

const prisma = new PrismaClient()

interface SeedMap {
    [key: string]: any;
}


async function seedEntity(entityName: string, findCondition: any, data: any[]): Promise<void> {

    let seedMap: SeedMap = {
        'addresses': prisma.address,
        'carts': prisma.cartItem,
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
        'reviews': prisma.review,
        'wishlists': prisma.wishlistItem,
        'roles': prisma.role,
        'permissions': prisma.permission,
    }

    const func = seedMap[entityName];

    if (!func) {
        console.log(`Invalid entity name: ${entityName}`);
        return;
    }

    const entity = await func.findMany({
        take: 1
    });

    console.log(`Seeding ${entityName} ...`);
    if (entity.length === 1) return;

    console.log(entity)

    await func.createMany({data: data});
}


async function main() {
    console.log('Start seeding ...')

    const nonRelationEntities: any = [
        seeders.users,
        seeders.products,
        seeders.categories,
        seeders.coupons,
        seeders.logs,
        seeders.shippingMethods,
        seeders.roles,
        seeders.permissions
    ];

    for (const [entityName, data] of Object.entries(seeders)) {
        if (!nonRelationEntities.includes(data)) {
            continue;
        }

        await seedEntity(entityName, {id: 1000}, data);
    }

    for (const [entityName, data] of Object.entries(seeders)) {
        if (nonRelationEntities.includes(data)) {
            continue;
        }

        await seedEntity(entityName, {id: 1000}, data);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.info('Seeding done.')
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

