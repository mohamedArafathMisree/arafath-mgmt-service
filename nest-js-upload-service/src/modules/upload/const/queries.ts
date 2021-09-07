import { gql, request } from 'graphql-request';


export const CREATE_USER_QERY = gql`
mutation createUser($studentArray: [StudentCreateDTO!]!) {
  createStudent(studentInput: $studentArray) {
    id
  }
}
`;