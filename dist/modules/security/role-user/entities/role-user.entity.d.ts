import { Base } from '../../../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
export declare class RoleUser extends Base {
    id: string;
    userId: string;
    user: User;
    roleId: string;
    role: Role;
}
