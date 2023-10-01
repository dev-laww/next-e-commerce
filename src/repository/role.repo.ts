import { Permission, Prisma, Role, User } from "@prisma/client";

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
        return this.prismaClient.role.findUnique({
            where: { id: id },
            select: {
                permissions: {
                    select: { permission: true }
                }
            }
        }).then(role => {
            if (!role) return [];

            return role.permissions.map(({ permission }) => {
                const { created_at, updated_at, ...rest } = permission;

                return rest as Permission;
            });
        });
    }

    public async addPermission(id: number, permissionId: number): Promise<Permission> {
        return this.prismaClient.role.update({
            where: { id: id },
            data: {
                permissions: {
                    connect: { id: permissionId }
                }
            },
            select: {
                permissions: {
                    where: { permission_id: permissionId },
                    select: {
                        permission: true
                    }
                }
            }
        }).then(role => {
            const { created_at, updated_at, ...rest } = role.permissions[0].permission;

            return rest as Permission;
        })
    }

    public async removePermission(id: number, permissionId: number): Promise<Permission | null> {
        const rolePermission = await this.prismaClient.rolePermission.findFirst({
            where: {
                role_id: id,
                permission_id: permissionId
            }
        });

        if (!rolePermission) return null;

        return this.prismaClient.rolePermission.delete({
            where: { id: rolePermission.id },
            select: {
                permission: true
            }
        }).then(({ permission }) => {
            const { created_at, updated_at, ...rest } = permission;

            return rest as Permission;
        });
    }

    public async getUsers(id: number): Promise<User[]> {
        return this.prismaClient.user.findMany({
            where: {
                roles: {
                    some: { id: id }
                }
            }
        }).then(users => users.map(user => {
            const { created_at, updated_at, password, ...rest } = user;

            return rest as User;
        }));
    }
}
