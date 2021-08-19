import { Base } from '../../../../base/entities/base.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';
export declare class Permission extends Base {
    id: string;
    name: string;
    description: string;
    rolePermissions: RolePermission[];
}
