import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}
// globalThis.prisma: This global ensure that the prisma client instance is reused across hot reload during development. Without this, each time application reloads, a new instance of Prisma client will be created, potentially lending to connection issues. 