import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) {}

    async getTeam(name: string, location: string) {
        return this.prisma.team.findUnique({
            where:{
                name_Location: {
                    name,
                    Location: location
                }
            }
        })
    }
}
