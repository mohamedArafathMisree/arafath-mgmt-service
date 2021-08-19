import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './repository/role.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { RolePermissionRepository } from '../role-permission/repository/role-permission.repository';
import { FilterOptionsDto } from '../../../base/filter/dtos/filter-options.dto';
export declare class RoleService {
    private readonly roleRepository;
    private readonly rolePermissionRepository;
    constructor(roleRepository: RoleRepository, rolePermissionRepository: RolePermissionRepository);
    create(createRoleDto: CreateRoleDto): Promise<ResponseDto>;
    filter(filterOptionsDto: FilterOptionsDto): Promise<ResponseDto>;
}
