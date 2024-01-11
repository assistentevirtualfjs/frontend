import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUser {
    email: string;
    password: string;
    name: string;
    department: string;
}

export const createUser = async (req: Request<CreateUser>, res: Response) => {
    const { email, password, name, department } = req.body as CreateUser;

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
                departments: {
                    create: {
                       // name: department,
                    },
                },
            },
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
