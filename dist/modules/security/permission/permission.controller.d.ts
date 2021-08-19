import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { SimpleFilterOptionsDto } from '../../../base/dto/simple-filter-options.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
    findAll(filterOptionsDto: SimpleFilterOptionsDto): Promise<import("../../../base/dto/response.dto").ResponseDto>;
}
