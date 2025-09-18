import AdminJS from 'adminjs';
import { PrismaClient } from '@prisma/client';

export function buildAdmin(prisma: PrismaClient) {
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

