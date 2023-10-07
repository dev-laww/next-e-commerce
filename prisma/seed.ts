import humps from "humps";
import { parseArgs } from 'util';
import pino from 'pino';
import pretty from "pino-pretty";
import { PrismaClient } from '@prisma/client';

import seeders from './seeders';

const prisma = new PrismaClient()

const stream = pretty({
    colorize: true,
    ignore: "hostname,pid",
    translateTime: "SYS:standard"
})
const logger = pino({ level: 'debug', name: 'Seeder' }, stream);

const options = {
    environment: { type: 'string' },
};

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
    const {
        values: { environment },
        // @ts-ignore
    } = parseArgs({ options });

    const env = environment ?? 'development';

    logger.info('Start seeding ...')
    Object.keys(seeders).filter(entityName => {
        if (env === 'development') return false;

        return !['roles', 'permissions', 'rolePermissions'].includes(entityName);
    }).forEach(entityName => delete seeders[entityName]);

    for (const entityName in seeders) {

        const func = seedMap[entityName];
        const entity = humps.decamelize(entityName).replace(/_/g, " ");

        if (!func) {
            logger.info(`Invalid entity name: ${ entityName }`);
            continue;
        }

        logger.info(`Seeding [${ entity }]`);

        for (const seeder of seeders[entityName]) {
            const existing = await func.findUnique({ where: { id: seeder.id } });

            if (existing) {
                logger.debug(existing, `Skipping existing [${ entity }] with id: ${ seeder.id }`);
                continue;
            }

            await func.create({
                data: seeder
            });
        }

        logger.info(`Seeded [${ entity }]`);
    }

    logger.info(`Seeded ${ env } environment successfully`);
    logger.info(`Seeded ${ Object.keys(seeders).length } entities`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        await prisma.$disconnect()
        logger.error(e)
        process.exit(1)
    })

