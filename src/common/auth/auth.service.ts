import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hashPassword } from '../utils/shared-functions';
@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: data.email,
                isDeleted: false,
            }
        });
        if(existingUser) throw new ConflictException('User already exists');
        
        const hashedPassword = await hashPassword(data.password);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstname: data.firstname,
                lastname: data.lastname,
                role: data.role,
                isDeleted: false,
            },
        })

        await this.prisma.session.create({
            data: {
                userId: user.id,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            },
        })

        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                action: 'CREATE',
                recordId: user.id,
                tableName: 'User',
                after: user,
                timestamp: new Date(),
            },
        })

        return {
            firstname: user.firstname,
            lastname: user?.lastname,
            email: user.email,
        };

    }

    // check if admin exists or not
    async checkAdmin(body: RegisterDto) {
        const admin = await this.prisma.user.findFirst({
            where: {
                email: body.email,
                isDeleted: false,
            }
        })

        if(admin && admin.role === 'ADMIN') {
            throw new ConflictException('Admin already exists');
        }

        const newAdmin = await this.createUser(body);
        return {
            firstname: newAdmin.firstname,
            lastname: newAdmin.lastname,
            email: newAdmin.email,
        }
    }
}