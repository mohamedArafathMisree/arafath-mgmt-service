import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RolePermissionRepository } from '../role-permission/repository/role-permission.repository';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    private readonly rolePermissionRepository;
    constructor(usersService: UserService, jwtService: JwtService, rolePermissionRepository: RolePermissionRepository);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        roles: any[];
        permissions: any[];
        userId: any;
        userName: any;
    }>;
}
