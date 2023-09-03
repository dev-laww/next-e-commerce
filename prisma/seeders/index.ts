import * as fs from 'fs';
import humps from 'humps';

interface Seeders {
    [key: string]: any;
}

const files = fs.readdirSync(__dirname)

const tempSeeders: Seeders = {}

for (const file of files) {
    // Skip index.ts and non-ts files
    if (file.match(/index\.ts$|(?<!\.ts)$/i)) continue;

    const seederModule = require(`./${file.replace('.ts', '')}`)

    tempSeeders[humps.camelize(file.replace('.ts', ''))] = seederModule.default
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
    'payments',
    'rolePermissions',
];

// Find one-to-many entities
const oneToManyEntities = Object.keys(tempSeeders).filter(entityName => !nonRelationEntities.includes(entityName) && !manyToManyEntities.includes(entityName));

const seeders: Seeders = {};

// Add entities to seeders
([...nonRelationEntities, ...oneToManyEntities, ...manyToManyEntities]).forEach((entityName) => {
    seeders[entityName] = tempSeeders[entityName];
});

export default seeders;