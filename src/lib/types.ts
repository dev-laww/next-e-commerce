import { User } from "@prisma/client";


export type UserSession = Omit<User, 'password' | 'created_at' | 'updated_at' | 'confirmed'>


