import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthDataService{
    constructor(private readonly authService: AuthService){}

    async register(data: RegisterDto){
        const user = await this.authService.createUser(data);
        return user;
    }
}