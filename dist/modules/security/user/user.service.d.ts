import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { User } from './entities/user.entity';
import { RoleUserRepository } from '../role-user/repository/role-user.repository';
import { FilterOptionsDto } from '../../../base/filter/dtos/filter-options.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly roleUserRepository;
    constructor(userRepository: UserRepository, roleUserRepository: RoleUserRepository);
    create(createUserDto: CreateUserDto): Promise<ResponseDto>;
    filter(filterOptionsDto: FilterOptionsDto): Promise<ResponseDto>;
    findOne(username: string): Promise<User | undefined>;
}
