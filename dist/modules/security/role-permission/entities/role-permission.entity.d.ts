import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
export declare class RolePermission {
    id: string;
    permissionId: string;
    permission: Permission;
    roleId: string;
    role: Role;
}
