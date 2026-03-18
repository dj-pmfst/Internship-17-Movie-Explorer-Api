import { Injectable, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
      ) {}
    
    async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
        where: {
        email,
        },
    });

    if (existingUser) {
        throw new BadRequestException('User already exists');
    }
}