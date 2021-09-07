import { request, gql } from 'graphql-request';

export const CREATE_STUDENT_QERY = gql`
mutation createStudents($createStudentsArray: [StudentInput]!) {
  createStudents(input: { createMultiple: $createStudentsArray }) {
    students {
      id,
      name
    }
  }
}
`;