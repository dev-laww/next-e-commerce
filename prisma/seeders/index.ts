import * as fs from "fs";
import humps from "humps";

interface Seeders {
    [key: string]: any;
}

const files = fs.readdirSync(__dirname)

const tempSeeders: Seeders = {}

for (const file of files) {
    // Skip index.ts and non-ts files
    if (file.match(/index\.ts$|(?<!\.ts)$/i)) continue;

    const module = require(`./${file.replace('.ts', '')}`)

    tempSeeders[humps.camelize(file.replace('.ts', ''))] = module.default
}

const nonRelationEntities = [
    'users',
    'products',
    'categories',
    'coupons',
    'logs',
    'shippingMethods',
    'roles',
    'permissions'
];

const manyToManyEntities = [
    'userRoles',
    'cart',
    'orders',
    'orderItems',
    'payments'
];

// Find one-to-many entities
const oneToManyEntities = Object.keys(tempSeeders).reduce((acc, key) => {
    if (!nonRelationEntities.includes(key) && !manyToManyEntities.includes(key)) acc.push(key);
    return acc;
}, [] as string[]);

const seeders: Seeders = {};


// Add entities to seeders
([...nonRelationEntities, ...oneToManyEntities, ...manyToManyEntities]).forEach((entityName) => {
    seeders[entityName] = tempSeeders[entityName];
});

export default seeders;