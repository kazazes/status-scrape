import { default as gql } from "graphql-tag";

export const SIGNUP = gql`
  mutation($name: name, $email: email, $password: password) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation($email: email, $password: password) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
