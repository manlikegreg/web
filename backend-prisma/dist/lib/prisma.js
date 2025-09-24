import { PrismaClient } from '@prisma/client';
let prismaInstance;
export function getPrisma() {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}
export async function disconnectPrisma() {
    if (prismaInstance) {
        await prismaInstance.$disconnect();
        prismaInstance = undefined;
    }
}
//# sourceMappingURL=prisma.js.map