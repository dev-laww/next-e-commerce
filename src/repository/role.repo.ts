import { Permission, Prisma, Role } from "@prisma/client";

import prisma from "@lib/prisma";

export default class RoleRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.RoleWhereInput, limit: number = 50, cursor?: Prisma.RoleWhereUniqueInput): Promise<Role[]> {
        return this.prismaClient.role.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Role | null> {
        return this.prismaClient.role.findUnique({
            where: {
                id: id
            }
        });
    }

    public async create(data: Prisma.RoleCreateInput | Role): Promise<Role> {
        return this.prismaClient.role.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.RoleUpdateInput): Promise<Role> {
        return this.prismaClient.role.update({
            where: {
                id: id
            },
            data: data
        });
    }

    public async delete(id: number): Promise<Role> {
        return this.prismaClient.role.delete({
            where: {
                id: id
            }
        });
    }

    public async getPermissions(id: number): Promise<Permission[]> {
        const rolePermissions = await this.prismaClient.rolePermission.findMany({
            where: {
                role_id: id
            },
            select: {
                permission: true
            }
        });

        return rolePermissions.map(rolePermission => {
            const { created_at, updated_at, ...rest } = rolePermission.permission;

            return rest as Permission;
        });
    }

    public async updatePermissions(id: number, permissions: number[]): Promise<Permission[]> {
        const rolePermissions = (await this.getPermissions(id)).map(permission => permission.id);

        const permissionsToAdd = permissions.filter(permission => !rolePermissions.includes(permission));
        const permissionsToRemove = rolePermissions.filter(permission => !permissions.includes(permission));

        const role = await this.prismaClient.role.update({
            where: { id: id },
            data: {
                permissions: {
                    createMany: {
                        data: permissionsToAdd.map(permission => ({ permission_id: permission }))
                    },
                    deleteMany: permissionsToRemove.map(permission => ({ permission_id: permission }))
                }
            }
        });

        return this.getPermissions(role.id);
    }
}
