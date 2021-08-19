import { Base } from '../../../../base/entities/base.entity';
import { RoleUser } from '../../role-user/entities/role-user.entity';
export declare class User extends Base {
    id: string;
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    mobileNo: string;
    address: string;
    roleUsers: RoleUser[];
    hashPassword(): Promise<void>;
}
