"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_STUDENT_QERY = void 0;
const graphql_request_1 = require("graphql-request");
exports.CREATE_STUDENT_QERY = graphql_request_1.gql `
mutation createStudents($createStudentsArray: [StudentInput]!) {
  createStudents(input: { createMultiple: $createStudentsArray }) {
    students {
      id,
      name
    }
  }
}
`;
//# sourceMappingURL=queries.js.map