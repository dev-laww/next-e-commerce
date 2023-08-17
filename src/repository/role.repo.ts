import { Permission, Prisma, Role } from "@prisma/client";

import prisma from "@lib/prisma";

export default class RoleRepository {
    prismaClient = prisma;
    public async getAll(filter?: Prisma.RoleWhereInput): Promise<Role[]> {
        return this.prismaClient.role.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getById(id: number): Promise<Role | null> {
        return this.prismaClient.role.findUnique({
            where: {
                id: id
            }
        });
    }

    public async create(data: Role): Promise<Role> {
        return this.prismaClient.role.create({
            data: data
        });
    }

    public async update(id: number, data: Role): Promise<Role> {
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

    public async getRolePermissions(id: number): Promise<Permission[]> {
        const rolePermissions = await this.prismaClient.rolePermission.findMany({
            where: {
                role_id: id
            },
            select: {
                permission: true
            }
        });

        return rolePermissions.map(rolePermission => {
            const permission = rolePermission.permission;

            return {
                id: permission.id,
                name: permission.name,
                description: permission.description
            } as Permission;
        });
    }

    public async addRolePermissions(id: number, permissions: number[]): Promise<Permission[]> {
        await this.prismaClient.role.update({
            where: {
                id: id
            },
            data: {
                permissions: {
                    connect: permissions.map(permission => ({id: permission}))
                }
            }
        });

        return this.getRolePermissions(id);
    }

    public async updateRolePermissions(id: number, permissions: number[]): Promise<Permission[]> {
         await this.prismaClient.role.update({
            where: {
                id: id
            },
            data: {
                permissions: {
                    set: permissions.map(permission => ({id: permission}))
                }
            }
        });

        return this.getRolePermissions(id);
    }

    public async deleteRolePermissions(id: number, permissions: number[]): Promise<Permission[]> {
        await this.prismaClient.role.update({
            where: {
                id: id
            },
            data: {
                permissions: {
                    disconnect: permissions.map(permission => ({id: permission}))
                }
            },
        });

        return this.getRolePermissions(id)
    }
}
