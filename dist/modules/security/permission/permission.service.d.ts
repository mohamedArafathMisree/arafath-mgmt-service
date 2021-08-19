import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionRepository } from './repository/permission.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { SimpleFilterOptionsDto } from '../../../base/dto/simple-filter-options.dto';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    create(createPermissionDto: CreatePermissionDto): Promise<ResponseDto>;
    findAll(filterOptionsDto: SimpleFilterOptionsDto): Promise<ResponseDto>;
}
