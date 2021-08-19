import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterOptionsDto } from '../../../base/filter/dtos/filter-options.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
    filter(filterOptionsDto: FilterOptionsDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
}
