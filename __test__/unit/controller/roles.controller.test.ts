import { NextRequest } from "next/server";
import RolesController from "@controller/roles.controller";


describe("RolesController", () => {
    describe("Test getRoles", () => {
        it.todo("returns 200 and roles list")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if roles not found")
    });

    describe("Test createRole", () => {
        it.todo("returns 201 and role created")
        it.todo("returns 400 if invalid body")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 422 if wrong body")
    });

    describe("Test getRole", () => {
        it.todo("returns 200 and role")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
    });

    describe("Test updateRole", () => {
        it.todo("returns 200 and role updated")
        it.todo("returns 400 if invalid body")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
        it.todo("returns 422 if wrong body")
    });

    describe("Test deleteRole", () => {
        it.todo("returns 200 and role deleted")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
    });

    describe("Test getRolePermissions", () => {
        it.todo("returns 200 and role permissions")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
        it.todo("returns 404 if role permissions not found")
    });

    describe("Test addRolePermission", () => {
        it.todo("returns 201 and role permission created")
        it.todo("returns 400 if invalid body")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 422 if wrong body")
    });

    describe("Test deleteRolePermission", () => {
        it.todo("returns 200 and role permission deleted")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
        it.todo("returns 404 if role permission not found")
    });

    describe("Test getRoleUsers", () => {
        it.todo("returns 200 and role users")
        it.todo("returns 401 if user not authenticated")
        it.todo("returns 403 if user not authorized")
        it.todo("returns 404 if role not found")
        it.todo("returns 404 if role users not found")
    });
});

