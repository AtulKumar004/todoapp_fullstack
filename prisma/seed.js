import { Prisma, UserRole , PrismaClient } from "@prisma/client";

// const { PrismaClient , } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed default user
    const defaultUser = {
        userRole: UserRole.ADMIN,
        phoneNumber: '1111111111',
        password: 'Qwerty@123', // Note: Hash password in production
        stage: 'Initial',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const existingUser = await prisma.user.findUnique({
        where: { phoneNumber: defaultUser.phoneNumber },
    });

    if (!existingUser) {
        await prisma.user.create({ data: defaultUser });
        console.log('Default user created successfully!');
    } else {
        console.log('Default user already exists.');
    }

    // Seed default stage
    const defaultStage = {
        title: 'Initial',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const existingStage = await prisma.stages.findUnique({
        where: { title: defaultStage.title },
    });

    if (!existingStage) {
        await prisma.stages.create({ data: defaultStage });
        console.log('Default stage created successfully!');
    } else {
        console.log('Default stage already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
