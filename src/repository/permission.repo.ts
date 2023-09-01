import { Permission, Prisma, Role, RolePermission } from "@prisma/client";

import prisma from "@lib/prisma";

export default class PermissionRepository {
    prismaClient = prisma;

    public async getAll(filter?: Prisma.PermissionWhereInput, limit: number = 50, cursor?: Prisma.PermissionWhereUniqueInput): Promise<Permission[]> {
        return this.prismaClient.permission.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Permission | null> {
        return this.prismaClient.permission.findUnique({
            where: {id: id}
        });
    }

    public async create(permission: Prisma.PermissionCreateInput | Permission): Promise<Permission> {
        return this.prismaClient.permission.create({
            data: permission
        });
    }

    public async update(id: number, permission: Prisma.PermissionUpdateInput): Promise<Permission> {
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

    public async getRoles(id: number): Promise<Role[]> {
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

    public async updateRoles(id: number, roles: number[]): Promise<Role[]> {
        const permissionRoles = await this.getRoles(id).then(roles => roles.map(role => role.id));

        const rolesToAdd = roles.filter(role => !permissionRoles.includes(role));
        const rolesToRemove = permissionRoles.filter(role => !roles.includes(role));

        console.log(rolesToAdd)
        console.log(rolesToRemove)

        const permission = await this.prismaClient.permission.update({
            where: {id: id},
            data: {
                roles: {
                    createMany: {
                        data: rolesToAdd.map(role => ({role_id: role}))
                    },
                    deleteMany: rolesToRemove.map(role => ({role_id: role}))
                }
            }
        });

        return this.getRoles(permission.id);
    }
}
