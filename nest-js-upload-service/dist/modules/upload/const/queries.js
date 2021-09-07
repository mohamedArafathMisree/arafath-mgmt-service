"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_USER_QERY = void 0;
const graphql_request_1 = require("graphql-request");
exports.CREATE_USER_QERY = graphql_request_1.gql `
mutation createUser($studentArray: [StudentCreateDTO!]!) {
  createStudent(studentInput: $studentArray) {
    id
  }
}
`;
//# sourceMappingURL=queries.js.map