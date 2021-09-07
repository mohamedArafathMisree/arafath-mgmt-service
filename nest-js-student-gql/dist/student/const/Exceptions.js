"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserException = void 0;
const common_1 = require("@nestjs/common");
class UserException extends common_1.HttpException {
    constructor(errcode, errmsg, statusCode) {
        super({ errcode, errmsg }, statusCode);
    }
}
exports.UserException = UserException;
//# sourceMappingURL=Exceptions.js.map