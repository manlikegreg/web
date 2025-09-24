import AdminJS from 'adminjs';
export function buildAdmin(prisma) {
    const admin = new AdminJS({
        rootPath: '/admin',
        resources: [
            { resource: { model: prisma.student, client: prisma } },
            { resource: { model: prisma.article, client: prisma } },
            { resource: { model: prisma.gallery, client: prisma } },
        ],
        branding: {
            companyName: "Science 1B Admin",
            withMadeWithLove: false,
        },
    });
    return admin;
}
//# sourceMappingURL=admin.js.map