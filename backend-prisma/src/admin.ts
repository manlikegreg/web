import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';

AdminJS.registerAdapter({ Database, Resource });

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

