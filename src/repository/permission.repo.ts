import { Permission, Prisma, Role } from "@prisma/client";

import prisma from "@lib/prisma";

export default class PermissionRepository {
    prismaClient = prisma;

    // TODO: Implement repository methods
    public async getAll(filter?: Prisma.PermissionWhereInput): Promise<Permission[]> {
        return this.prismaClient.permission.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getById(id: number): Promise<Permission | null> {
        return this.prismaClient.permission.findUnique({
            where: {id: id}
        });
    }

    public async create(permission: Permission): Promise<Permission> {
        return this.prismaClient.permission.create({
            data: permission
        });
    }

    public async update(id: number, permission: Permission): Promise<Permission> {
        return this.prismaClient.permission.update({
            where: {id: id},
            data: permission
        });
    }

    public async delete(id: number): Promise<Permission> {
        return this.prismaClient.permission.delete({
            where: {id: id}
        });
    }

    public async getRole(id: number): Promise<Role[]> {
        const rolePermissions = await this.prismaClient.rolePermission.findMany({
            where: {
                permission_id: id
            },
            select: {
                role: true
            }
        });

        return rolePermissions.map(rolePermission => {
            const role = rolePermission.role;

            return {
                id: role.id,
                name: role.name
            } as Role;
        });
    }

    public async removeRole(id: number, roles: number[]): Promise<Permission> {
        return this.prismaClient.permission.update({
            where: {id: id},
            data: {
                roles: {
                    deleteMany: roles.map(role => ({role_id: role}))
                }
            },
            include: {
                roles: true
            }
        });
    }
}
