import { AuthService } from '../auth.service';
import { ModuleRef } from '@nestjs/core';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private moduleRef;
    constructor(authService: AuthService, moduleRef: ModuleRef);
    validate(request: Request, username: string, password: string): Promise<any>;
}
export {};
