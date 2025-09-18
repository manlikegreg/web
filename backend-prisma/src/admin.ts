import AdminJS from 'adminjs';
import * as AdminJSPRISMA from '@adminjs/prisma';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';

AdminJS.registerAdapter({ Database, Resource });

export function buildAdmin(prisma: PrismaClient) {
  const admin = new AdminJS({
    rootPath: '/admin',
    databases: [prisma],
    branding: {
      companyName: "Science 1B Admin",
      withMadeWithLove: false,
    },
  });

  return admin;
}

