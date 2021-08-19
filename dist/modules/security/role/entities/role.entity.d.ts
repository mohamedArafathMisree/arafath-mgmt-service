import { Base } from '../../../../base/entities/base.entity';
import { RoleUser } from '../../role-user/entities/role-user.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';
export declare class Role extends Base {
    id: string;
    name: string;
    description: string;
    roleUsers: RoleUser[];
    rolePermissions: RolePermission[];
}
