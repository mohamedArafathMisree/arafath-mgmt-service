import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterOptionsDto } from '../../../base/filter/dtos/filter-options.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    publicRoute(): string;
    create(createUserDto: CreateUserDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
    filter(filterOptionsDto: FilterOptionsDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
}
